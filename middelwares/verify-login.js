import { verify } from "../utils/token.js";



export default async (req, res, next) => {
    try {
        const token = req.header("Authorization")

        if (!token) {
            return res.status(400).json({ message: "Token is required" })
        }
        const payload = await verify(token)
        if (!payload) {
           return res.status(401).json({ message: "Unauthorised or token expried" })

        }
        req.user = payload
        next()
    } catch (error) {
        return res.status(500).json({ message: "internal server error", error })
    }





}