import containsOnlySpecialChars from "../containsOnlySpecialChars";
import { slugify } from "../slugify";

export const validateList = (name, existingLists) => {
  let errors = [];

  if (containsOnlySpecialChars(name)) errors.push('Le nom doit contenir au moins un chiffre ou une lettre');

  if (name.length > 50) errors.push('Le nom ne doit pas dépasser 50 caractères');

  let list = existingLists && Object
    .keys(existingLists)
    .find(key => slugify(existingLists[key].name) === slugify(name));

  if (list) errors.push('Une liste existe déjà avec ce nom');

  return errors;
};
