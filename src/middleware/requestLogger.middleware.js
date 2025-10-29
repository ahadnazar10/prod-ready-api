import logger from "../utils/logger.js";
import { randomUUID } from "crypto";

export default function requestLogger(req, res, next) {
  const start = Date.now();
  req.requestId = randomUUID();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const userId = req.user?.id || "guest";

    logger.info({
      requestId: req.requestId,
      userId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration,
    });
  });

  next();
}
