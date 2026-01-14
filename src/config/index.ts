import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV || "development"}`,
  ),
});

interface Config {
  env: string;
  port: number;
  database: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
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
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    name: process.env.DB_NAME || "myapp",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  },
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (() => {
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
