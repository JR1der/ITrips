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


router.get("/", getDestinations);
router.get("/:id", getDestinationById);
router.get("/image/:destinationName", fetchDestinationImages);
router.post("/create",JwtDecode, createDestination);
router.put("/update/:id", JwtDecode,updateDestination);
router.delete("/delete/:id",JwtDecode, deleteDestination);

export default router;
