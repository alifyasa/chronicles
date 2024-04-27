type Mergable = Record<string, any>;
function saneMerge<T extends Mergable>(...objects: T[]): Record<string, any> {
  return objects.reduce((result, obj) => {
    Object.keys(obj).forEach((key) => {
      result[key] = obj[key] ?? result[key];
    });
    return result as Mergable;
  }, {} as Mergable);
}

export { saneMerge };
