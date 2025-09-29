import user from "../models/user.js";
import { handleResponse } from "../utils/helper.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return handleResponse(res, 400, "username,email and password are required");
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return handleResponse(res, 409, "User with this email already exists");
        }

        else if (password.length < 8) {
            return handleResponse(res, 400, "Password must be at least 8 characters long");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new user({ username, email, password: hashedPassword });
        await newUser.save();

        return handleResponse(res, 201, "User created successfully", newUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        return handleResponse(res, 500, "Server Error", { error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return handleResponse(res, 400, "Email and password are required");
        }

        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return handleResponse(res, 404, "User not found");
        }

        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return handleResponse(res, 401, "Invalid password");
        }

        return handleResponse(res, 200, "Login successful", { token });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return handleResponse(res, 500, "Server Error", { error: error.message });
    }
};

export const me = async (req, res) => {
    try {
        const userId = req.user.id;

        const existingUser = await user.findById(userId).select('-password');
        if (!existingUser) {
            return handleResponse(res, 404, "User not found");
        }

        return handleResponse(res, 200, "User details fetched successfully", existingUser);
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        return handleResponse(res, 500, "Server Error", { error: error.message });
    }
};