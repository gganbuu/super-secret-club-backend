import { body, matchedData } from "express-validator";
import validate from "../middleware/validator.js";
import * as messagedb from '../models/messagedb.js'
import isMessageOwner from "../middleware/isMessageOwner.js";

const validateMessage = [
    body("title").trim().notEmpty().withMessage('Title must not be empty')
            .isAlphanumeric('en-US', { ignore: ' ' }).withMessage('Title must contain only letters or numbers')
            .isLength({max: 40}).withMessage('Title must not exceed 40 characters'),
    body("content").trim().notEmpty().withMessage('Content must not be empty')
                   .isLength({max: 150}).withMessage('Content must be maximum 150 characters')
]   

export const allMessagesGet = async (req,res) => {
    let messages;
    if (req.user == undefined || req.user.member == false) {
        messages = await messagedb.allMessagesGet()
    } else { messages = await messagedb.allMessagesFullGet()}
    res.status(200).json({messages: messages})

}

export const messagePost = [
    validateMessage,
    validate,
    async (req,res) => {
        const {title, content} = matchedData(req)
        await messagedb.messagePost({
            userId: req.user.id,
            title,
            content,
        })
        res.status(201).json({message: 'Message created'})
    }
]

export const messageEdit = [
    isMessageOwner,
    validateMessage,
    validate,
    async (req, res) => {
        const {title, content} = matchedData(req)
        await messagedb.messageEdit({
            messageId: req.body.messageId,
            title,
            content,
        })
        res.status(201).json({message: 'Message edited'})
    }
]

export const messageDelete = [
    isMessageOwner,
    async (req, res) => {
        await messagedb.messageDelete({messageId: req.body.messageId})
        res.status(201).json({message: 'Message deleted'})
    }
]