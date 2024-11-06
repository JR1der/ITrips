import { Router } from "express";
import {
    createDestination,
    deleteDestination,
    fetchDestinationImages,
    getDestinationById,
    getDestinations,
    updateDestination,
} from "../controllers/DestinationController";
import { JwtDecode } from "../middlewares/Authorization";

const router = Router();

// Destination routes

router.get("/", getDestinations); // Get destinations
router.get("/:id", getDestinationById); // Get a destination by it's id
router.get("/image/:destinationName", fetchDestinationImages); // fetch destination images
router.post("/create", JwtDecode, createDestination); // Create a destination
router.put("/update/:id", JwtDecode, updateDestination); // Update a destination
router.delete("/delete/:id", JwtDecode, deleteDestination); // Delete a destination

export default router;
