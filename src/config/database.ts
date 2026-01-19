import mongoose from "mongoose";
import config from "./index";
import logger from "./logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    if (!config.mongoUri) {
      throw new Error("MONGO_URI must be defined in your .env file");
    }
    await mongoose.connect(config.mongoUri);
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed:", error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info("Database disconnected");
};
