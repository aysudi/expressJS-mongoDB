import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  logout,
  refresh,
  registerUser,
  unlockAccount,
  updateUser,
  verifyUserEmail,
} from "../controllers/userController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";

const userRouter = express.Router();
const upload = uploadMiddleware("userImages");

userRouter.get("/", getUsers);
userRouter.get("/verify-email", verifyUserEmail);
userRouter.get("/unlock-account", unlockAccount);
userRouter.post("/register", upload.single("profileImage"), registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh", refresh);
userRouter.post("/logout", logout);
userRouter.patch(
  "/:id",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateUser
);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);

export default userRouter;
