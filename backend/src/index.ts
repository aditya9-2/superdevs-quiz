import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import { PrismaClient } from "@prisma/client"

export const client = new PrismaClient;

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000

app.use('/api/user', userRouter)

app.listen(port, () => {
    console.log(`server running at ${port}`);
}); 