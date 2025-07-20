import mongoose from "mongoose";

const basketItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: { type: Number, default: 1, min: 1 },
});

export default basketItemSchema;
