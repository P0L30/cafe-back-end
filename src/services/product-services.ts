import Product, { IProduct } from "../models/product";

export const getAllProducts = async (): Promise<IProduct[]> => {
  return Product.find();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return Product.findById(id);
};

export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  const product = new Product(productData);
  return product.save();
};

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  return Product.findByIdAndUpdate(id, productData, { new: true });
};

export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  return Product.findByIdAndDelete(id);
};
