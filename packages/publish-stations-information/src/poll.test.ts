import { delay, poll } from "./poll";

describe("delay", () => {
  jest.useFakeTimers();

  it("should resolve after the specified delay", async () => {
    const delayTime = 1000;
    const promise = delay(delayTime);

    jest.advanceTimersByTime(delayTime);

    await expect(promise).resolves.toBeUndefined();
  });
});

describe("poll", () => {
  jest.useFakeTimers();

  it("should run the provided function repeatedly until shouldStop returns true", async () => {
    const every = 1;
    const run = jest.fn();
    const shouldStop = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    await poll(every, run, shouldStop);

    expect(run).toHaveBeenCalledTimes(2);
    expect(shouldStop).toHaveBeenCalledTimes(2);
  });

  it("should delay between each run", async () => {
    const every = 1;
    const run = jest.fn();
    const shouldStop = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    await poll(every, run, shouldStop);

    expect(run).toHaveBeenCalledTimes(2);
    expect(shouldStop).toHaveBeenCalledTimes(2);
    expect(delay).toHaveBeenCalledTimes(1);
    expect(delay).toHaveBeenCalledWith(every * 1000);
  });
});
