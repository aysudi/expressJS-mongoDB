import BookModel from "../models/booksModel";
import OrderModel from "../models/orderModel";

export const getAll = async () =>
  await OrderModel.find().populate("books").populate("user", "email");

export const getOne = async (id: string) =>
  await OrderModel.findById(id).populate("books").populate("user", "email");

export const getCustomerOrder = async (userId: string) => {
  const userOrders = await OrderModel.find({ user: userId }).populate("books");

  return userOrders;
};

export const getVendorOrders = async (vendorId: string) => {
  const vendorBooks = await BookModel.find({ vendor: vendorId }).select("_id");
  const vendorBookIds = vendorBooks.map((book) => book._id);

  const vendorOrders = await OrderModel.find({
    "books.book": { $in: vendorBookIds },
  })
    .populate("user", "fullName email")
    .populate("books.book", "name price")
    .sort({ createdAt: -1 });

  return vendorOrders;
};

export const update = async (
  orderId: string,
  payload: any,
  vendorId: string
) => {
  try {
    const { bookId, status } = payload;

    const book = await BookModel.findOne({
      _id: bookId,
      vendor: vendorId,
    });
    if (!book) throw new Error("Book does not belong to this vendor");

    const order = await OrderModel.findByIdAndUpdate(
      {
        _id: orderId,
        "books.book": bookId,
      },
      {
        $set: { "books.$.status": status },
      },
      { new: true }
    )
      .populate("user", "fullName email")
      .populate("books.book", "name")
      .lean();

    if (!order) throw new Error("Order or book not found");

    return order;
  } catch (error: any) {
    console.error("Update failed: ", error.message);
  }
};

export const post = async (payload: any) => await OrderModel.create(payload);

export const deleteOne = async (id: string) =>
  await OrderModel.findByIdAndDelete(id);
