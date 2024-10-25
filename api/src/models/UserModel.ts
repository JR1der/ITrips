import mongoose, { Schema } from "mongoose";
import { UserDocumentInterface } from "../interfaces/UserInterface";

export const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

export const UserModel = mongoose.model<UserDocumentInterface>(
  "User",
  UserSchema
);
