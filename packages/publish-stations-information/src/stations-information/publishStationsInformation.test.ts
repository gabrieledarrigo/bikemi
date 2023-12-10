import { describe, it } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { RedisClientType } from "redis";
import { publishStationsInformation } from "./publishStationsInformation";
import { StationsInformation } from "@bikemi/common";

describe("publishStationsInformation", () => {
  const publishFn = sinon.stub().callsFake(() => 1);

  const client = {
    publish: publishFn,
  } as any as RedisClientType;

  const stationsInformation = {
    ttl: 100,
    data: {
      station1: { name: "Station 1", capacity: 10 },
      station2: { name: "Station 2", capacity: 15 },
    },
  } as any as StationsInformation;

  it("should publish the stations information to Redis", async () => {
    const expectedChannel = "stations:information";
    const expectedPayload = JSON.stringify(stationsInformation);

    const actual = await publishStationsInformation(
      client,
      stationsInformation
    );

    assert(publishFn.calledWith(expectedChannel, expectedPayload));
    assert.deepEqual(actual, 1);
  });
});
