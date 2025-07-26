import { Role } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends Request {
    user?: JwtPayload & {
        id: number;
        role: Role;
    };
}