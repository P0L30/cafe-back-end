import mongoose, { Schema, Document } from "mongoose";

interface IPaymentInfo {
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  paymentInfo: IPaymentInfo;
  favorites: string[];
}

const PaymentInfoSchema: Schema = new Schema({
  cardHolder: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
});

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  address: { type: String, required: true },
  paymentInfo: { type: PaymentInfoSchema, required: true },
  favorites: { type: [String], required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
