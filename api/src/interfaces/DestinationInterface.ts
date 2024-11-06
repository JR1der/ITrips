// Define the interface for DestinationModel
export interface IDestinationModel extends Document {
  userId: string;
  name: string;
  description: string;
  activities: string[];
}
