import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/users.services";
import { IUser } from "../interfaces/user.interface";

// Authorisation middleware
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        // Verify token
        const tokenData = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload
        req.id = tokenData.id as string
        // Limiting access only the exact user
        if (req.params.id !== tokenData.id) throw "Unauthorized access"
        else next()
    } catch (error) {
        res.status(401).json(error)
    }
}
