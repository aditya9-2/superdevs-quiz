import { Request, Response } from "express";
import { client } from "../..";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSignin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {

            return res.status(411).json({
                error: true,
                message: "Please provide all the details"
            });
        }

        const existingUser = await client.user.findUnique({
            where: {
                email
            }
        });

        if (!existingUser) {

            return res.status(404).json({
                error: true,
                message: "User with this email not exists!"
            });
        }

        const isMatchedPassword = await bcrypt.compare(password, existingUser.password);

        if (!isMatchedPassword) {
            return res.status(401).json({
                error: true,
                message: "Wrong credentials"
            });
        }

        const token = jwt.sign({
            id: existingUser.id,
            role: existingUser.role

        }, process.env.JWT_SECRET_KEY!,
            {
                expiresIn: '7d'
            }
        );

        return res.status(200).json({
            error: false,
            message: "User login successfully",
            token
        });


    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Internal server error from signin",
            details: err instanceof Error ? err.message : err
        });

    }
}

export default userSignin;