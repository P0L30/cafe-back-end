import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/product-services";
import { IProduct } from "../../models/product";

const router = express.Router();

const productData: Partial<IProduct>[] = [
  {
    id: "1",
    imageUrl: "url1",
    name: "Product 1",
    price: { small: 10, medium: 15, large: 20 },
    description: "Description 1",
    category: "1",
    size: "medium",
  },
  {
    id: "2",
    imageUrl: "url2",
    name: "Product 2",
    price: { small: 8, medium: 12, large: 18 },
    description: "Description 2",
    category: "2",
    size: "large",
  },
  {
    id: "3",
    imageUrl: "url3",
    name: "Product 3",
    price: { small: 12, medium: 16, large: 24 },
    description: "Description 3",
    category: "3",
    size: "small",
  },
];

router.get("/product", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.post("/productAdd", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.put("/productUpdate/:id", async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.delete("/productDelete/:id", async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
