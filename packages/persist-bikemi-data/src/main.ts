import "dotenv/config";
import { pollAndPersistStationsInformation } from "./stations-information";
import { getClient } from "./redis";
import { pollAndPersistStationStatus } from "./stations-status";

const client = getClient();

async function main() {
  await client.connect();

  return Promise.all([
    pollAndPersistStationStatus(15, client),
    pollAndPersistStationsInformation(15, client),
  ]);
}

main().catch(async (err) => {
  await client.quit();

  console.error(err);
  process.exit(1);
});

// import "dotenv/config";
// import http from "node:http";
// import { getClient } from "../redis";

// const client = getClient();

// export interface StationStatus {
//   last_updated: number;
//   ttl: number;
//   data: {
//     stations: StationStatusEntry[];
//   };
// }

// export interface StationStatusEntry {
//   station_id: string;
//   num_bikes_available: number;
//   num_bikes_disabled?: number;
//   num_docks_available: number;
//   num_docks_disabled?: number;
//   is_installed: boolean;
//   is_renting: boolean;
//   is_returning: boolean;
//   last_reported: number;
// }

// export interface CountResult {
//   count: number;
//   message: string;
// }

// export async function count(): Promise<CountResult> {
//   await client.connect();

//   const data = await client.get("stations:status");

//   if (!data) {
//     const message = "Cannot get Bikemi stations status";
//     console.error(message);

//     return {
//       count: 0,
//       message: "Cannot get Bikemi stations status",
//     };
//   }

//   const stationsStutus = JSON.parse(data) as StationStatus;

//   const count = stationsStutus.data.stations.reduce(
//     (count, stationStatusEntry) => {
//       return (count = count + stationStatusEntry.num_bikes_available);
//     },
//     0
//   );

//   return {
//     count,
//     message: `There are ${count} Bikemi available in Milan`,
//   };
// }

// const server = http.createServer(async (_, res) => {
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });

//   res.end(JSON.stringify(await count()));

//   await client.disconnect();
// });

// server.listen(8000, () => {
//   console.log("Count server up and running on port 8000");
// });
