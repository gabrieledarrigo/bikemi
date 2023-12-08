import { RedisClientType } from "redis";
import { publishStationsStatus } from "./publishStationsStatus";
import { StationsStatus } from "@bikemi/common";

describe("publishStationsStatus", () => {
  it("should publish the stations status to Redis", async () => {
    const client = {
      publish: jest.fn().mockResolvedValue(1),
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

    const expectedPayload = JSON.stringify(stationsStatus);

    const actual = await publishStationsStatus(client, stationsStatus);

    expect(client.publish).toHaveBeenCalledWith(
      "stations:status",
      expectedPayload
    );
    expect(actual).toBe(1);
  });
});
