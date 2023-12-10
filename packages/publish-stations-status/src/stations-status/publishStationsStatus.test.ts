import { describe, it } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { RedisClientType } from "redis";
import { publishStationsStatus } from "./publishStationsStatus";
import { StationsStatus } from "@bikemi/common";

describe("publishStationsStatus", () => {
  const publishFn = sinon.stub().callsFake(() => 1);

  const client = {
    publish: publishFn,
  } as any as RedisClientType;

  const stationsStatus = {
    ttl: 100,
    data: {
      stations: [
        { station_id: 1, num_bikes_available: 4 },
        { station_id: 2, num_bikes_available: 4 },
      ],
    },
  } as any as StationsStatus;

  it("should publish the stations status to Redis", async () => {
    const expectedPayload = JSON.stringify(stationsStatus);

    const actual = await publishStationsStatus(client, stationsStatus);

    assert(publishFn.calledWith("stations:status", expectedPayload));
    assert.deepEqual(actual, 1);
  });
});
