export const STATIONS_STATUS_URL =
  "https://gbfs.urbansharing.com/bikemi.com/station_status.json";

export async function getStationsStatus(): Promise<string> {
  return await fetch(STATIONS_STATUS_URL, {
    method: "GET",
    headers: {
      "Client-Identifier": "gabrieledarrigo-bikemi",
    },
  }).then((res) => res.text());
}
