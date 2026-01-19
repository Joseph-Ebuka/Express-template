import mongoose from "mongoose";
import logger from "./logger";
import config from "./index";

export const connectDatabase = async () => {
  try {
    const dbUri = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;
    await mongoose.connect(dbUri);
    logger.info("Database connected succesfully");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info("Database disconnected succesfully");
  } catch (error) {
    logger.error("Failed to disconnect from MongoDB", error);
    throw error;
  }
};
