import { DependencyList, useCallback, useEffect, useState } from "react";

export function throttle(fn: Function, time: number) {
  let lastArgs: undefined | any[] = undefined;
  let isThrottled = false;
  return function (this: unknown, ...args: unknown[]) {
    if (isThrottled) {
      lastArgs = args;
      return;
    }

    isThrottled = true;
    fn.apply(this, args);
    setTimeout(() => {
      isThrottled = false;
      if (lastArgs) {
        fn.apply(this, lastArgs);
        lastArgs = undefined;
      }
    }, time);
  };
}

export function debounce(fn: Function, time: number) {
  let timer: number | undefined = undefined;

  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}

export default function useDebouncedMemo<T>(
  fn: () => T,
  deps: DependencyList | undefined,
  time: number
): T {
  const [state, setState] = useState(fn());

  const debouncedSetState = useCallback(debounce(setState, time), []);

  useEffect(() => {
    debouncedSetState(fn());
  }, deps);

  return state;
}
