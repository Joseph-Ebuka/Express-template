import { User, IUser } from '../models/User';
import { AppError } from '../utils/errors';
import bcrypt from 'bcrypt';

interface PaginationOptions {
  page: number;
  limit: number;
  sortBy: string;
  order: 'asc' | 'desc';
}

interface PaginatedResult {
  users: IUser[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const getAllUsers = async (
  options: PaginationOptions
): Promise<PaginatedResult> => {
  const { page, limit, sortBy, order } = options;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .select('-password')
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments()
  ]);

  return {
    users,
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  };
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id).select('-password');
  return user;
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }

  const user = await User.create(userData);
  user.password = undefined;

  return user;
};

export const updateUser = async (
  id: string,
  updates: Partial<IUser>
): Promise<IUser | null> => {
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 12);
  }

  const user = await User.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  ).select('-password');

  return user;
};

export const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }
};
