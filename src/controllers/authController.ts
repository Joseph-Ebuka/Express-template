import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { catchAsync } from '../middleware/errorHandler';

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    const result = await authService.register({ name, email, password, role });

    res.status(201).json({
      status: 'success',
      data: {
        user: result.user,
        token: result.token
      }
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      status: 'success',
      data: {
        user: result.user,
        token: result.token
      }
    });
  }
);

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      data: req.user
    });
  }
);
