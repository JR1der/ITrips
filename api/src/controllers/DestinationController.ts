import axios from "axios";
import { Request, Response } from "express";
import { DestinationModel } from "../models/DestinationModel";

// Create a destination
export const createDestination = async (req: Request, res: Response) => {
  const { userId, name, description, activities, photos } = req.body;

  if (!userId || !name || !description) {
    return res.status(400).json({
      error: "Name, description, activities, userId and photos are required",
    });
  }

  try {
    const destination = new DestinationModel({
      userId: userId,
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
  const userId = req.body.userId;

  try {
    const destination = await DestinationModel.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    if (destination.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this destination" });
    }

    const { name, description, activities, photos } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Name and description are required" });
    }

    const updatedDestination = await DestinationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json(updatedDestination);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a destination
export const deleteDestination = async (req: Request, res: Response) => {
  const userId = req.body.userId;

  try {
    const destination = await DestinationModel.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    if (destination.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this destination" });
    }

    await DestinationModel.findByIdAndDelete(req.params.id);
    return res.json({ message: "Destination deleted" });
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
