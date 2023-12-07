import { StationsInformation } from "@bikemi/common";
import { RedisClientType } from "redis";

export async function publishStationsInformation(
  client: RedisClientType,
  stationsInformation: StationsInformation
): Promise<number> {
  return client.publish(
    "stations:information",
    JSON.stringify(stationsInformation)
  );
}
