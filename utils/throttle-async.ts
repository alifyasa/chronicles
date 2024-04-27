import { useState } from "react";

type AsyncFuncWrap<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => Promise<TReturn>;

// const funcA = throttleAsync(func)
// const { promise, cleanup } = funcA(a, b, c, d)
// await promise
function throttleAsync<TArgs extends any[], TReturn>(
  asyncFunction: AsyncFuncWrap<TArgs, TReturn>,
  delay: number
) {
  return function funcWrap(...args: TArgs) {
    const abortSignal = new AbortController();
    const promise = new Promise<TReturn>((resolve, reject) => {
      const timeout = setTimeout(() => {
        asyncFunction(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
      function abortListener() {
        abortSignal.signal.removeEventListener("abort", abortListener);
        clearTimeout(timeout);
        reject("Aborted");
      }
      abortSignal.signal.addEventListener("abort", abortListener);
    });
    return {
      promise,
      cleanUp: abortSignal.abort(),
    };
  };
}

export { throttleAsync };
