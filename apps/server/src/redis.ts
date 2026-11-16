
import Redis from "ioredis";

export const redis = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      return Math.min(times * 500, 5000);
    },
  }
);

redis.on("connect", () => {
  console.log("Redis connected successfully!");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});
