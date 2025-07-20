import mongoose from "mongoose";
import basketItemSchema from "./basketSchema.js";
import addressSchema from "./addressSchema.js";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === "local";
        },
    },
    fullName: { type: String, required: true },
    profileImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
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
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    wishlist: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Book", default: [] },
    ],
    basket: [basketItemSchema],
    address: addressSchema,
    provider: {
        type: String,
        enum: ["local", "google", "github"],
        default: "local",
    },
    providerId: { type: String, default: null },
    hasVendorRequest: { type: Boolean, default: false },
    emailVerified: {
        type: Boolean,
        default: function () {
            return this.provider !== "local";
        },
    },
}, { timestamps: true, versionKey: false });
userSchema.virtual("orders", {
    ref: "Order",
    localField: "id",
    foreignField: "user",
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
export default userSchema;
