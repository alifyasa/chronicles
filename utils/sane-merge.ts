/**
 * Consider the following example
 * ```
 * const a = {
 *   key1: "Real Data"
 * }
 * const b = {
 *   key1: undefined
 * }
 * ```
 *
 * The code below returns `{ key1: undefined }`
 * ```
 * // Returns { key1: undefined }
 * console.log({
 *   ...a,
 *   ...b
 * })
 * ```
 *
 * But the code below returns `{ key1: 'Real Data' }`
 * ```
 * // Returns { key1: 'Real Data' }
 * console.log({
 *   ...b,
 *   ...a
 * })
 * ```
 * I want it to return `{ key1: 'Real Data' }` by merging the objects but ignoring
 * keys with `null` or `undefined` value.
 *
 * @param ...objects Any amount of objects
 * @returns Merged object but with null and undefined ignored
 */
type Mergable = Record<string, unknown>;
function truthyMerge<T extends Mergable>(...objects: T[]): Required<T> {
  return objects.reduce((result, obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        result[key] = obj[key];
      }
    });
    return result;
  }, {} as Mergable) as Required<T>;
}

function definedMerge<T extends Mergable>(...objects: T[]): Required<T> {
  return objects.reduce((result, obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    });
    return result;
  }, {} as Mergable) as Required<T>;
}
export { truthyMerge, definedMerge };
