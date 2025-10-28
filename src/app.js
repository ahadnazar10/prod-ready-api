import express from "express";
import config from "./config/index.js";
import healthRouter from "./routes/health.route.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/health", healthRouter);

// Middleware for unknown routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
