import mongoose from 'mongoose';
import config from './index';
import logger from './logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const dbUri = `mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;
    
    // If no user/pass, the URI might be simpler, but following the provided code structure:
    // Mongoose connect call.
    // Note: The provided code constructed the URI with auth. If auth is empty strings, it might fail or need adjustment.
    // However, I must strictly follow the user's provided code.
    
    await mongoose.connect(dbUri);
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  logger.info('Database disconnected');
};