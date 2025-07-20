import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

authorSchema.set("toObject", { virtuals: true });
authorSchema.set("toJSON", { virtuals: true });

export default authorSchema;
