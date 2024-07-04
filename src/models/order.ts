import mongoose, { Schema, Document } from "mongoose";

interface IOrderProduct {
  productId: string;
  size: "small" | "medium" | "large";
  quantity: number;
}

export interface IOrder extends Document {
  products: IOrderProduct[];
  user: string;
  date: Date;
  state: "placed" | "in progress" | "on your way" | "delivered";
  milkAmount: number;
  promotionCode: string | null;
}

const OrderProductSchema: Schema = new Schema({
  productId: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  products: { type: [OrderProductSchema], required: true },
  user: { type: String, required: true },
  date: { type: Date, required: true },
  state: { type: String, required: true },
  milkAmount: { type: Number, required: true },
  promotionCode: { type: String, default: null },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
