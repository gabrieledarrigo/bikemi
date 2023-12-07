import { RedisClientType, createClient } from "redis";

export function getClient(): RedisClientType {
  return createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      port: +(process.env?.REDIS_PORT || 6379),
      host: process.env.REDIS_HOST,
    },
  });
}
