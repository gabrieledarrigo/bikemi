import { RedisClientType } from "redis";

export async function persistStationsInformation(
  client: RedisClientType,
  stationsInformations: string
): Promise<string | null> {
  return await client.set("stations:information", stationsInformations);
}
