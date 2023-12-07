import { StationsStatus } from "@common/types";

export const STATIONS_STATUS_URL =
  "https://gbfs.urbansharing.com/bikemi.com/station_status.json";

export async function getStationsStatus(): Promise<StationsStatus> {
  return await fetch(STATIONS_STATUS_URL, {
    method: "GET",
    headers: {
      "Client-Identifier": "gabrieledarrigo-bikemi",
    },
  }).then((res) => res.json() as any as StationsStatus);
}
