import express from "express";
import {
    addTripToFavorites,
    createTrip,
    deleteTrip,
    getDestinationOfTrip,
    getTripById,
    getTrips,
    search,
    updateTrip,
} from "../controllers/TripController";

const router = express.Router();

// Routes for trips
router.post("/", createTrip); // Create a trip
router.get("/", getTrips); // Get all trips
router.get("/:id", getTripById); // Get a trip by ID\
router.get("/tripDestinations/:id", getDestinationOfTrip); // Get trip destinations
router.put("/:id", updateTrip); // Update a trip
router.delete("/:id", deleteTrip); // Delete a trip
router.get("/search", search); // Search trip
router.put("/:id/favorite", addTripToFavorites); // Add trip to favorites

export default router;
