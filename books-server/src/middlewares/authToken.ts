import { NextFunction, Response } from "express";
import { getSecretKey } from "../utils/generateJWT.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) res.status(201).json({ message: "No token provided" });

  const accessToken = getSecretKey(config.JWT_ACCESS_SECRET_KEY);

  jwt.verify(token, accessToken, (err: any, user: any) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });

    req.user = user;
    next();
  });
};

export default verifyToken;
