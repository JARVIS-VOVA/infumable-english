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

export type SignupDTO = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};
