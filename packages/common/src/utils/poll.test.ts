import { describe, it } from "node:test";
import sinon from "sinon";
import assert from "node:assert";
import { poll } from "./poll";

describe("poll", () => {
  it("should run the provided function repeatedly until shouldStop returns true", async () => {
    let counter = 0;

    const run = sinon.stub().callsFake(async () => {
      counter++;
    });

    const shouldStop = sinon.stub().callsFake(() => {
      return counter === 2;
    });

    await poll(1, run, shouldStop);

    assert.equal(run.callCount, 2);
  });

  it("should delay the execution between each run", async () => {
    let counter = 0;

    const run = sinon.stub().callsFake(async () => {
      counter++;
    });

    const shouldStop = sinon.stub().callsFake(() => {
      return counter === 2;
    });

    const delay = sinon.spy(global, "setTimeout");

    await poll(1, run, shouldStop);

    assert.equal(delay.callCount, 1);
  });
});
