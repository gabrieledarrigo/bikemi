import { StationsStatus } from "@common/types";
import { RedisClientType } from "redis";

export async function persistStationsStatus(
  client: RedisClientType,
  stationsStatus: StationsStatus
): Promise<string | null> {
  return await client.set("stations:status", JSON.stringify(stationsStatus));
}
