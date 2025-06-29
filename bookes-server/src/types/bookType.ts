import { Document, Types } from "mongoose";

export interface Comment {
  text: string;
  date: Date;
}

export interface BookDocument extends Document {
  title: string;
  author: Types.ObjectId;
  price: number;
  category: string;
  downloadURL: string;
  ratings: number[];
  comments: Comment[];
  digital: boolean;
  requiresLogin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
