import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { UserService } from "../../services/users.services";
import { userRegisterValidation, userLoginValidation, userUpdateValidation } from "../../validations/user.validation";
import { IUser } from "../../interfaces/user.interface";

// User Controller
export class UserController {
    // Instance of User Service Class 
    private userService: UserService

    constructor() {
        this.userService = new UserService
    }
    // Create new user
    public createUser = async (req: Request, res: Response) => {
        try {
            const { error, value } = userRegisterValidation(req.body)
            if (error) throw error.details
            const salt = await bcrypt.genSalt(10)
            value.password = await bcrypt.hash(value.password, salt)
            const userData = await this.userService.createUser(value)
            if (userData)
                res.status(201).json({ id: userData._id, tocken: this.generateToken(userData._id) })
        } catch (error) {
            res.status(401).json(error)
        }
    };
    // User login 
    public loginUser = async (req: Request, res: Response) => {
        try {
            const { error, value } = userLoginValidation(req.body)
            if (error) throw error.details
            const userData = await this.userService.getFromMailOrPhone(value)
            if (userData && await bcrypt.compare(req.body.password, userData?.password as string))
                res.status(200).json({ id: userData._id, token: this.generateToken(userData._id) });
            else throw "Invalid email or password"
        } catch (error: any) {
            res.status(404).json(error)
        }
    };

    // Retrive one user data
    public getUser = async (req: Request, res: Response) => {
        try {
            const userData = await this.userService.getUser(req.params.id)
            res.status(200).json(userData);
        } catch (error) {
            res.status(404).json(error)
        }
    };
    // Delete one user
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const userData = await this.userService.getUser(req.id) as IUser
            if (userData) {
                await this.userService.deleteUser(req.id)
                res.status(200).json(`the account is deleted`)
            } else throw "User not found"
        } catch (error) {
            res.status(404).json(error)
        }
    };

    // Update one user
    public updateUser = async (req: Request, res: Response) => {
        try {
            const userData = await this.userService.getUser(req.id) as IUser
            if (userData) {
                // Validation for update
                const { error, value } = userUpdateValidation(req.body)
                if (error) throw error.details
                // Password updation
                if (value.password) {
                    const salt = await bcrypt.genSalt(10)
                    value.password = await bcrypt.hash(value.password, salt)
                }
                const user = await this.userService.updateUser(req.id, value)
                res.status(200).json(user);
            } else throw "User not found"
        } catch (error) {
            res.status(401).json(error)
        }
    }
    // Jwt token
    private generateToken = (id: string) => {
        return jwt.sign({ id }, process.env.JWT_SECRET as string, {
            expiresIn: '365d',
        })
    }
}

