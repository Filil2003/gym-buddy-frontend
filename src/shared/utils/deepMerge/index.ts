/**
 * Recursively merges multiple objects. In this case, objects are merged in the order,
 * in which they are transferred, and if the objects have the same keys, then the values
 * from subsequent objects will overwrite the values from previous ones.
 *
 * @param objects - Several objects that will be merged.
 * @returns The new object resulting from the merge.
 */
export function deepMerge(
  // biome-ignore lint/suspicious/noExplicitAny: <The function needs to handle objects with arbitrary values>
  ...objects: Record<string, any>[]
  // biome-ignore lint/suspicious/noExplicitAny: <The function needs to handle objects with arbitrary values>
): Record<string, any> {
  return objects.reduce((acc, obj) => {
    for (const key in obj) {
      if (Reflect.has(obj, key)) {
        const accValue = acc[key];
        const objValue = obj[key];

        if (isObject(accValue) && isObject(objValue)) {
          acc[key] = deepMerge(accValue, objValue);
        } else {
          acc[key] = obj[key];
        }
      }
    }
    return acc;
  }, {});
}

/**
 * Helper function that checks if the value is an object.
 * @param value - The value to be checked.
 * @returns `true` if the value is an object, `false` otherwise.
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
