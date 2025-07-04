import SliderModel from "../models/sliderModel.js";
export const getAll = async () => await SliderModel.find();
export const getOne = async (id) => await SliderModel.findById(id);
export const update = async (id, payload) => await SliderModel.findByIdAndUpdate(id, payload, { new: true });
export const post = async (payload) => await SliderModel.create(payload);
export const deleteOne = async (id) => await SliderModel.findByIdAndDelete(id);
