import { Redis } from "@upstash/redis";

type RateLimitResponse = {
  success: boolean;
  remaining: number;
  reset: number;
};

export async function rateLimit(
  request: Request,
  limit = 5, // 5 requests
  window = 60 * 60 // 1 hour in seconds
): Promise<RateLimitResponse> {
  try {
    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.warn("Rate limiting disabled: Redis not configured");
      return {
        success: true,
        remaining: limit,
        reset: Date.now() + window * 1000
      };
    }

    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const key = `rate-limit:${ip}`;
    
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
      automaticDeserialization: false
    });

    const now = Date.now();
    const resetTime = now + (window * 1000);

    // Use atomic operations to prevent race conditions
    const count = await redis.incr(key);
    
    // Set expiration only on first request
    if (count === 1) {
      await redis.expire(key, window);
    }

    const remaining = Math.max(0, limit - count);

    return {
      success: count <= limit,
      remaining,
      reset: resetTime
    };
  } catch (error) {
    console.error("Rate limit error:", error);
    // Fail open - allow the request if rate limiting fails
    return {
      success: true,
      remaining: 1,
      reset: Date.now() + window * 1000
    };
  }
}