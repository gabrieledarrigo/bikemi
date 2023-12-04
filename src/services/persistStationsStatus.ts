import "dotenv/config";
import { getClient } from "../redis";
import { poll } from "../poll";
import { format } from "date-fns";

const client = getClient();

const SECONDS = 15;
const URL = "https://gbfs.urbansharing.com/bikemi.com/station_status.json";

async function persistStationStatus() {
  await client.connect();

  poll(SECONDS, async () => {
    console.log(
      "Fetching station_status.json",
      format(new Date(), "HH:mm:ssXXXXX")
    );

    const stationsStatus = await fetch(URL, {
      method: "GET",
      headers: {
        "Client-Identifier": "gabrieledarrigo-bikemi",
      },
    }).then((res: Response) => res.text());

    await client.set("stations:status", stationsStatus).then(() => {
      console.log(
        "station_status.json correctly persisted",
        format(new Date(), "HH:mm:ssXXXXX")
      );
    });
  });
}

persistStationStatus().catch(async (err) => {
  await client.disconnect();

  console.error(err);
  process.exit(-1);
});
