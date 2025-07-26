import { NextFunction, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../types/customRequest"
import { Role } from "@prisma/client";


const authMiddleware = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers["authorization"]

    try {

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                error: true,
                message: "Access denied. No or Invalid token provided."
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Token missing."
            });
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload & {
            id: number,
            role: Role
        };

        req.user = decodedData;

        next();

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: "Internal server error from middleware",
            details: err instanceof Error ? err.message : err
        });

    }

}

export default authMiddleware