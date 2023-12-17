import { observable } from "@trpc/server/observable";
import { StationsStatus } from "@bikemi/common";
import { Context } from "../context";

export async function subscribeToStationsStatus(opt: { ctx: Context }) {
  const { client } = opt.ctx;

  return observable<StationsStatus>((emit) => {
    client.subscribe("stations:status", (message) => {
      const stationsStatus: StationsStatus = JSON.parse(message);

      emit.next(stationsStatus);
    });

    return () => {
      client.unsubscribe("stations:status");
    };
  });
}
