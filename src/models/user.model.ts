import { model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { userSchema } from "../schemas/userSchema";

export const User = model<IUser>('User', userSchema)