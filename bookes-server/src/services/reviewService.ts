import ReviewModel from "../models/reviewModel";

export const getAll = async () =>
  await ReviewModel.find().populate("user").populate("book", "name author");

export const getTotalReviews = async () => await ReviewModel.countDocuments();

export const getOne = async (id: string) =>
  await ReviewModel.findById(id)
    .populate("book", "name author")
    .populate("user");

export const update = async (id: string, payload: any) =>
  await ReviewModel.findByIdAndUpdate(id, payload, { new: true });

export const post = async (payload: any) => await ReviewModel.create(payload);

export const deleteOne = async (id: string) =>
  await ReviewModel.findByIdAndDelete(id);
