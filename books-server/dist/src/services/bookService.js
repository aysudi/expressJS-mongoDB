import BookModel from "../models/booksModel.js";
export const getAll = async (page, limit, sortBy, order, filter) => {
    return await BookModel.find(filter)
        .sort({ [sortBy]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("author")
        .populate("vendor", "fullName username")
        .lean();
};
export const getOne = async (id) => await BookModel.findById(id)
    .populate("author")
    .populate("reviews")
    .populate("vendor", "fullName username");
export const update = async (id, payload) => await BookModel.findByIdAndUpdate(id, payload, { new: true }).populate("author");
export const post = async (payload) => await BookModel.create(payload);
export const deleteOne = async (id) => await BookModel.findByIdAndDelete(id);
