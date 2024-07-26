import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/user-services";
import { IUser } from "../../models/user";

const router = express.Router();

const userData: Partial<IUser>[] = [
  {
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "password1",
    avatar: "avatar1.jpg",
    address: "123 Street, City",
    paymentInfo: {
      cardHolder: "John Doe",
      cardNumber: "1234567890123456",
      expirationDate: "12/25",
      cvv: "123",
    },
  },
  {
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password2",
    avatar: "avatar2.jpg",
    address: "456 Avenue, Town",
    paymentInfo: {
      cardHolder: "Jane Smith",
      cardNumber: "9876543210987654",
      expirationDate: "06/27",
      cvv: "456",
    },
  },
  {
    fullName: "Sam Johnson",
    email: "sam.johnson@example.com",
    password: "password3",
    avatar: "avatar3.jpg",
    address: "789 Road, Village",
    paymentInfo: {
      cardHolder: "Sam Johnson",
      cardNumber: "5678901234567890",
      expirationDate: "09/30",
      cvv: "789",
    },
  },
];

router.get("/user", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.post("/userAdd", async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.put("/userUpdate/:id", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.delete("/userDelete/:id", async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
