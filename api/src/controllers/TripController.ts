import { Request, Response } from "express";
import { DestinationModel } from "../models/DestinationModel";
import { TripModel } from "../models/TripModel";

// Create a trip
export const createTrip = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, destinations } = req.body;

    if (!userId || !name || !description) {
      return res
        .status(400)
        .json({ error: "UserId, name and description are required" });
    }

    const destinationDocs = await DestinationModel.find({
      _id: { $in: destinations },
    });

    if (destinationDocs.length !== destinations.length) {
      return res
        .status(400)
        .json({ error: "One or more destinations are invalid" });
    }

    const trip = new TripModel({
      userId,
      name,
      description,
      destinations: destinationDocs.map((destination) => destination._id),
    });

    await trip.save();
    return res.status(201).json(trip);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all trips with destination names
export const getTrips = async (req: Request, res: Response) => {
  try {
    const trips = await TripModel.find().populate("destinations", "name");
    return res.json(trips);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a trip by ID
export const getTripById = async (req: Request, res: Response) => {
  try {
    const trip = await TripModel.findById(req.params.id).populate(
      "destinations"
    );
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.json(trip);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a trip
export const updateTrip = async (req: Request, res: Response) => {
  try {
    const { name, description, destinations } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const trip = await TripModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.json(trip);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a trip
export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const trip = await TripModel.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.json({ message: "Trip deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getDestinationOfTrip = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.id;

    const trip = await TripModel.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const destinationIds = trip.destinations;

    const destinations = await DestinationModel.find({
      _id: { $in: destinationIds },
    });

    if (destinations.length === 0) {
      return res
        .status(404)
        .json({ error: "No destinations found for the provided trip." });
    }

    return res.json({ trip, destinations });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "No valid query provided" });
    }

    const tripResults = await TripModel.find({
      name: { $regex: query, $options: "i" },
    });

    const destinationResults = await DestinationModel.find({
      name: { $regex: query, $options: "i" },
    });

    return res.json({ trips: tripResults, destinations: destinationResults });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//Add trip to favourites
export const addTripToFavorites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trip = await TripModel.findById(id);

    if (!trip) {
      return res.status(404).json({ error: "Destination not found" });
    }

    if (trip.favorite === true) trip.favorite = false;
    else if (trip.favorite === false) trip.favorite = true;
    await trip.save();

    return res.json(trip);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
