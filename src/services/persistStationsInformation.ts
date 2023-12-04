import "dotenv/config";
import { format } from "date-fns";
import { getClient } from "../redis";
import { poll } from "../poll";

const client = getClient();

const SECONDS = 15;
const URL = "https://gbfs.urbansharing.com/bikemi.com/station_information.json";

async function persistStationsInformations() {
  await client.connect();

  poll(SECONDS, async () => {
    console.log(
      "Fetching station_information.json",
      format(new Date(), "HH:mm:ssXXXXX")
    );

    const stationsInformations = await fetch(URL, {
      method: "GET",
      headers: {
        "Client-Identifier": "gabrieledarrigo-bikemi",
      },
    }).then((res) => res.text());

    await client.set("stations:information", stationsInformations).then(() => {
      console.log(
        "station_information.json correctly persisted",
        format(new Date(), "HH:mm:ssXXXXX")
      );
    });
  });
}

persistStationsInformations().catch(async (err) => {
  await client.disconnect();

  console.error(err);
  process.exit(-1);
});
