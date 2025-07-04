import BookModel from "../models/booksModel.js";
import { FilterQuery, SortOrder } from "mongoose";
import { BookDocument } from "../types/bookType.js";

export const getAll = async (
  page: number,
  limit: number,
  sortBy: string,
  order: SortOrder,
  filter: FilterQuery<BookDocument>
) => {
  return await BookModel.find(filter)
    .sort({ [sortBy]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author")
    .populate("vendor", "fullName username")
    .lean();
};

export const getOne = async (id: string) =>
  await BookModel.findById(id)
    .populate("author")
    .populate("reviews")
    .populate("vendor", "fullName username");

export const update = async (id: string, payload: BookDocument) =>
  await BookModel.findByIdAndUpdate(id, payload, { new: true }).populate(
    "author"
  );

export const post = async (payload: BookDocument) =>
  await BookModel.create(payload);

export const deleteOne = async (id: string) =>
  await BookModel.findByIdAndDelete(id);
