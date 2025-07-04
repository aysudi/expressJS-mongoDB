import UserModel from "../models/userModel.js";
export const getAll = async () => await UserModel.find().select("-password").populate("wishlist");
export const getOne = async (id) => await UserModel.findById(id).select("-password").populate("wishlist");
export const getByEmail = async (email) => await UserModel.find({ email: email }).select("-password");
export const login = async () => { };
export const register = async (payload) => {
    try {
        const { email, username } = payload;
        const dublicateUser = await UserModel.findOne({
            $or: [{ email }, { username }],
        });
        if (dublicateUser) {
            return {
                success: false,
                message: "Username or email already exist",
            };
        }
        return {
            success: true,
            data: await UserModel.create(payload),
        };
    }
    catch (error) {
        return error.message || "Internal server error";
    }
};
export const ban = async () => { };
export const unban = async () => { };
export const update = async (id, payload) => await UserModel.findByIdAndUpdate(id, payload, { new: true }).populate("books");
export const deleteOne = async (id) => await UserModel.findByIdAndDelete(id);
