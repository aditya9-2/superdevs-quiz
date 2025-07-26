import { Response } from "express"
import { client } from "../..";
import { IGetUserAuthInfoRequest } from "../../types/customRequest";

const userProfile = async (req: IGetUserAuthInfoRequest, res: Response) => {

    try {

        const user = await client.user.findUnique({
            where: {
                id: req.user?.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (err) {

        return res.status(500).json({
            error: true,
            message: "Internal server error from userProfile",
            details: err instanceof Error ? err.message : err
        });

    }

}

export default userProfile

