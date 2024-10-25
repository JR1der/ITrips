import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async (url: string) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log(`Connected to DB with URI: ${url}`);
  }
};

const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

export { connectDB, disconnectDB };
