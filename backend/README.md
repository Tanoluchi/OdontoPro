# OdontoPro Backend

Backend API for OdontoPro dental management system built with Express, TypeScript, and Prisma.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma** - Database ORM
- **PostgreSQL** - Database

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Project Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend root directory:

```bash
# Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/odontopro?schema=public"

# Server configuration
PORT=3000
NODE_ENV=development
```

Replace `username`, `password`, and database name with your PostgreSQL credentials.

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 4. Build the Project

```bash
# Compile TypeScript to JavaScript
npm run build
```

### 5. Run the Application

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your `.env` file).

## Available Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "ts-node --esm src/server.ts",
    "build": "tsc",
    "start": "node dist/src/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  }
}
```

## API Endpoints

### Health Check
- **GET** `/health` - Check if the API is running
  ```bash
  curl http://localhost:3000/health
  ```

### API Info
- **GET** `/api` - Get API information
  ```bash
  curl http://localhost:3000/api
  ```

## Project Structure

```
backend/
├── src/
│   ├── app.ts                      # Express app configuration
│   ├── server.ts                   # Server entry point
│   ├── controllers/                # Business logic
│   │   └── user.controller.ts      # Example controller
│   ├── routes/                     # Route definitions
│   │   └── user.routes.ts          # Example routes
│   ├── middleware/                 # Custom middleware
│   │   └── validation.middleware.ts
│   ├── types/                      # TypeScript types
│   │   └── user.types.ts
│   └── MODULE_STRUCTURE.md         # Guide for adding modules
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Database migrations
├── dist/                           # Compiled JavaScript (generated)
├── .env                            # Environment variables (not in git)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Database Management

### View Database with Prisma Studio
```bash
npx prisma studio
```
This opens a GUI at `http://localhost:5555` to view and edit your database.

### Create a New Migration
```bash
npx prisma migrate dev --name your_migration_name
```

### Reset Database (⚠️ Deletes all data)
```bash
npx prisma migrate reset
```

## Development Workflow

1. **Make schema changes** in `prisma/schema.prisma`
2. **Create migration**: `npx prisma migrate dev --name description`
3. **Generate Prisma Client**: `npx prisma generate` (usually automatic)
4. **Update your code** to use the new schema
5. **Test your changes**

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the `PORT` in your `.env` file.

### Database Connection Issues
- Verify PostgreSQL is running
- Check your `DATABASE_URL` in `.env`
- Ensure the database exists: `createdb odontopro`

### TypeScript Errors
```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment (development/production) | development |

## Security Notes

- Never commit `.env` file to version control
- Use strong database passwords
- Enable CORS only for trusted origins in production
- Implement authentication/authorization for protected routes
- Validate and sanitize all user inputs

## License

ISC
