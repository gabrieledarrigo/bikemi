import "dotenv/config";
import { pollAndPublishStationsInformation } from "./stations-information";
import { getClient } from "./redis";

const client = getClient();

async function main() {
  await client.connect();

  return pollAndPublishStationsInformation(15, client);
}

main().catch(async (err) => {
  await client.quit();

  console.error(err);
  process.exit(1);
});
