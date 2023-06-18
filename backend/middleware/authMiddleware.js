import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: "Not authorized" });
        }
    } else {
        res.status(401).json({ error: "No token: Not authorized" });
    }
}