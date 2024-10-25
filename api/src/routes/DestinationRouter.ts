import { Router } from "express";
import {
    addDestinationToFavorites,
    createDestination,
    deleteDestination,
    fetchDestinationImages,
    getDestinationById,
    getDestinations,
    updateDestination,
} from "../controllers/DestinationController";

const router = Router();

router.post("/create", createDestination);
router.get("/get", getDestinations);
router.get("/get/:id", getDestinationById);
router.put("/update/:id", updateDestination);
router.delete("/delete/:id", deleteDestination);
router.put("/:id/favorite", addDestinationToFavorites);
router.get("/image/:destinationName", fetchDestinationImages);

export default router;
