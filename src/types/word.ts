export interface Word {
  createdAt: number;
  lastReview: false | number;
  lvl: number;
  translation: string;
  word: string;
}

export interface WordFormData {
  word: string;
  translation: string;
}

export interface WordWithId extends Word {
  id: string;
}

export interface Words {
  [key: string]: Word;
}
