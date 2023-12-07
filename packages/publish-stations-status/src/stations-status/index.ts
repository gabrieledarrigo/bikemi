import { format } from "date-fns";
import { RedisClientType } from "redis";
import { poll } from "../poll";
import { STATIONS_STATUS_URL, getStationsStatus } from "./getStationsStatus";
import { publishStationsStatus } from "./publishStationsStatus";

export async function pollAndPublishStationStatus(
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

      await publishStationsStatus(client, stationsStatus).then((clients) => {
        console.log(
          `${STATIONS_STATUS_URL} correctly published to ${clients} clients`,
          format(new Date(), "HH:mm:ssXXXXX")
        );
      });
    },
    () => !client.isReady
  );
}
