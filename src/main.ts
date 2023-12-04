import { fork } from "node:child_process";
import path from "path";

const services = [
  "persistStationsInformation",
  "persistStationsStatus",
  "count",
];

const processes = services.map((service) => {
  const child = fork(
    path.join(__dirname, `./services/${service}${path.extname(__filename)}`)
  );

  child.on("exit", () => {
    console.log(`Process with id ${child.pid}, exiting`);
  });

  child.on("close", (_, signal) => {
    console.log(`Process with id ${child.pid}, closed with signal ${signal}`);
  });

  child.on("error", (err) => {
    console.error(`Process with id ${child.pid}, errored`, err);
  });

  return child;
});

function cleanUp() {
  processes.forEach((child) => {
    child.kill();
  });
}

process.on("exit", cleanUp);
process.on("SIGINT", cleanUp);
