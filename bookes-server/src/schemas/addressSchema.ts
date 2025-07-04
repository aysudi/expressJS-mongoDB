import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  region: String,
  country: String,
  postalCode: String,
});

export default addressSchema;
