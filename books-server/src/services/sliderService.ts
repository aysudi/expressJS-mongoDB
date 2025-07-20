import SliderModel from "../models/sliderModel.js";
import Slider from "../types/sliderType.js";

export const getAll = async () => await SliderModel.find();

export const getOne = async (id: string) => await SliderModel.findById(id);

export const update = async (id: string, payload: Slider) =>
  await SliderModel.findByIdAndUpdate(id, payload, { new: true });

export const post = async (payload: any) => await SliderModel.create(payload);

export const deleteOne = async (id: any) =>
  await SliderModel.findByIdAndDelete(id);
