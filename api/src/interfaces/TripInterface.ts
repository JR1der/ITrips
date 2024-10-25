// Define the interface for TripModel
export interface ITripModel extends Document {
  userId: string;
  name: string;
  description: string;
  destinations: string[];
  favorite: boolean;
}
