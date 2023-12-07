import { StationsStatus } from "@bikemi/common";
import { RedisClientType } from "redis";

export async function publishStationsStatus(
  client: RedisClientType,
  stationsStatus: StationsStatus
): Promise<number> {
  return client.publish("stations:status", JSON.stringify(stationsStatus));
}
