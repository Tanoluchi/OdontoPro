.PHONY: help build up down restart logs logs-backend logs-db shell-backend shell-db clean prune migrate migrate-create migrate-deploy prisma-studio prisma-generate dev

# Default target
help:
	@echo "Available commands:"
	@echo "  make build           - Build Docker images"
	@echo "  make up              - Start all containers"
	@echo "  make down            - Stop all containers"
	@echo "  make restart         - Restart all containers"
	@echo "  make logs            - View logs from all containers"
	@echo "  make logs-backend    - View backend logs"
	@echo "  make logs-db         - View database logs"
	@echo "  make shell-backend   - Open shell in backend container"
	@echo "  make shell-db        - Open PostgreSQL shell"
	@echo "  make clean           - Stop containers and remove volumes"
	@echo "  make prune           - Remove all unused Docker resources"
	@echo "  make migrate         - Run Prisma migrations in dev mode"
	@echo "  make migrate-create  - Create a new Prisma migration"
	@echo "  make migrate-deploy  - Deploy Prisma migrations"
	@echo "  make prisma-studio   - Open Prisma Studio"
	@echo "  make prisma-generate - Generate Prisma Client"
	@echo "  make dev             - Start development environment"

# Build Docker images
build:
	docker-compose build

# Start containers
up:
	docker-compose up -d

# Stop containers
down:
	docker-compose down

# Restart containers
restart:
	docker-compose restart

# View all logs
logs:
	docker-compose logs -f

# View backend logs
logs-backend:
	docker-compose logs -f backend

# View database logs
logs-db:
	docker-compose logs -f db

# Open shell in backend container
shell-backend:
	docker-compose exec backend sh

# Open PostgreSQL shell
shell-db:
	docker-compose exec db psql -U $${POSTGRES_USER:-odontopro} -d $${POSTGRES_DB:-odontopro}

# Stop and remove volumes (WARNING: deletes database data)
clean:
	docker-compose down -v

# Remove all unused Docker resources
prune:
	docker system prune -af --volumes

# Run Prisma migrations in development
migrate:
	docker-compose exec backend npx prisma migrate dev

# Create a new Prisma migration
migrate-create:
	@read -p "Enter migration name: " name; \
	docker-compose exec backend npx prisma migrate dev --name $$name

# Deploy Prisma migrations
migrate-deploy:
	docker-compose exec backend npx prisma migrate deploy

# Open Prisma Studio
prisma-studio:
	docker-compose exec backend npx prisma studio

# Generate Prisma Client
prisma-generate:
	docker-compose exec backend npx prisma generate

# Start development environment (build + up + logs)
dev: build up logs
