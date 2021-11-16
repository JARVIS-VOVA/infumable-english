export type UserRegistrationType = {
  user: {
    email: string
    username: string
    password: string
    passwordConfirmation: string
  }
}

export type UserLoginType = {
  session: {
    email: string
    password: string
  }
}
export interface IUser {
  createdAt: string
  email: string
  id: number
  username: string
}
