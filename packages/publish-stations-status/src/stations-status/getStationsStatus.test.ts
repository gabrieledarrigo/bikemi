import { describe, beforeEach, it } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { STATIONS_STATUS_URL, getStationsStatus } from "./getStationsStatus";

describe("getStationsStatus", () => {
  const stationsStatus = {
    ttl: 100,
    data: {
      stations: [
        { station_id: 1, num_bikes_available: 4 },
        { station_id: 2, num_bikes_available: 4 },
      ],
    },
  };

  const response = new Response(JSON.stringify(stationsStatus), {
    status: 200,
    headers: {
      "Content-type": "application/json",
    },
  });

  const fetchFn = sinon.stub(global, "fetch");

  beforeEach(() => {
    fetchFn.callsFake(() => Promise.resolve(response));
  });

  it("should fetch stations status with the correct URL and headers", async () => {
    const expectedHeaders = {
      "Client-Identifier": "gabrieledarrigo-bikemi",
    };

    const actual = await getStationsStatus();

    assert(
      fetchFn.calledWith(STATIONS_STATUS_URL, {
        method: "GET",
        headers: expectedHeaders,
      })
    );
    assert.deepEqual(actual, stationsStatus);
  });
});
