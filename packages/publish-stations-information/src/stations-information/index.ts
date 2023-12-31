import { format } from "date-fns";
import { RedisClientType } from "redis";
import { poll } from "@bikemi/common";
import {
  getStationsInformation,
  STATIONS_INFORMATION_URL,
} from "./getStationsInformation";
import { publishStationsInformation } from "./publishStationsInformation";

export async function pollAndPublishStationsInformation(
  every: number,
  client: RedisClientType
) {
  await poll(
    every,
    async () => {
      console.log(
        `Fetching Bikemi ${STATIONS_INFORMATION_URL}`,
        format(new Date(), "HH:mm:ssXXXXX")
      );

      const stationsInformation = await getStationsInformation();

      await publishStationsInformation(client, stationsInformation).then(
        (clients) => {
          console.log(
            `${STATIONS_INFORMATION_URL} correctly published to ${clients} clients`,
            format(new Date(), "HH:mm:ssXXXXX")
          );
        }
      );
    },
    () => !client.isReady
  );
}
