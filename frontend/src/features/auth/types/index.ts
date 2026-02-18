export type AuthUser = {
  id: number;
  email: string;
  username: string;
};

export type Session = {
  authenticated: boolean;
};

export type LoginDTO = {
  session: {
    email: string;
    password: string;
  };
};
