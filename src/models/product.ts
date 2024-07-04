import mongoose, { Schema, Document } from "mongoose";

interface IProductPrice {
  small: number;
  medium: number;
  large: number;
}

export interface IProduct extends Document {
  imageUrl: string;
  name: string;
  price: IProductPrice;
  description: string;
  category: string;
  size: "small" | "medium" | "large";
}

const ProductPriceSchema: Schema = new Schema({
  small: { type: Number, required: true },
  medium: { type: Number, required: true },
  large: { type: Number, required: true },
});

const ProductSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: ProductPriceSchema, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: String, required: true },
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
