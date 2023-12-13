import { describe, it } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { subscribeToStationsStatus } from "./subscribeToStationsStatus";
import { Context } from "../context";

describe("subscribeToStationsStatus", () => {
  const observer = {
    next: sinon.spy(),
    error: sinon.spy(),
    complete: sinon.spy(),
  };

  it('should subscribe to "stations:status" channel', async () => {
    const client = {
      subscribe: sinon.spy(),
      unsubscribe: sinon.spy(),
    };

    const ctx = {
      client,
    } as any as Context;

    (await subscribeToStationsStatus({ ctx })).subscribe(observer);

    assert(client.subscribe.calledWith("stations:status"));
  });
});
