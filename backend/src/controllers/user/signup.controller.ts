import { Request, Response } from "express";
import { client } from "../../index";
import bcrypt from "bcryptjs";

const userSignup = async (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {

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

        if (existingUser) {
            return res.status(409).json({
                error: true,
                message: "User with this email already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await client.user.create({

            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            error: false,
            message: "User created successfully",
            user: {
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Internal server error from signup",
            details: err instanceof Error ? err.message : err
        });
    }
};

export default userSignup;
