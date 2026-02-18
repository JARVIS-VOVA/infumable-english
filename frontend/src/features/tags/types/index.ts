export type Tag = {
  id: number;
  title: string;
  color: string;
};

export type CreateTagDTO = {
  title: string;
  color: string;
};

export type UpdateTagDTO = {
  id: number;
  title?: string;
  color?: string;
};
