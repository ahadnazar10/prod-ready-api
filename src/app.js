import express from "express";
import dotenv from "dotenv";
import healthRouter from "./routes/health.route.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/health", healthRouter);

export default app;
