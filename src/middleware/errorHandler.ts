import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let error = err;
  if (!(error instanceof AppError)) {
    error = new AppError("Internal Server Error", 500);
  }

  const appError = error as AppError;
  res.status(appError.statusCode).json({
    status: "error",
    message: appError.message,
    ...(appError.details && { details: appError.details }),
    ...(process.env.NODE_ENV === "development" && { stack: appError.stack }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new AppError("Not Found", 404);
  next(error);
};

export const unauthorizedHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new AppError("Unauthorized", 401);
  next(error);
};

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};
