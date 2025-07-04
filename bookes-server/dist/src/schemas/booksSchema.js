import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    coverImagePublicId: {
        type: String,
        required: true,
    },
    bookPDF: {
        type: String,
        required: true,
    },
    bookPDFPublicId: {
        type: String,
        required: true,
    },
    ratings: {
        type: [Number],
        default: [],
        validate: {
            validator: function (value) {
                return value.every((rating) => rating >= 1 && rating <= 5);
            },
            message: "Ratings must be between 1 and 5",
        },
    },
    comments: {
        type: [
            {
                text: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    required: true,
                },
            },
        ],
        default: [],
    },
    reviewCount: { type: Number, default: 0 },
    stockQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    sold: {
        type: Number,
        default: 0,
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    digital: {
        type: Boolean,
        required: true,
        default: false,
    },
    requiresLogin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, { timestamps: true });
bookSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "book",
    justOne: false,
});
bookSchema.set("toObject", { virtuals: true });
bookSchema.set("toJSON", { virtuals: true });
export default bookSchema;
