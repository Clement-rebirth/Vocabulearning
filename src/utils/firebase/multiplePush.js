import { update, push } from 'firebase/database';

const multiplePush = (ref, values) => {
  let updates = {};

  values.forEach(item => {
    const itemKey = push(ref).key;
    updates[`/${itemKey}`] = item;
  });

  return update(ref, updates);
};

export default multiplePush;
