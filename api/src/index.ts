import dotenv from "dotenv";
import { Request, Response } from "express";
import Joi from "joi";
import app from "./app";
import { connectDB } from "./database";

dotenv.config();

const envSchema = Joi.object({
  MONGODB_URI: Joi.string().uri().required(),
  PORT: Joi.number().default(process.env.PORT || 3000),
})
  .unknown()
  .required();

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/Cases";
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

connectDB(mongoUri);

export default server;
