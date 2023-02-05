import { slugify } from "../slugify";

export const validateList = (name, existingLists) => {
  let error;

  if (name.length > 50) error = 'Le nom ne doit pas dépasser 50 caractères';

  let list = existingLists && Object
    .keys(existingLists)
    .find(key => slugify(existingLists[key].name) === slugify(name));
    
  if (list) error = 'Une liste existe déjà avec ce nom';

  return error;
};
