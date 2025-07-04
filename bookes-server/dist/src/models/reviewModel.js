import mongoose from "mongoose";
import reviewSchema from "../schemas/reviewSchema";
const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
