import { model, Model, Schema } from "mongoose";
import { IDestinationModel } from "../interfaces/DestinationInterface";

// Define the schema for DestinationModel
const destinationSchema: Schema<IDestinationModel> =
  new Schema<IDestinationModel>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    activities: [String],
    favorite: { type: Boolean, default: false },
  });

// Define and export the DestinationModel
export const DestinationModel: Model<IDestinationModel> =
  model<IDestinationModel>("Destination", destinationSchema);
