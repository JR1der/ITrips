import { Router } from "express";
import {
    getUser,
    updateSingleUserField,
    updateUser
} from "../controllers/UserController";

const router = Router();

// Get User by ID
router.get("/:id", getUser);

// Update User by ID
router.put("/:id", updateUser);

// Update single value in User by ID
router.patch("/:id", updateSingleUserField);

export default router;
