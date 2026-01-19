import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { AppError } from '../utils/errors';

// Validation middleware for request body
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = (error as any).errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return next(new AppError('Validation failed', 400, errors));
      }
      next(error);
    }
  };
};

// Validation middleware for query parameters
export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.query);
      // Clear and update req.query instead of replacing it
      for (const key in req.query) {
        delete (req.query as any)[key];
      }
      Object.assign(req.query, validated);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = (error as any).errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return next(new AppError('Query validation failed', 400, errors));
      }
      next(error);
    }
  };
};

// Validation middleware for route parameters
export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.params);
      // Clear and update req.params instead of replacing it
      for (const key in req.params) {
        delete (req.params as any)[key];
      }
      Object.assign(req.params, validated);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = (error as any).errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message
        }));
        return next(new AppError('Parameter validation failed', 400, errors));
      }
      next(error);
    }
  };
};
