import BookModel from "../models/booksModel.js";

export const getAll = async () => await BookModel.find().populate("author");

export const getOne = async (id: string) =>
  await BookModel.findById(id).populate("author");

export const update = async (id: string, payload: any) =>
  await BookModel.findByIdAndUpdate(id, payload, { new: true }).populate(
    "author"
  );

export const post = async (payload: any) => await BookModel.create(payload);

export const deleteOne = async (id: string) =>
  await BookModel.findByIdAndDelete(id);
