import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} from "../utils/generateJWT.js";
import { sendUnlockAccountEmail } from "../utils/mailService.js";
import config from "../config/config.js";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 10 * 60 * 1000;

export const getAll = async () =>
  await UserModel.find().select("-password").populate("wishlist");

export const getOne = async (id: string) =>
  await UserModel.findById(id).select("-password").populate("wishlist");

export const getByEmail = async (email: string) =>
  await UserModel.find({ email: email }).select("-password");

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { email, password } = credentials;

  const user: any = await UserModel.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  if (!user.emailVerified) throw new Error("User should be verified first");

  if (user.isBanned) {
    if (!user.banUntil || new Date(user.banUntil) > new Date()) {
      throw new Error("You are banned from logging in.");
    } else {
      user.isBanned = false;
      user.banUntil = null;
      await user.save();
    }
  }

  if (user.lockUntil && user.lockUntil > new Date()) {
    const unlockTime = new Date(user.lockUntil).toLocaleString();
    throw new Error(`User is locked. Try again after ${unlockTime}`);
  }

  if (user.provider == "google") {
    throw new Error(
      "This account has been created with Google, please try sign in with Google"
    );
  } else if (user.provider == "github") {
    throw new Error(
      "This account has been created with GitHub, please try sign in with GitHub"
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    if (user.loginAttempts >= MAX_ATTEMPTS) {
      user.lockUntil = new Date(Date.now() + LOCK_TIME);
      await user.save();

      //send email
      const token = generateAccessToken(
        {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        "6h"
      );

      const unlockAccountLink = `${config.SERVER_URL}/auth/unlock-account?token=${token}`;
      sendUnlockAccountEmail(
        user.email,
        user.fullName,
        user.lockUntil,
        unlockAccountLink
      );

      throw new Error(
        "Too many login attempts. Account locked for 10 minutes. Check your email"
      );
    }

    await user.save();
    throw new Error("Invalid credentials");
  }

  user.loginAttempts = 0;
  user.isBanned = false;
  user.lastLogin = new Date();

  await user.save();

  const accessToken = generateAccessToken({
    email: user.email,
    id: user.id,
    role: user.role,
    fullName: user.fullName,
  });

  const refreshToken = generateRefreshToken({
    email: user.email,
    id: user.id,
    role: user.role,
    fullName: user.fullName,
  });

  return {
    message: "User login successfully!",
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

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

export const verifyEmail = async (token: any) => {
  const isValidToken: any = verifyAccessToken(token);
  console.log(isValidToken);

  if (isValidToken && isValidToken.id) {
    const { id } = isValidToken;
    const user: any = await UserModel.findById(id);

    if (user.emailVerified) {
      return {
        success: false,
        message: "email already has been verified",
      };
    } else {
      user.emailVerified = true;
      await user.save();
      return {
        success: true,
        message: "email has been verified successfully!",
      };
    }
  } else {
    throw new Error("Invalid or expired token");
  }
};

export const unlockAcc = async (token: any) => {
  const isValidToken: any = verifyAccessToken(token);

  if (isValidToken && isValidToken.id) {
    const { id } = isValidToken;
    const user: any = await UserModel.findById(id);

    if (user?.loginAttempts >= 3) {
      user.loginAttempts = 0;
      user.lockUntil = null;
      await user.save();

      return {
        message: "Account has been unlock manually successfully",
      };
    } else {
      return {
        message: "Account already has been unlocked",
      };
    }
  } else {
    throw new Error("Invalid or expired token");
  }
};

export const ban = async () => {};

export const unban = async () => {};

export const update = async (id: string, payload: any) =>
  await UserModel.findByIdAndUpdate(id, payload, { new: true });

export const deleteOne = async (id: string) =>
  await UserModel.findByIdAndDelete(id);
