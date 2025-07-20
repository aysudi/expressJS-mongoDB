import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    public_id: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default sliderSchema;
