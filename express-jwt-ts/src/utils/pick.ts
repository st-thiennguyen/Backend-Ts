export const pick = <T extends object, Key extends keyof T>(
  object: T,
  keys: Key[]
): Pick<T, Key> => {
  const result = {} as Pick<T, Key>;
  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });
  return result;
};
