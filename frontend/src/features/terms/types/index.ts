export type Term = {
  id: number;
  phrase: string;
  meaning: string;
  example?: string;
  tags?: string[];
};

export type CreateTermDTO = {
  term: Omit<Term, 'id'>;
};

export type UpdateTermDTO = {
  term: Partial<Omit<Term, 'id'>>;
};
