import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `../../.env`),
});

interface Config {
  env: string;
  port: number;
  mongoUri: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  cors: {
    origin: string[];
    credentials: boolean;
  };
}

const config: Config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  mongoUri: process.env.MONGO_URI || "",
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (() => {
        // In development we might want a fallback or just let it crash if not set?
        // The provided code throws if not set.
        throw new Error("JWT_SECRET is required");
      })(),
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
    credentials: true,
  },
};

export default config;
