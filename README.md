# Bikes Booking Backend

This is the backend for the Bikes Booking application, responsible for managing user authentication, bike data, and various backend functionalities.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

This will start the server using nodemon, allowing automatic restarts during development.

### Run in Production Mode

```bash
npm start
```

### Environment Variables

Create a .env file in the root directory and add the following:

- DB_HOST
- SECRET_KEY_MANGODB
- PORT
- SECRET_KEY

### Dependencies

- bcryptjs: ^2.4.3
- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- joi: ^17.11.0
- jsonwebtoken: ^9.0.2
- mongoose: ^8.0.3
- morgan: ^1.10.0
- nanoid: ^3.3.7
- nodemon (dev): ^3.0.2
