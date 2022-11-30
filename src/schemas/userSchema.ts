import { Schema } from "mongoose";
import { Role } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

//User Schema
export const userSchema = new Schema<IUser>({
    _id: String,
    firstName: {
        type: String,
        required: true
    },
    middleName: String,
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: String,
    password: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    createdOn: Date,
    updatedOn: Date

})



