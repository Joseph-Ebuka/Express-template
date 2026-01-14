import { createApp } from "./app";
import config from "./config";

async function startServer() {
  try {
    const app = createApp();

    const server = app.listen(config.port, () => {
      console.log(
        `Server is running on port ${config.port} in ${config.env} mode`,
      );
    });

    const gracefulShutdown = (signal: string) => {
      console.log(`${signal} received. Starting graceful shutdown...`);
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
