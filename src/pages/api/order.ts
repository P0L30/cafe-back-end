import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../../services/order-services";
import { IOrder } from "../../models/order";
const router = express.Router();

const orderData: Partial<IOrder>[] = [
  {
    id: "1",
    products: [{ productId: "1", size: "medium", quantity: 2 }],
    user: "1",
    date: new Date(),
    state: "placed",
    milkAmount: 5,
    promotionCode: null,
  },
  {
    id: "2",
    products: [{ productId: "2", size: "large", quantity: 1 }],
    user: "2",
    date: new Date(),
    state: "in progress",
    milkAmount: 7,
    promotionCode: "PROMO123",
  },
  {
    id: "3",
    products: [{ productId: "3", size: "small", quantity: 3 }],
    user: "3",
    date: new Date(),
    state: "delivered",
    milkAmount: 3,
    promotionCode: null,
  },
];

router.get("/order", async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.post("/orderAdd", async (req, res) => {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.put("/orderUpdate/:id", async (req, res) => {
  try {
    const updatedOrder = await updateOrder(req.params.id, req.body);
    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.delete("/orderDelete/:id", async (req, res) => {
  try {
    const deletedOrder = await deleteOrder(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
