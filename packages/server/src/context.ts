import { getClient } from "./redis";

export async function createContext() {
  const client = getClient();
  await client.connect();

  return {
    client,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
