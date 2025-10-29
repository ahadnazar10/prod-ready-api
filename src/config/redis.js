import { createClient } from "redis";
import config from "./index.js";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();

console.log("✅ Redis connected");

export default redisClient;
