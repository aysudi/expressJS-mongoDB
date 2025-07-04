import mongoose from "mongoose";
import sliderSchema from "../schemas/sliderSchema.js";
const SliderModel = mongoose.model("Slider", sliderSchema);
export default SliderModel;
