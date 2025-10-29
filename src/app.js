import express from "express";
import config from "./config/index.js";
import healthRouter from "./routes/health.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import rateLimiter from "./middleware/rateLimiter.middleware.js";
import requestLogger from "./middleware/requestLogger.middleware.js";
import metricsMiddleware from "./config/metrics.js";

const app = express();
app.use(express.json());

// Observability
app.use(requestLogger);
app.use(metricsMiddleware);

// Security
app.use(rateLimiter);

// Routes
app.use("/api/health", healthRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
