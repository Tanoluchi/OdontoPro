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

### Option 1: Docker (Recommended)
- Docker
- Docker Compose
- Make (optional, for simplified commands)

### Option 2: Local Development
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Project Setup

### Option A: Docker Setup (Recommended)

The easiest way to get started is using Docker, which handles all dependencies and database setup automatically.

#### 1. Environment Configuration

Create a `.env` file in the backend root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your preferred values:

```bash
# PostgreSQL Configuration
POSTGRES_USER=odontopro
POSTGRES_PASSWORD=odontopro_password
POSTGRES_DB=odontopro

# Database Configuration
DATABASE_URL="postgresql://odontopro:odontopro_password@localhost:5432/odontopro"

# Server Configuration
PORT=3000
NODE_ENV=development
```

#### 2. Start with Docker Compose

**Using Make (recommended):**
```bash
# Build and start all services
make dev

# Or step by step
make build    # Build Docker images
make up       # Start containers
make logs     # View logs
```

**Using Docker Compose directly:**
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

The backend API will be available at `http://localhost:3000` and PostgreSQL at `localhost:5432`.

#### 3. Run Database Migrations

```bash
# Using Make
make migrate-deploy

# Using Docker Compose
docker-compose exec backend npx prisma migrate deploy
```

#### 4. Available Make Commands

```bash
make help              # Show all available commands
make build             # Build Docker images
make up                # Start containers
make down              # Stop containers
make restart           # Restart containers
make logs              # View all logs
make logs-backend      # View backend logs only
make logs-db           # View database logs only
make shell-backend     # Open shell in backend container
make shell-db          # Open PostgreSQL CLI
make migrate           # Run migrations (dev mode)
make migrate-create    # Create new migration
make migrate-deploy    # Deploy migrations
make prisma-studio     # Open Prisma Studio
make prisma-generate   # Generate Prisma Client
make clean             # Stop and remove volumes (⚠️ deletes data)
make dev               # Build, start, and follow logs
```

#### 5. Access Services

- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **Prisma Studio**: Run `make prisma-studio` then visit http://localhost:5555
- **PostgreSQL**: `localhost:5432` (use credentials from `.env`)

#### 6. Stop Services

```bash
# Using Make
make down

# Using Docker Compose
docker-compose down

# Stop and remove all data (⚠️ Warning: deletes database)
make clean
```

---

### Option B: Local Development Setup

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

## Generate Prisma Schema & Migration

To generate Prisma schemas and create a new migration, run:

```bash
npm run generate:schema
```

This command will:
- Generate the latest Prisma schema files.
- Create a new migration in the `prisma/migrations` directory.

After running this, you can apply the migration with:

```bash
npx prisma migrate dev --name <migration_name>
```

Replace `<migration_name>` with a descriptive name for your migration.

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

### Docker Issues

#### Port Already in Use
If ports 3000 or 5432 are already in use:
1. Change the port mapping in `docker-compose.yml`
2. Update the `PORT` in your `.env` file

#### Container Won't Start
```bash
# Check container logs
make logs

# Rebuild containers
make down
make build
make up
```

#### Database Connection Issues (Docker)
```bash
# Check if database is healthy
docker-compose ps

# View database logs
make logs-db

# Restart database
docker-compose restart db
```

#### Reset Everything (Docker)
```bash
# Stop and remove all containers and volumes
make clean

# Rebuild from scratch
make build
make up
```

### Local Development Issues

#### Port Already in Use
If port 3000 is already in use, change the `PORT` in your `.env` file.

#### Database Connection Issues
- Verify PostgreSQL is running
- Check your `DATABASE_URL` in `.env`
- Ensure the database exists: `createdb odontopro`

#### TypeScript Errors
```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

#### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | odontopro |
| `POSTGRES_PASSWORD` | PostgreSQL password | odontopro_password |
| `POSTGRES_DB` | PostgreSQL database name | odontopro |
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
