import express from "express";
import {
    createTrip,
    deleteTrip,
    getDestinationOfTrip,
    getTripById,
    getTrips,
    search,
    updateTrip,
} from "../controllers/TripController";
import { JwtDecode } from "../middlewares/Authorization";

const router = express.Router();

// Routes for trips

router.get("/", getTrips); // Get trips
router.get("/:id", getTripById); // Get a trip by it's id
router.get("/tripDestinations/:id", getDestinationOfTrip); // Get all destinations of a trip
router.post("/", JwtDecode, createTrip); // Create a trip
router.put("/:id", JwtDecode, updateTrip); // Update a trip
router.delete("/:id", JwtDecode, deleteTrip); // Delete a trip
router.get("/search", JwtDecode, search); // Search trip

export default router;
