import mongoose from "mongoose";
import orderSchema from "../schemas/orderSchema";
const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
