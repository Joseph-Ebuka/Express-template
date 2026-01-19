import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { catchAsync } from '../middleware/errorHandler';
import { AppError } from '../utils/errors';

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const order = (req.query.order as string) === 'asc' ? 'asc' : 'desc';

    const result = await userService.getAllUsers({
      page,
      limit,
      sortBy,
      order
    });

    res.status(200).json({
      status: 'success',
      data: result.users,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: result.pages
      }
    });
  }
);

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    const user = await userService.getUserById(id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  }
);

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const user = await userService.createUser(userData);

    res.status(201).json({
      status: 'success',
      data: user
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    const updates = req.body;

    const user = await userService.updateUser(id, updates);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };

    await userService.deleteUser(id);

    res.status(204).send();
  }
);
