import { Router } from "express";
import * as userController from '../controllers/userController.js'

const userRouter = Router();

userRouter.post('/login', userController.loginPost)

userRouter.post('/signup', userController.signUpPost)

export default userRouter