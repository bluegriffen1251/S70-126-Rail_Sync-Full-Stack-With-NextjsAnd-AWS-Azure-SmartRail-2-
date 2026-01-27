import Redis from "ioredis";

// Use environment variable or fallback to local Docker default
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default redis;