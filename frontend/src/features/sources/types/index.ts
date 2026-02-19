export type SourceTerm = {
  id: number;
  phrase: string;
  meaning: string | null;
  priority?: number;
  sourceId: number;
  learnt?: boolean;
};

export type Source = {
  id: number;
  title: string;
  isPublic: boolean;
  userId: number;
  authorUsername?: string;
  termsCount?: number;
  terms?: SourceTerm[];
};

export type CreateSourceDTO = {
  source: {
    title: string;
    text?: string;
    isPublic?: boolean;
  };
};
