import { NextFunction, Request, Response } from "express";
import sliderValidationSchema from "../validations/slider.validation.js";

const sliderValidate = (req: Request, _: Response, next: NextFunction) => {
  const { error } = sliderValidationSchema.validate(req.body);
  if (error) {
    const { details } = error;
    if (details.length > 0) throw new Error(details[0].message);
  } else next();
};

export default sliderValidate;
