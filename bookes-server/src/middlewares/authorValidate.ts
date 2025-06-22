import { NextFunction, Request, Response } from "express";
import authorValidationSchema from "../validations/author.validation.js";

const authorValidate = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  const { error } = authorValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    throw new Error(errorMessage);
  } else {
    next();
  }
};

export default authorValidate;
