import { Router } from "express";
import userSignup from "../controllers/user/signup.controller";
import userSIgnin from "../controllers/user/signin.controller";


const router = Router();

router.post('/signup', userSignup);
router.post('/signin', userSIgnin);

export default router