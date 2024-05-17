import { LocationClient } from "@test/clients/locations";

const run = async () => {
  const client = new LocationClient();

  const res = await client.getLocation();

  console.log({ res });
};

await run();
