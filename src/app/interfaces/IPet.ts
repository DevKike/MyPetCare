export interface IPet {
  id: string;
  name: string;
  breed: string
  age: number
  birthDate: Date
  imageUrl?: string;
  gender: string
}

export interface ICreatePets extends Omit<IPet, 'id'> {}
