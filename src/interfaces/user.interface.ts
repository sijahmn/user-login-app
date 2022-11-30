import { Role } from "../enums/role.enum"

export interface IUser {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    address: string,
    city: string,
    state: string,
    country: string,
    zipCode: String,
    createdOn: Date,
    updatedOn: Date

}