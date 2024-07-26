import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import dbConnect from "../../utils/db-connects";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      fullName,
      email,
      password,
      avatar,
      address,
      paymentInfo,
      favorites,
    } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({
        fullName,
        email,
        password,
        avatar,
        address,
        paymentInfo,
        favorites,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
