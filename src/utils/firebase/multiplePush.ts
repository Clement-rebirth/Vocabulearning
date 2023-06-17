import { update, push, DatabaseReference } from 'firebase/database';

interface Updates<T> {
  [key: string]: T;
}

const multiplePush = <T>(ref: DatabaseReference, values: T[]) => {
  let updates: Updates<T> = {};

  values.forEach(item => {
    const itemKey = push(ref).key;

    if (!itemKey) {
      throw new Error('Ivalid ref');
    }

    updates[`/${itemKey}`] = item;
  });

  return update(ref, updates);
};

export default multiplePush;
