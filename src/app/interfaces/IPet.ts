import { IUser } from "./IUser";

export interface IPet {
  id: string;
  name: string;
  breed: string
  age: number
  birthDate: string
  imageUrl?: string;
  gender: string
  userId: string
}

export interface ICreatePets extends Omit<IPet, 'id'> {
  id?: string;
}
