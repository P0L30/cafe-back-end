import User, { IUser } from "../models/user";

export const getAllUsers = async (): Promise<IUser[]> => {
  return User.find();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};

export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return user.save();
};

export const updateUser = async (
  id: string,
  userData: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};
