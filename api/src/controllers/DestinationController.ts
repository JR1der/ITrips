import axios from "axios";
import { Request, Response } from "express";
import { DestinationModel } from "../models/DestinationModel";

// Create a destination
export const createDestination = async (req: Request, res: Response) => {
  const { name, description, activities, photos } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: "Name, description, activities and photos are required",
    });
  }

  try {
    const destination = new DestinationModel({
      name: name,
      description: description,
      activities: activities,
      photos: photos,
    });

    await destination.save();

    return res.status(201).json({
      message: "The destination was created successfuly",
      destination: destination,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all destinations
export const getDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await DestinationModel.find();
    return res.json(destinations);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a destination by ID
export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const destination = await DestinationModel.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    return res.json(destination);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a destination
export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { name, description, activities, photos } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const destination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    return res.json(destination);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a destination
export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const destination = await DestinationModel.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    return res.json({ message: "Destination deleted" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//Add destination to favourites
export const addDestinationToFavorites = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const destination = await DestinationModel.findById(id);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    if (destination.favorite === true) destination.favorite = false;
    else if (destination.favorite === false) destination.favorite = true;
    await destination.save();

    return res.json(destination);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

//Fetch destination image
export const fetchDestinationImages = async (req: Request, res: Response) => {
  try {
    const { destinationName } = req.params;
    const accessKey = process.env.UNSPLASH_API_KEY;
    const apiUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${destinationName}`;

    const response = await axios.get(apiUrl);

    return res.json(response.data.results);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
