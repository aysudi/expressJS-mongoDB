import { generateAccessToken, generateRefreshToken, } from "./../utils/generateJWT.js";
import express from "express";
import passport from "passport";
import config from "../config/config.js";
const googleRouter = express.Router();
googleRouter.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
}));
googleRouter.get("/google/callback", passport.authenticate("google", {
    failureRedirect: `${config.CLIENT_URL}/auth/login?error=google_failed`,
    session: false,
}), (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User is not define");
        }
        const accessToken = generateAccessToken({
            id: user._id,
            role: user.role,
            email: user.email,
            fullName: user.fullName,
        }, "15m");
        const refreshToken = generateRefreshToken({
            id: user._id,
            role: user.role,
            email: user.email,
            fullName: user.fullName,
        }, "7d");
        //   res.status(200).json({
        //     message: "Login successfull",
        //     accessToken: accessToken,
        //     refreshToken: refreshToken,
        //   });
        res.redirect(`${config.CLIENT_URL}/auth/success/${accessToken}`);
    }
    catch (err) {
        res.redirect("/login?error=Something went wrong");
    }
});
export default googleRouter;
