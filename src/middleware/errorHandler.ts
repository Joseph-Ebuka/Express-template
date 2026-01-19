import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import logger from "../config/logger";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let error = err;

  if (!(error instanceof AppError)) {
    const originalStack = error.stack;
    error = new AppError(
      err.message || "Internal server error",
      500,
      undefined,
      false,
    );
    error.stack = originalStack;
  }

  const appError = error as AppError;

  // Create a clean object for logging meta data, separating it from the message
  logger.error(appError.message, {
    statusCode: appError.statusCode,
    stack: appError.stack,
    url: req.url,
    method: req.method,
  });

  res.status(appError.statusCode).json({
    status: "error",
    message: appError.message,
    ...(appError.details && { details: appError.details }),
    ...(process.env.NODE_ENV === "development" && {
      stack: appError.stack,
    }),
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};
