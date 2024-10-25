import { Document } from "mongoose";

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

export interface UserDocumentInterface extends Document {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}
