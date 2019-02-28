// @flow

export default function throttle(
  fn: Function,
  threshold: number = 250,
  scope?: any
): void => void {
  let latest: ?number;
  let deferTimer: ?TimeoutID;

  return function runThrottledFn(): void {
    const context = scope || this;
    const now = Date.now();
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    // Not enough time has passed, continue waiting;
    if (latest && now < latest + threshold) {
      if (deferTimer) clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        latest = now;
        fn.apply(context, args);
      }, threshold);
    }
    else {
      latest = now;
      fn.apply(context, args);
    }
  };
}
