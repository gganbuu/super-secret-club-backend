import passport from "passport";
import { body, matchedData, ExpressValidator } from "express-validator";
import validate from "../middleware/validator.js";
import bcrypt from "bcryptjs";
import * as userdb from '../models/userdb.js'


const validateSignUp = [
    body("username").trim().notEmpty().withMessage('Username must not be empty')
                    .isAlphanumeric().withMessage('Username must contain only letters or numbers')
                    .isLength({min: 8, max: 20}).withMessage('Username must be between 8-20 characters')
                    .custom(async (username) => {
                        const check = await userdb.checkUsernameExists(username)
                        return !check
                    }).withMessage("Username already taken"),
    body("password").trim().notEmpty().withMessage('Password must not be empty')
                    .isLength({min: 8, max: 20}).withMessage('Password must be between 8-20 characters')
                    .matches(/[A-Z]/).withMessage('Password must have on uppercase letter')
                    .matches(/[0-9]/).withMessage('Password must have at least one number')
                    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must have one special char'),
    body("confirmPassword").custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("Confirmed password must match with password")
]


// we can't use the same implementation we used in the inventory app as we are now calling the API
// from a dedicated frontend (built with react), so we cannot simply route our application to /login or /messages
export function loginPost(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info?.message });
        // with a custom callback you must log the user in yourself
        req.login(user, (err) => {
            if (err) return next(err);
            res.json({ user }); // writes session row to your postgre session table through connect-pg-simple 
        })
    })(req, res, next)
}

export const signUpPost = [
    validateSignUp,
    validate,
    async (req, res) => {
        const { username, password } = matchedData(req);
        const passwordHash = await bcrypt.hash(password, 10)
        await userdb.addUser({username, passwordHash})
        res.status(201).json({ message: "Account created" })
    }
]

export function logoutPost(req, res) {
    req.logout((err) => {
    if (err) { 
      return next(err); 
    }})
    res.status(200).json({message: "Logout Successful"})
}