import Order, { IOrder } from "../models/order";

export const getAllOrders = async (): Promise<IOrder[]> => {
  return Order.find();
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return Order.findById(id);
};

export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  const order = new Order(orderData);
  return order.save();
};

export const updateOrder = async (
  id: string,
  orderData: Partial<IOrder>
): Promise<IOrder | null> => {
  return Order.findByIdAndUpdate(id, orderData, { new: true });
};

export const deleteOrder = async (id: string): Promise<IOrder | null> => {
  return Order.findByIdAndDelete(id);
};
