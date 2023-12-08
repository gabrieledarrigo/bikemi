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

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(stationsStatus),
    });
  });

  it("should fetch stations status with the correct URL and headers", async () => {
    const expectedHeaders = {
      "Client-Identifier": "gabrieledarrigo-bikemi",
    };

    await getStationsStatus();

    expect(global.fetch).toHaveBeenCalledWith(STATIONS_STATUS_URL, {
      method: "GET",
      headers: expectedHeaders,
    });
  });

  it("should return the stations status data", async () => {
    const actual = await getStationsStatus();

    expect(actual).toEqual(stationsStatus);
  });
});
