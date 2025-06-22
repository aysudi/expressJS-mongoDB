import AuthorModel from "../models/authorModel.js";

export const getAll = async () => await AuthorModel.find().populate("books");

export const getOne = async (id: string) =>
  await AuthorModel.findById(id).populate("books");

export const update = async (id: string, payload: any) =>
  await AuthorModel.findByIdAndUpdate(id, payload, { new: true }).populate(
    "books"
  );

export const post = async (payload: any) => await AuthorModel.create(payload);

export const deleteOne = async (id: string) =>
  await AuthorModel.findByIdAndDelete(id);
