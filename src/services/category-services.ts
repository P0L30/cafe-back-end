import Category, { ICategory } from "../models/category";

export const getAllCategories = async (): Promise<ICategory[]> => {
  return Category.find();
};

export const getCategoryById = async (
  id: string
): Promise<ICategory | null> => {
  return Category.findById(id);
};

export const createCategory = async (
  categoryData: ICategory
): Promise<ICategory> => {
  const category = new Category(categoryData);
  return category.save();
};

export const updateCategory = async (
  id: string,
  categoryData: Partial<ICategory>
): Promise<ICategory | null> => {
  return Category.findByIdAndUpdate(id, categoryData, { new: true });
};

export const deleteCategory = async (id: string): Promise<ICategory | null> => {
  return Category.findByIdAndDelete(id);
};
