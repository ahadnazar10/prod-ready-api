import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redisClient from "../config/redis.js";

const router = express.Router();

// Login: 5 attempts per minute per IP
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
});

router.post("/signup", signup);
router.post("/login", loginLimiter, login);

export default router;
