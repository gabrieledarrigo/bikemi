import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { initTRPC } from "@trpc/server";
import { Context, createContext } from "./context";

const trpc = initTRPC.context<Context>().create();

const router = trpc.router({
  count: trpc.procedure.query((opt) => {
    return 0;
  }),
});

const server = createHTTPServer({
  router,
  createContext,
});

const { port } = server.listen(3000);

console.log(`Listening on port ${port}`);
