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

router.get("/", getTrips);
router.get("/:id", getTripById);
router.get("/tripDestinations/:id", getDestinationOfTrip);
router.post("/", JwtDecode, createTrip); // Create a trip
router.put("/:id", JwtDecode, updateTrip); // Update a trip
router.delete("/:id", JwtDecode, deleteTrip); // Delete a trip
router.get("/search", JwtDecode, search); // Search trip

export default router;
