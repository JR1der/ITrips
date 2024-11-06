import { Router } from "express";
import {
    createUser,
    getUser,
    login,
    updateSingleUserField,
    updateUser,
} from "../controllers/UserController";
import { JwtDecode } from "../middlewares/Authorization";

const router = Router();

// Create User
router.post("/", createUser);

// Login
router.post("/login", login);

// Get User by ID
router.get("/:id", JwtDecode, getUser);

// Update User by ID
router.put("/:id", JwtDecode, updateUser);

// Update single value in User by ID
router.patch("/:id", JwtDecode, updateSingleUserField);

export default router;
