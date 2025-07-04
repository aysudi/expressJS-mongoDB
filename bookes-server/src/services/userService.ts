import UserModel from "../models/userModel.js";

export const getAll = async () =>
  await UserModel.find().select("-password").populate("wishlist");

export const getOne = async (id: string) =>
  await UserModel.findById(id).select("-password").populate("wishlist");

export const getByEmail = async (email: string) =>
  await UserModel.find({ email: email }).select("-password");

export const login = async () => {};

export const register = async (payload: any) => {
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
  } catch (error: any) {
    return error.message || "Internal server error";
  }
};

export const ban = async () => {};

export const unban = async () => {};

export const update = async (id: string, payload: any) =>
  await UserModel.findByIdAndUpdate(id, payload, { new: true }).populate(
    "books"
  );

export const deleteOne = async (id: string) =>
  await UserModel.findByIdAndDelete(id);
