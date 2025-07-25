import { Router } from "express";
import userSignup from "../controllers/user/signup.controller";
import userSIgnin from "../controllers/user/signin.controller";
import userProfile from "../controllers/user/userProfile.controller";


const router = Router();

router.post('/signup', userSignup);
router.post('/signin', userSIgnin);
router.get('/profile', userProfile)

export default router