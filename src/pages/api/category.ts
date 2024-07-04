import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/category-services";
import { ICategory } from "../../models/category";

const router = express.Router();

const categoryData: Partial<ICategory>[] = [
  { id: "1", name: "Soft Hot Coffees" },
  { id: "2", name: "Cold Coffees" },
  { id: "3", name: "Desserts" },
];

router.get("/category", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.post("/categoryAdd", async (req, res) => {
  try {
    const newCategory = await createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.put("/categoryUpdate/:id", async (req, res) => {
  try {
    const updatedCategory = await updateCategory(req.params.id, req.body);
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.json(updatedCategory);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

router.delete("/categoryDelete/:id", async (req, res) => {
  try {
    const deletedCategory = await deleteCategory(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;
