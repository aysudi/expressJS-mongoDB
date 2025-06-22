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
    downloadURL: {
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
export default bookSchema;
