export const validateWord = wordObj => {
  let errors = {};

  if (wordObj.word.length > 1000 || wordObj.word.length === 0) {
    errors.word = 'Le mot doit contenir ente 1 et 1000 caractères';
  }
  
  if (wordObj.translation.length > 1000 || wordObj.translation.length === 0) {
    errors.translation = 'La traduction doit contenir entre 1 et 1000 caractères';
  }

  return errors;
};
