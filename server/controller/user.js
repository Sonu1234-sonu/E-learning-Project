import { User } from "../models/user.js";
import bcrypt from 'bcrypt';

import jwt from "jsonwebtoken";
import sendMail from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";

export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({
            message: "User Already exists",
        });

        const hashPassword = await bcrypt.hash(password, 10)
        user = {
            name,
            email,
            password: hashPassword
        }
        const otp = Math.floor(Math.random() * 1000000);

        const activationToken = jwt.sign({
            user,
            otp,
        }, process.env.ActivationSecret, { expiresIn: "5m", });



        const data = {
            name,
            otp,
        }

        try {
            await sendMail(email, "E-learning OTP Verification", data)
        } catch (mailError) {
            return res.status(500).json({
                message: "Failed to send OTP email",
                details: mailError.message,
            })
        }

        // optional: persist user with unverified status (recommended)
        await User.create({ name, email, password: hashPassword, isEmailVerified: false })

        res.status(200).json({ message: "OTP sent to your mail", activationToken })
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};



export const verifyUser = TryCatch(async (req, res) => {
    const { otp, activationToken } = req.body

    const veryfy = jwt.verify(activationToken, process.env.ActivationSecret)
    if (!veryfy) return res.status(400).json({
        message: "Otp expired"
    });

    const otpFromRequest = String(otp).trim()
    const otpFromToken = String(veryfy.otp).trim()
    if (otpFromToken !== otpFromRequest) return res.status(400).json({
        message: "Wrong Otp"
    });

    const userExists = await User.findOne({ email: veryfy.user.email })
    if (userExists) {
        if (userExists.isEmailVerified) {
            return res.status(400).json({ message: "User already verified" })
        }
        userExists.isEmailVerified = true
        await userExists.save()
        return res.status(200).json({ message: "OTP verified, user activated" })
    }

    await User.create({
        name: veryfy.user.name,
        email: veryfy.user.email,
        password: veryfy.user.password,
        isEmailVerified: true,
    })
    res.json({
        message: "User registered successfully"
    })

});


export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({
        message: "No User with this email",
    });

    const mathPassword = await bcrypt.compare(password, user.password);

    if (!mathPassword) return res.status(400).json({
        message: "Wrong Password",
    });

    const token = await jwt.sign({ id: user._id }, process.env.Jwt_Sec, {
        expiresIn: "15d",
    });
    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user,
    })

})

export const myProfile = TryCatch(async (req, res) => {

    const user = await User.findById(req.user._id)
    res.json({ user });

})


