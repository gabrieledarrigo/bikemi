export const STATIONS_INFORMATION_URL =
  "https://gbfs.urbansharing.com/bikemi.com/station_information.json";

export async function getStationsInformation(): Promise<string> {
  return await fetch(STATIONS_INFORMATION_URL, {
    method: "GET",
    headers: {
      "Client-Identifier": "gabrieledarrigo-bikemi",
    },
  }).then((res) => res.text());
}
