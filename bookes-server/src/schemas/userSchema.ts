import mongoose from "mongoose";
import basketItemSchema from "./basketSchema.js";
import addressSchema from "./addressSchema.js";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    profileImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    },
    public_id: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },

    isBanned: { type: Boolean, default: false },
    banUntil: { type: Date, default: null },

    lastLogin: { type: Date, default: null },

    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] },
    ],
    basket: [basketItemSchema],
    address: addressSchema,

    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default userSchema;
