import { model, Model, Schema } from "mongoose";
import { ITripModel } from "../interfaces/TripInterface";

// Define the schema for TripModel
const tripSchema: Schema<ITripModel> = new Schema<ITripModel>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
});

// Define and export the TripModel
export const TripModel: Model<ITripModel> = model<ITripModel>(
  "Trip",
  tripSchema
);
