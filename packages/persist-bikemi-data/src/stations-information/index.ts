import { format } from "date-fns";
import { RedisClientType } from "redis";
import { poll } from "../poll";
import {
  getStationsInformation,
  STATIONS_INFORMATION_URL,
} from "./getStationsInformation";
import { persistStationsInformation } from "./persistStationsInformation";

export async function pollAndPersistStationsInformation(
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

      const stationsInformations = await getStationsInformation();

      await persistStationsInformation(client, stationsInformations).then(
        () => {
          console.log(
            `${STATIONS_INFORMATION_URL} correctly persisted`,
            format(new Date(), "HH:mm:ssXXXXX")
          );
        }
      );
    },
    () => !client.isReady
  );
}
