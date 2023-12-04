export async function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, milliseconds);
  });
}

export async function poll(
  every: number,
  run: () => void,
  shouldStop: () => boolean = () => false
): Promise<void> {
  console.log(shouldStop());

  do {
    await run();

    if (shouldStop()) {
      break;
    }

    await delay(every * 1000);
  } while (!shouldStop());
}
