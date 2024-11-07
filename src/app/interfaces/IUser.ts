export interface IUser {
  id: string;
  name: string;
  lastName: string;
  age: number;
  phoneNumber: number;
  email: string;
  password: string;
  image: string;
}

export interface ICreateUser extends Omit<IUser, 'id' | 'email' | 'password'> {}

export interface IAuthUser extends Pick<IUser, 'email' | 'password'> {}