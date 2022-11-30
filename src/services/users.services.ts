import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

// User service - for all operations on User collection
export class UserService {
    constructor() {
    }
    // Create new user to db
    public createUser = async (payload: IUser) => {
        const userExist = await User.findOne({ "$or": [{ email: payload.email }, { phone: payload.phone }] });
        if (userExist) throw "User already exist"
        return await User.create(payload)
    }
    // Get one user data from db
    public getUser = async (id: string) => {
        return User.findById(id).select('-password')
    }
    // Update one user data in db
    public updateUser = async (id: string, payload: IUser) => {
        await User.findByIdAndUpdate(id, { $set: payload })
        return this.getUser(id)
    }
    // Delete one user data from db
    public deleteUser = async (id: string) => {
        return User.findByIdAndDelete(id)
    }

    // Get user
    public getFromMailOrPhone = async (payload: IUser) => {
        return User.findOne({ "$or": [{ email: payload.email }, { phone: payload.phone }] });
    }
}