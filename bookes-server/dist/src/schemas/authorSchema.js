import mongoose from "mongoose";
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
}, { timestamps: true });
export default authorSchema;
