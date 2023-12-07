import { RedisClientType } from "redis";

export async function persistStationsStatus(
  client: RedisClientType,
  stationsStatus: string
): Promise<string | null> {
  return await client.set("stations:status", stationsStatus);
}
