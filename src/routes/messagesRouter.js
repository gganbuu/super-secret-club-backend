import { Router } from "express";
import * as messagesController from '../controllers/messagesController.js'
import isAuth from "../middleware/isAuth.js";

const messagesRouter = Router();

messagesRouter.get('/allmessages', messagesController.allMessagesGet)

messagesRouter.post('/newmessage', isAuth, messagesController.messagePost)


export default messagesRouter   