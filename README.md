# Copies Backend

Backend application built with Node.js, TypeScript, and Clean Architecture principles.

## Features

- Clean Architecture implementation
- TypeORM for database operations
- Express.js for API routes
- Winston for logging with request tracking
- Cron jobs support
- Docker support

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Docker (optional)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/copies-backend.git
cd copies-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=copies_db
```

4. Start the application:

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Docker

To run the application using Docker:

1. Build the image:

```bash
docker build -t copies-backend .
```

2. Run the container:

```bash
docker run -p 3000:3000 copies-backend
```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get user by ID

## Logging

The application uses Winston for logging with request tracking. Each request is assigned a unique `requestId` that is passed through the entire request lifecycle.

## Cron Jobs

The application includes a cleanup job that runs daily at midnight. You can add more jobs in the `src/jobs` directory.

## License

MIT
