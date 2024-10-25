import cors from "cors";
import express, { Router } from "express";
import { createUser, login } from "./controllers/UserController";
import { JwtDecode } from "./middlewares/Authorization";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import DestinationRouter from "./routes/DestinationRouter";
import TripRouter from "./routes/TripRouter";
import UserRouter from "./routes/UserRouter";

const router = Router();
const app: express.Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(loggerMiddleware);

// Only allow unauthorized access to POST `/users`, POST `/users/login`
// For the remaining user endpoints, check if the user is authorized
app.use("/users", router.post("/", createUser));
app.use("/users", router.post("/login", login));

app.use("/destinations", DestinationRouter);
app.use("/trips", JwtDecode, TripRouter);
app.use("/users", JwtDecode, UserRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
