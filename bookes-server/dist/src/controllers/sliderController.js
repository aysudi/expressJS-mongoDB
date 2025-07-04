import "../config/cloudConfig.js";
import dotenv from "dotenv";
import { deleteOne, getAll, getOne, post, update, } from "../services/sliderService.js";
import formatMongoData from "../utils/formatMongoData.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();
export const getSliders = async (_, res, next) => {
    try {
        const sliders = await getAll();
        res.status(201).json({
            message: "sliders retrieved successfully",
            data: formatMongoData(sliders),
        });
    }
    catch (error) {
        next(error);
    }
};
export const getSliderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const slider = await getOne(id);
        res.status(201).json({
            message: "slider retrieved successfully",
            data: formatMongoData(slider),
        });
    }
    catch (error) {
        next(error);
    }
};
export const postSlider = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const sliderData = {
            name: req.body.name,
            url: req.file.path,
            public_id: req.file.filename,
        };
        const createdSlider = await post(sliderData);
        res.status(201).json({
            message: "Slider created successfully!",
            data: formatMongoData(createdSlider),
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateSlider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingSlider = await getOne(id);
        if (!existingSlider) {
            return res.status(404).json({ message: "Slider not found" });
        }
        const updateSlider = { ...req.body };
        if (req.file) {
            if (existingSlider.public_id) {
                await cloudinary.uploader.destroy(existingSlider.public_id);
            }
            updateSlider.public_id = req.file.filename;
            updateSlider.url = req.file.path;
        }
        const updatedSliderResponse = await update(id, updateSlider);
        if (!updatedSliderResponse)
            throw new Error("Slider update failed!");
        res.status(200).json({
            message: "Slider updated successfully",
            data: updatedSliderResponse,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteSlider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const slider = await getOne(id);
        if (!slider) {
            res.status(404).json({ message: "Slider not found" });
            return;
        }
        const sliderWithPublicId = slider;
        if (sliderWithPublicId.public_id) {
            await cloudinary.uploader.destroy(sliderWithPublicId.public_id);
        }
        const deletedSlider = await deleteOne(id);
        if (!deletedSlider) {
            res.status(500).json({ message: "Error deleting slider from database" });
            return;
        }
        res.status(200).json({
            message: "Slider deleted successfully",
            data: deletedSlider,
        });
    }
    catch (error) {
        next(error);
    }
};
