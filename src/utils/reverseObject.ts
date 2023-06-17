interface ReversableObject<T> {
  [key: string]: T;
}

export const reverseObject = <T>(objectToReverse: ReversableObject<T>): ReversableObject<T> => {
  const reversedObject = {} as ReversableObject<T>;

  Object
    .keys(objectToReverse)
    .reverse()
    .forEach(key => {
      const object = objectToReverse[key];

      if (object) {
        reversedObject[key] = object;
      }
    });

  return reversedObject;
};