import { Router } from "express";
import * as userController from '../controllers/userController.js'

const userRouter = Router();


userRouter.post('/login', userController.loginPost)

userRouter.post('/logout', userController.logoutPost)

userRouter.post('/signup', userController.signUpPost)

userRouter.get('/me', userController.meGet)

export default userRouter