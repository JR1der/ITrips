import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/Authorization";
import { UserModel } from "../models/UserModel";

// Get User by ID
export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  let user;
  try {
    user = await UserModel.findOne({ _id: id });
  } catch (error) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({
    id: user._id,
    username: user.username,
    email: user.email,
  });
};

// Create User
export const createUser = async (req: Request, res: Response) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  }

  username = username.trim();
  email = email.trim();
  password = password.trim();

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password can't be empty" });
  }

  if (username === "" || email === "" || password === "") {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required" });
  } else if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  // Check if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const result = await UserModel.findOne({ email });
  if (result) {
    return res
      .status(400)
      .json({ error: "User with the provided email already exists" });
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds).then((hashedPassword: string) => {
    const newUser = new UserModel({
      username,
      email,
      passwordHash: hashedPassword,
    });
    newUser
      .save()
      .then((result) => {
        return res.status(201).json({
          id: result._id,
          username: result.username,
          email: result.email,
        });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ error: "An error occurred while signing up" });
      });
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const hashedPassword = user.passwordHash;
  const matching = await bcrypt.compare(password, hashedPassword);

  if (!matching) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return res.status(200).json({
    accessToken: token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

// Update user values
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username, email } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  let user;

  try {
    user = await UserModel.findOne({ _id: id });
  } catch (error) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.username === username && user.email === email) {
    return res.status(400).json({ error: "You need to change something" });
  }

  if (username) {
    user.username = username.trim();
  }

  if (email) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    user.email = email.trim();
  }

  try {
    const updatedUser = await user.save();
    return res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

// Update single value of User
export const updateSingleUserField = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { username, email } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  let user;

  try {
    user = await UserModel.findOne({ _id: id });
  } catch (error) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const updateFields: { [key: string]: string } = {
    username,
    email,
  };
  const updateKeys = Object.keys(updateFields).filter(
    (key) => updateFields[key] !== undefined
  );

  if (updateKeys.length === 0) {
    return res
      .status(400)
      .json({ error: "No valid fields provided to update" });
  } else if (updateKeys.length > 1) {
    return res
      .status(400)
      .json({ error: "Only one field can be updated at a time" });
  }

  const fieldToUpdate = updateKeys[0];
  const newValue = updateFields[fieldToUpdate];

  if (fieldToUpdate === "username" && typeof newValue === "string") {
    user.username = (newValue as string).trim();
  } else if (fieldToUpdate === "email") {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(newValue)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const existingUser = await UserModel.findOne({ email: newValue.trim() });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    user.email = (newValue as string).trim();
  } else {
    return res.status(400).json({
      error: "Invalid request: please provide a valid field to update",
    });
  }

  try {
    const updatedUser = await user.save();
    return res.status(200).json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    return res
      .status(400)
      .json({ error: "Email, password, and token are required" });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const decodedToken = await verifyToken(token);

  if (decodedToken.email !== email) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  user.passwordHash = hashedPassword;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
};
