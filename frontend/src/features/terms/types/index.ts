export type Term = {
  id: number;
  phrase: string;
  meaning: string | null;
  learnt?: boolean;
  priority?: number;
  sourceId?: number;
  example?: string;
};

export type CreateTermDTO = {
  term: Omit<Term, 'id'>;
};

export type UpdateTermDTO = {
  term: Partial<Omit<Term, 'id'>>;
};
