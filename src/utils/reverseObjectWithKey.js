const reverseObject = objectToReverse => {
  if (!objectToReverse) throw new Error('No object to reverse');

  const reversedObject = {};

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

export default reverseObject;
