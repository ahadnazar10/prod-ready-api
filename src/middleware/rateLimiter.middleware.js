import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 60, // 60 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  keyGenerator: (req) => {
    if (req.user?.id) return `user_${req.user.id}`;
    // ✅ use the helper for IPv6-safe IP detection
    return `ip_${ipKeyGenerator(req)}`;
  },
});

export default limiter;
