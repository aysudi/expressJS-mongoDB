import ReviewModel from "../models/reviewModel";
export const getAll = async () => await ReviewModel.find().populate("user").populate("book", "name author");
export const getTotalReviews = async () => await ReviewModel.countDocuments();
export const getOne = async (id) => await ReviewModel.findById(id)
    .populate("book", "name author")
    .populate("user");
export const update = async (id, payload) => await ReviewModel.findByIdAndUpdate(id, payload, { new: true });
export const post = async (payload) => await ReviewModel.create(payload);
export const deleteOne = async (id) => await ReviewModel.findByIdAndDelete(id);
