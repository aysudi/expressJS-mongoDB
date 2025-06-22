import AuthorModel from "../models/authorModel.js";
export const getAll = async () => await AuthorModel.find().populate("books");
export const getOne = async (id) => await AuthorModel.findById(id).populate("books");
export const update = async (id, payload) => await AuthorModel.findByIdAndUpdate(id, payload, { new: true }).populate("books");
export const post = async (payload) => await AuthorModel.create(payload);
export const deleteOne = async (id) => await AuthorModel.findByIdAndDelete(id);
