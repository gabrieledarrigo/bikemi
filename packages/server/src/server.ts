import "dotenv/config";
import cors from "cors";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { initTRPC } from "@trpc/server";
import { WebSocketServer } from "ws";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { Context, createContext } from "./context";
import { subscribeToStationsStatus } from "./resolvers/subscribeToStationsStatus";

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router({
  count: trpc.procedure.query(() => {
    return 0;
  }),
  stationsStatus: trpc.procedure.subscription((opt) => {
    return subscribeToStationsStatus(opt);
  }),
});

const { server, listen } = createHTTPServer({
  middleware: cors(),
  router,
  createContext,
});

const wss = new WebSocketServer({ server });
applyWSSHandler<typeof router>({
  wss,
  router,
  createContext,
});

const { port } = listen(3000);
console.log(`Listening on port ${port}`);
