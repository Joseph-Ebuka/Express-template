# Express + MongoDB + TypeScript Starter

A robust, production-ready starter template for building RESTful APIs with Node.js, Express, MongoDB, and TypeScript.

## 🚀 Features

- **TypeScript**: Full type safety and modern tooling.
- **Express**: Fast, unopinionated, minimalist web framework.
- **MongoDB + Mongoose**: Object modeling for your database.
- **Redis**: In-memory data store for caching/queues (via `ioredis`).
- **Authentication**: JWT-based authentication with secure cookie/header support.
- **Validation**: Request validation using `zod`.
- **Security**:
  - `helmet` for setting secure HTTP headers.
  - `cors` for Cross-Origin Resource Sharing.
  - `express-rate-limit` to prevent brute-force attacks.
  - Custom Request Sanitization to prevent NoSQL injection.
- **Logging**: Structured logging with `winston` and request logging with `morgan`.
- **Error Handling**: Centralized error handling mechanism.
- **Architecture**: Clean Service-Controller-Route architecture.

## 📁 Project Structure

```
src/
├── config/         # Environment variables and configuration setup
├── controllers/    # Route logic (req/res handling)
├── middleware/     # Custom Express middlewares (Auth, Validation, Error, etc.)
├── models/         # Mongoose Data Models
├── routes/         # API Route definitions
├── services/       # Business logic layer (database interactions)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (AppError, etc.)
├── app.ts          # Express App setup (middleware registration)
└── server.ts       # Server entry point
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [MongoDB](https://www.mongodb.com/) (running locally or a remote URI)
- [Redis](https://redis.io/) (running locally or a remote host)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Copy the example environment file and configure it.
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your specific configuration (MongoDB URI, JWT Secret, etc.).

### Running the Application

-   **Development Mode** (with hot-reload):
    ```bash
    npm run dev
    ```

-   **Production Build:**
    ```bash
    npm run build
    npm start
    ```

## 📚 API Endpoints

The API routes are prefixed with `/api/v1`.

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Users
- `GET /api/v1/users/me` - Get current user profile (Protected)
- `GET /api/v1/users` - List all users (Protected)

*(Check `src/routes` for the full list of available endpoints)*

## 🛡️ Security & Best Practices

This template follows standard security practices:
- **Sanitization**: All incoming requests (`body`, `params`, `query`) are sanitized to prevent MongoDB operator injection.
- **Rate Limiting**: Limits repeated requests from the same IP.
- **Headers**: Uses Helmet to set secure HTTP headers.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open source and available under the [ISC License](LICENSE).
