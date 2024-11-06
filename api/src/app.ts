import cors from "cors";
import express, { Router } from "express";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import DestinationRouter from "./routes/DestinationRouter";
import TripRouter from "./routes/TripRouter";
import UserRouter from "./routes/UserRouter";

const router = Router();
const app: express.Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(loggerMiddleware);

app.use("/users", UserRouter);
app.use("/destinations", DestinationRouter);
app.use("/trips", TripRouter);


app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
