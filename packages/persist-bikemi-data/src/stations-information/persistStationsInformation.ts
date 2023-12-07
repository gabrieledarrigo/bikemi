import { StationsInformation } from "@common/types";
import { RedisClientType } from "redis";

export async function persistStationsInformation(
  client: RedisClientType,
  stationsInformation: StationsInformation
): Promise<string | null> {
  return await client.set(
    "stations:information",
    JSON.stringify(stationsInformation)
  );
}
