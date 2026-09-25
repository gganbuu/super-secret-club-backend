import "dotenv/config";

export default function secretCodeCheck(req, res, next) {
    if (process.env.MEMBER_CODE !== req.body.secretcode) {
        return res.status(401).json({message: "Incorrect code"})
    }
    return next()
}