import cors from "cors";
import express from "express";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import DestinationRouter from "./routes/DestinationRouter";
import TripRouter from "./routes/TripRouter";
import UserRouter from "./routes/UserRouter";

const app: express.Application = express();


const corsOptions = {
  origin: "https://i-trips.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(loggerMiddleware);

app.use("/users", UserRouter);
app.use("/destinations", DestinationRouter);
app.use("/trips", TripRouter);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
