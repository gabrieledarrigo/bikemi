import { StationsStatus } from "@common/types";
import { RedisClientType } from "redis";

export async function publishStationsStatus(
  client: RedisClientType,
  stationsStatus: StationsStatus
): Promise<number> {
  return client.publish("stations:status", JSON.stringify(stationsStatus));
}
