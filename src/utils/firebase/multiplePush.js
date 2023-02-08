const multiplePush = (ref, values) => {
  let updates = {};

  values.forEach(item => {
    let itemKey = ref.push().key;
    updates['/' + itemKey] = item;
  });

  return ref.update(updates);
};

export default multiplePush;
