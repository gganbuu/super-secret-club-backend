export default function isAuth(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.status(401).json({ message: 'you must be logged in'})
}