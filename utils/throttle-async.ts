type AsyncFuncWrap<TArgs extends unknown[], TReturn> = (
  ...args: TArgs
) => Promise<TReturn>;

function throttleAsync<TArgs extends unknown[], TReturn>(
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
        reject(
          `Aborted ${funcWrap.name}(${args.map((el) => JSON.stringify(el)).join(", ")})`
        );
      }
      abortSignal.signal.addEventListener("abort", abortListener);
    });
    return {
      promise,
      cleanUp: () => abortSignal.abort(),
    };
  };
}

export { throttleAsync };
