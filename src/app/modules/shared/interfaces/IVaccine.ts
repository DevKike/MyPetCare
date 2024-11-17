export interface IVaccine {
    id: string;
    name: string;
    applicationDate: Date;
    certificate: string;
}

export interface ICreateVaccine extends Omit<IVaccine, 'id'> {}