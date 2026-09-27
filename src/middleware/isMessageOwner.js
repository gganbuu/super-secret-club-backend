import { checkMessageIdWithUserId } from "../models/messagedb.js"

export default async function isMessageOwner(req, res, next) {
    const exists = checkMessageIdWithUserId(req.user.id, req.body.messageId)
    if (exists) return next()
    
    return res.status(401).json({error: "User does not own message and cannot edit it"})
}