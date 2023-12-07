import { format } from "date-fns";
import { RedisClientType } from "redis";
import { poll } from "../poll";
import { STATIONS_STATUS_URL, getStationsStatus } from "./getStationsStatus";
import { persistStationsStatus } from "./persistStationsStatus";

export async function pollAndPersistStationStatus(
  every: number,
  client: RedisClientType
) {
  await poll(
    every,
    async () => {
      console.log(
        `Fetching Bikemi ${STATIONS_STATUS_URL}`,
        format(new Date(), "HH:mm:ssXXXXX")
      );

      const stationsStatus = await getStationsStatus();

      await persistStationsStatus(client, stationsStatus).then(() => {
        console.log(
          `${STATIONS_STATUS_URL} correctly persisted`,
          format(new Date(), "HH:mm:ssXXXXX")
        );
      });
    },
    () => !client.isReady
  );
}
