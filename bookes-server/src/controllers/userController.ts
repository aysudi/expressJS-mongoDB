import { NextFunction, Request, Response } from "express";
import formatMongoData from "../utils/formatMongoData.js";
import {
  deleteOne,
  getAll,
  getByEmail,
  getOne,
  register,
  update,
} from "../services/userService.js";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../utils/mailService.js";
import dotenv from "dotenv";
dotenv.config();

// get all users
export const getUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAll();

    const formattedUsers = users.map((user) => {
      const userObj = user.toObject() as any;

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
  } catch (error) {
    next(error);
  }
};

// get one user
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await getOne(id);

    if (!user) throw new Error("User is not found");

    const userObj = user.toObject() as any;
    const formattedWishlist = formatMongoData(userObj.wishlist);
    const formattedUser = {
      ...formatMongoData(userObj),
      wishlist: formattedWishlist,
    };

    res.status(200).json({
      message: "User retrieved successfully!",
      data: formatMongoData(formattedUser),
    });
  } catch (error) {
    next(error);
  }
};

// get user by email
export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    next(error);
  }
};

// register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const saltRounds = 10;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await register({
      ...req.body,
      password: hashedPassword,
    });

    if (!response.success) throw new Error(response.message);

    //send email service
    const token = "test";
    const verificationLink = `${process.env.SERVER_URL}/auth/verify-email?token=${token}`;
    sendVerificationEmail(req.body.email, req.body.fullName, verificationLink);

    res.status(201).json({
      message: "User register successfully",
      data: formatMongoData(response.data),
    });
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteOne(id);
    if (!deletedUser) throw new Error("User is not found");

    res.status(200).json({
      message: "User deleted successfully",
      data: formatMongoData(deletedUser),
    });
  } catch (error) {
    next(error);
  }
};

// uppdate author
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedUser = { ...req.body };
    const updateUserResponse = await update(id, updatedUser);

    res.status(200).json({
      message: "User updated successfully",
      data: formatMongoData(updateUserResponse),
    });
  } catch (error) {
    next(error);
  }
};
