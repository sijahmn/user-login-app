import joi from 'joi'
import { Role } from '../enums/role.enum'
import { IUser } from '../interfaces/user.interface'

// Backend Validation
export const userRegisterValidation = (userData: IUser) => {
    const Schema = joi.object({
        firstName: joi.string().min(3).max(30).required(),
        lastName: joi.string().min(3).max(30),
        email: joi.string().email().required(),
        phone: joi.string().required(),
        password: joi.string().min(8).required(),
        address: joi.string(),
        city: joi.string(),
        state: joi.string(),
        country: joi.string(),
        zipCode: joi.string(),
    }).default()
    return Schema.validate(userData)
}

export const userLoginValidation = (userData: IUser) => {
    const Schema = joi.object({
        email: joi.string().email(),
        phone: joi.string(),
        password: joi.string().required(),
    }).default()
    return Schema.validate(userData)
}

export const userUpdateValidation = (userData: IUser) => {
    const Schema = joi.object({
        firstName: joi.string().min(3).max(30).required(),
        lastName: joi.string().min(3).max(30),
        email: joi.string().email().required(),
        phone: joi.string().required(),
        password: joi.string().min(8).required(),
        address: joi.string(),
        city: joi.string(),
        state: joi.string(),
        country: joi.string(),
        zipCode: joi.string(),
    }).default()
    return Schema.validate(userData)
}