import { containsOnlySpecialChars } from '../containsOnlySpecialChars';

export const validateList = (name: string) => {
  const errors = [];

  if (containsOnlySpecialChars(name)) errors.push('Le nom doit contenir au moins un chiffre ou une lettre');
  if (name.length > 50) errors.push('Le nom ne doit pas dépasser 50 caractères');

  return errors;
};
