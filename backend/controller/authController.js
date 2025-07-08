import User from "../model/UserModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genTokenAdmin } from "../config/token.js";

export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists ! Check email" });
        }
        if (!validator.isEmail) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  
        })
        return res.status(201).json(user);

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: `registration error ${error}` });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User does not exist !" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials ! Check password" });
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({message: "Login successful", user: { name: user.name, email: user.email, cartData: user.cartData }});
    }catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: `Login error ${error}` });
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: `Logout error ${error}` });
    }
}

export const googleLogin = async (req, res) => {
    try {
        let { name, email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user =  await User.create({
                name,
                email,
            });
        }
        
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user);

    } catch (error) {
        console.error("Error in googleLogin:", error);
        return res.status(500).json({ message: `Google login error ${error}` });
    }
}


export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = await genTokenAdmin(email);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            return res.status(200).json(token);
        }

        return res.status(400).json({ message: "Invalid credentials for admin login" });
    } catch (error) {
        console.log("Admin Login error ", error);
        return res.status(500).json({ message: `Admin login error ${error}` });
    }
}