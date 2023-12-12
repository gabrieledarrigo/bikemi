/**
 * Delays the execution for the specified number of milliseconds.
 * @param milliseconds The number of milliseconds to delay.
 * @returns A promise that resolves after the specified delay.
 */
export async function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, milliseconds);
  });
}

/**
 * Executes a function repeatedly at a specified interval until a stop condition is met.
 * @param every The interval in seconds at which the function should be executed.
 * @param run The function to be executed at each interval.
 * @param shouldStop The optional function that determines when to stop the polling. Defaults to a function that always returns false.
 * @returns A Promise that resolves when the polling is stopped.
 */
export async function poll(
  every: number,
  run: () => void,
  shouldStop: () => boolean = () => false
): Promise<void> {
  do {
    await run();

    if (shouldStop()) {
      break;
    }

    await delay(every * 1000);
  } while (!shouldStop());
}
