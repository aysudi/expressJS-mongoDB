import express, { NextFunction, Request, Response } from "express";
import {
  deleteSlider,
  getSliderById,
  getSliders,
  postSlider,
  updateSlider,
} from "../controllers/sliderController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import FileError from "../types/enums.js";
import sliderValidate from "../middlewares/sliderValidation.js";

const sliderRouter = express.Router();
const upload = uploadMiddleware("sliderImages");

sliderRouter.get("/", getSliders);
sliderRouter.get("/:id", getSliderById);
sliderRouter.post(
  "/",
  sliderValidate,
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("url")(req, res, (err) => {
      if (err) {
        if (err.code === FileError.FileSize) {
          return res
            .status(400)
            .json({ message: "File size exceeds 5 MB limit" });
        }
        if (err.code === FileError.FileType) {
          return res.status(400).json({ message: "Invalid file format" });
        }
        return res.status(400).json({ message: err.message });
      }
      postSlider(req, res, next);
    });
  }
);
sliderRouter.patch(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    upload.single("url")(req, res, function (err) {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File size exceeds 5MB limit" });
        }
        if (err.code === "INVALID_FILE_TYPE") {
          return res.status(400).json({ message: "Invalid file format" });
        }
        return res.status(400).json({ message: err.message });
      }
      updateSlider(req, res, next);
    });
  }
);
sliderRouter.delete("/:id", deleteSlider);

export default sliderRouter;
