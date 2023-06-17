import { Words } from './word';

export type ListOrder = 'asc' | 'desc';

export interface List {
  createdAt: number;
  name: string;
  order: ListOrder;
  slug: string;
  words: Words | false;
}

export interface ListWithId extends List {
  id: string;
}

export interface Lists {
  [key: string]: List;
}
