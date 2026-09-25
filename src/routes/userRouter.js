import { Router } from "express";
import secretCodeCheck from "../middleware/secretCodeCheck.js";
import isAuth from "../middleware/isAuth.js";
import * as userController from '../controllers/userController.js'

const userRouter = Router();

userRouter.post('/secretcode', isAuth, secretCodeCheck, userController.memberUpdate)

userRouter.post('/login', userController.loginPost)

userRouter.post('/logout', userController.logoutPost)

userRouter.post('/signup', userController.signUpPost)

userRouter.get('/me', userController.meGet)

export default userRouter