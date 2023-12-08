import "dotenv/config";
import { getClient } from "./redis";
import { pollAndPublishStationStatus } from "./stations-status";

const client = getClient();

async function main() {
  await client.connect();

  return pollAndPublishStationStatus(15, client);
}

main().catch(async (err) => {
  await client.quit();

  console.error(err);
  process.exit(1);
});
