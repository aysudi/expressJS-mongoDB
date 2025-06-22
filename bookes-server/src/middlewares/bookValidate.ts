import { NextFunction, Request, Response } from "express";
import bookValidationSchema from "../validations/book.validation.js";

const bookValidate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = bookValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    throw new Error(errorMessage);
  } else {
    next();
  }
};

export default bookValidate;
