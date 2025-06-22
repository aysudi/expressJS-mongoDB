import BookModel from "../models/booksModel.js";
export const getAll = async () => await BookModel.find().populate("author");
export const getOne = async (id) => await BookModel.findById(id).populate("author");
export const update = async (id, payload) => await BookModel.findByIdAndUpdate(id, payload, { new: true }).populate("author");
export const post = async (payload) => await BookModel.create(payload);
export const deleteOne = async (id) => await BookModel.findByIdAndDelete(id);
