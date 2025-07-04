import express from "express";
import {
  deleteUser,
  getUsers,
  registerUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
// userRouter.get("/:id", getAuthorById);
userRouter.post("/", registerUser);
userRouter.delete("/:id", deleteUser);
// userRouter.patch("/:id", updateAuthor);

export default userRouter;
