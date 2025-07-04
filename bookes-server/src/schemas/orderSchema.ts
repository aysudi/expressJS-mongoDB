import mongoose from "mongoose";
import addressSchema from "./addressSchema";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        status: {
          type: String,
          enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: addressSchema,
  },
  { timestamps: true }
);

export default orderSchema;
