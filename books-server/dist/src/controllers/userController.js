import formatMongoData from "../utils/formatMongoData.js";
import { deleteOne, getAll, getByEmail, getOne, login, register, unlockAcc, update, verifyEmail, } from "../services/userService.js";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../utils/mailService.js";
import config from "../config/config.js";
import { v2 as cloudinary } from "cloudinary";
import { generateAccessToken, getSecretKey, } from "../utils/generateJWT.js";
import jwt from "jsonwebtoken";
// get all users
export const getUsers = async (_, res, next) => {
    try {
        const users = await getAll();
        const formattedUsers = users.map((user) => {
            const userObj = user.toObject();
            const formattedWishlist = formatMongoData(userObj.wishlist);
            return {
                ...formatMongoData(userObj),
                wishlist: formattedWishlist,
            };
        });
        res.status(200).json({
            message: "Users retrieved seccessfully!",
            data: formatMongoData(formattedUsers),
        });
    }
    catch (error) {
        next(error);
    }
};
// get one user
export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getOne(id);
        if (!user)
            throw new Error("User is not found");
        const userObj = user.toObject();
        const formattedWishlist = formatMongoData(userObj.wishlist);
        const formattedUser = {
            ...formatMongoData(userObj),
            wishlist: formattedWishlist,
        };
        res.status(200).json({
            message: "User retrieved successfully!",
            data: formatMongoData(formattedUser),
        });
    }
    catch (error) {
        next(error);
    }
};
// get user by email
export const getUserByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await getByEmail(email);
        if (!user) {
            return res.status(404).json({
                message: "No such user with given email",
                data: null,
            });
        }
        res.status(201).json({
            message: "User retrieved successfully!",
            data: formatMongoData(user),
        });
    }
    catch (error) {
        next(error);
    }
};
// register user
export const registerUser = async (req, res, next) => {
    try {
        const saltRounds = 10;
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (req.file && req.file.path) {
            req.body.profileImage = req.file.path;
            req.body.public_id = req.file.filename;
        }
        const response = await register({
            ...req.body,
            password: hashedPassword,
        });
        if (!response.success)
            throw new Error(response.message);
        //send email service
        const token = generateAccessToken({
            id: response.data.id,
            email: req.body.email,
            fullName: req.body.fullName,
        }, "6h");
        const verificationLink = `${config.SERVER_URL}/auth/verify-email?token=${token}`;
        sendVerificationEmail(response.data.email, response.data.fullName, verificationLink);
        res.status(201).json({
            message: "User register successfully",
            data: formatMongoData(response.data),
        });
    }
    catch (error) {
        next(error);
    }
};
// verify email
export const verifyUserEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        console.log("token: ", token);
        const response = await verifyEmail(token);
        res.redirect(`${config.CLIENT_URL}/auth/email-verified?message=${response?.message}`);
    }
    catch (error) {
        next(error);
    }
};
// unlock account
export const unlockAccount = async (req, res, next) => {
    try {
        const { token } = req.query;
        const response = await unlockAcc(token);
        res.redirect(`${config.CLIENT_URL}/auth/login?message=${response.message}`);
    }
    catch (error) {
        next(error);
    }
};
// login user
export const loginUser = async (req, res, next) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        const response = await login(credentials);
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "User successfully login",
            token: response.accessToken,
        });
    }
    catch (error) {
        res.json({
            message: error.message || "internal server error",
            statusCode: error.statusCode || 500,
        });
    }
};
// refresh token
export const refresh = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token)
            res.status(401).json({ message: "No token provided" });
        const refreshKey = getSecretKey(config.JWT_REFRESH_SECRET_KEY);
        jwt.verify(token, refreshKey, async (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Invalid or expired token" });
            const user = await getOne(decoded.id);
            if (!user)
                return res.status(403).json({ message: "Undefined user" });
            const accessToken = generateAccessToken({
                email: user.email,
                id: user._id,
                role: user.role,
                fullName: user.fullName,
            }, "6h");
            res.status(200).json({
                accessToken: accessToken,
            });
        });
    }
    catch (error) {
        next(error);
    }
};
// logout user
export const logout = async (_, res, next) => {
    try {
        res.clearCookie("refreshToken", { path: "/auth/refresh" });
        res.sendStatus(204).json({ message: "Logged out successfully!" });
    }
    catch (error) {
        next(error);
    }
};
// delete user
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteOne(id);
        if (!deletedUser)
            throw new Error("User is not found");
        res.status(200).json({
            message: "User deleted successfully",
            data: formatMongoData(deletedUser),
        });
    }
    catch (error) {
        next(error);
    }
};
// update user
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getOne(id);
        const files = req.files;
        const updatedFields = { ...req.body };
        if (files?.profileImage?.[0]?.path) {
            if (user?.public_id) {
                await cloudinary.uploader.destroy(user.public_id);
            }
            updatedFields.profileImage = files.profileImage[0].path;
            updatedFields.public_id = files.profileImage[0].filename;
        }
        const updateUserResponse = await update(id, updatedFields);
        res.status(200).json({
            message: "User updated successfully",
            data: formatMongoData(updateUserResponse),
        });
    }
    catch (error) {
        next(error);
    }
};
