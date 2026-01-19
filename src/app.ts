import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import config from "./config";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { timeStamp } from "console";
import { uptime } from "process";

export function createApp(): Application {
  const app: Application = express();

  // Middlewares
  app.use(helmet());
  // app.use(cors(config.cors));
  app.use(compression());
  app.use(mongoSanitize());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  if (config.env === "development") {
    app.use(morgan("dev"));
  }

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  app.use("/api", limiter);

  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      timeStamp: new Date().toISOString(),
      uptime: process.uptime(),
      message: "Server is up and running",
    });
  });

  // Routes will be added here
  // app.use('/api/v1', routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
