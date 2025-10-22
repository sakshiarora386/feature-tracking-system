# Feature Tracking System

A RESTful API for tracking feature requests, built with Node.js, Express, and Prisma.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## Features

- Create, read, update, and delete feature requests
- Filter and sort feature requests by various criteria
- Pagination for listing feature requests
- API documentation with Swagger
- Input validation
- Error handling
- Rate limiting
- Security headers with Helmet.js

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - ORM for database access
- **SQLite** - Database (for simplicity in MVP)
- **Swagger** - API documentation
- **Express Validator** - Input validation
- **Helmet.js** - Security headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Prevent abuse

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
```

### Database Setup

1. Generate Prisma client:

```bash
npm run prisma:generate
```

2. Create and apply migrations:

```bash
npm run prisma:migrate
```

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. The server will be running at `http://localhost:3000`
3. Access the API documentation at `http://localhost:3000/api-docs`

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all endpoints, request/response schemas, and examples.

### API Endpoints

- `POST /api/v1/feature-requests` - Create a new feature request
- `GET /api/v1/feature-requests` - Get all feature requests (with filtering, sorting, and pagination)
- `GET /api/v1/feature-requests/:id` - Get a specific feature request by ID
- `PUT /api/v1/feature-requests/:id/status` - Update the status of a feature request
- `DELETE /api/v1/feature-requests/:id` - Delete a feature request

## Project Structure

```
feature-tracking-system/
├── prisma/                  # Prisma schema and migrations
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Express middlewares
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── index.js             # Application entry point
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation