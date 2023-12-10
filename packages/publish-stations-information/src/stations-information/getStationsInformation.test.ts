import { describe, beforeEach, it } from "node:test";
import sinon from "sinon";
import {
  STATIONS_INFORMATION_URL,
  getStationsInformation,
} from "./getStationsInformation";
import assert from "node:assert";

describe("getStationsInformation", () => {
  const stationsInformation = {
    ttl: 100,
    data: {
      stations: [
        { station_id: 1, name: "Station 1", capacity: 10 },
        { station_id: 2, name: "Station 2", capacity: 15 },
      ],
    },
  };

  const response = new Response(JSON.stringify(stationsInformation), {
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });

  const fetchFn = sinon.stub(global, "fetch");

  beforeEach(() => {
    fetchFn.callsFake(() => Promise.resolve(response));
  });

  it("should fetch stations information with the correct URL and headers", async () => {
    const expectedHeaders = {
      "Client-Identifier": "gabrieledarrigo-bikemi",
    };

    const actual = await getStationsInformation();

    assert(
      fetchFn.calledWith(STATIONS_INFORMATION_URL, {
        method: "GET",
        headers: expectedHeaders,
      })
    );
    assert.deepEqual(actual, stationsInformation);
  });
});
