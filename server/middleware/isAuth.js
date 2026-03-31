import Jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(403).json({
                message: "Please Login",
            });
        }

        const decodedData = Jwt.verify(token, process.env.Jwt_Sec);
        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Login First"
        });

    }
};

export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") return res.status(403).json({
            message: "You are not admin",
        });
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });

    }
}
