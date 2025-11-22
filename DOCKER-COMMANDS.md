# Docker Commands Quick Reference

## Starting the Application

```powershell
# Build and start all services (first time or after code changes)
docker-compose up --build

# Start all services (using existing images)
docker-compose up

# Start in detached mode (background)
docker-compose up -d
```

## Stopping the Application

```powershell
# Stop all services (Ctrl+C if running in foreground)

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (clean database)
docker-compose down -v

# Nuclear option: remove everything including images
docker-compose down -v --rmi all
```

## Viewing Logs

```powershell
# View logs from all services
docker-compose logs

# Follow logs (live updates)
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# View last 50 lines
docker-compose logs --tail=50
```

## Container Management

```powershell
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Restart a specific service
docker-compose restart backend

# Stop a specific service
docker-compose stop backend

# Start a specific service
docker-compose start backend

# Rebuild a specific service
docker-compose up -d --build backend
```

## Accessing Containers

```powershell
# Execute command in backend container
docker-compose exec backend sh
docker-compose exec backend npm run start:dev

# Execute command in frontend container
docker-compose exec frontend sh

# Access PostgreSQL database
docker-compose exec database psql -U postgres -d devfest_db

# Run SQL query directly
docker-compose exec database psql -U postgres -d devfest_db -c "SELECT * FROM hello_world;"
```

## Debugging

```powershell
# Check container resource usage
docker stats

# Inspect a container
docker inspect devfest-backend

# View container environment variables
docker-compose exec backend env

# Check if services are healthy
docker-compose ps

# View networks
docker network ls

# View volumes
docker volume ls
```

## Cleanup Commands

```powershell
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Clean everything (use with caution!)
docker system prune -a --volumes
```

## Building

```powershell
# Build all services
docker-compose build

# Build specific service
docker-compose build backend

# Build with no cache (force fresh build)
docker-compose build --no-cache

# Build and start
docker-compose up --build
```

## Testing Workflow

```powershell
# 1. Start fresh
docker-compose down -v

# 2. Build and start
docker-compose up --build

# 3. Check status
docker-compose ps

# 4. View logs
docker-compose logs -f

# 5. Test endpoints
# Frontend: http://localhost:3000
# Backend: http://localhost:3001/api/health
# Hello: http://localhost:3001/api/hello

# 6. Stop when done
docker-compose down
```

## Common Troubleshooting Commands

```powershell
# Port conflict - find process using port 3000
netstat -ano | findstr "3000"

# Kill process by PID
taskkill /F /PID <pid>

# Check if Docker is running
docker info

# View Docker disk usage
docker system df

# Verify network connectivity
docker-compose exec backend ping database

# Check database connectivity from backend
docker-compose exec backend sh
# Then: nc -zv database 5432
```

## Database-Specific Commands

```powershell
# Connect to database
docker-compose exec database psql -U postgres -d devfest_db

# Backup database
docker-compose exec database pg_dump -U postgres devfest_db > backup.sql

# Restore database
docker-compose exec -T database psql -U postgres -d devfest_db < backup.sql

# View database tables
docker-compose exec database psql -U postgres -d devfest_db -c "\dt"

# Query data
docker-compose exec database psql -U postgres -d devfest_db -c "SELECT * FROM hello_world;"

# Reset database (remove volume and restart)
docker-compose down -v
docker-compose up -d database
```

## Environment-Specific Commands

```powershell
# Development: Start with logs
docker-compose up --build

# Production-like: Start detached
docker-compose up -d --build

# Testing: Start, test, stop
docker-compose up -d --build && npm test && docker-compose down
```

## Useful Aliases (Add to PowerShell Profile)

```powershell
# Edit profile
notepad $PROFILE

# Add these aliases:
function dcu { docker-compose up --build }
function dcd { docker-compose down }
function dcdv { docker-compose down -v }
function dcl { docker-compose logs -f }
function dcp { docker-compose ps }
function dcr { docker-compose restart }
```

## Quick Health Check

```powershell
# One-liner to check all services
docker-compose ps && curl http://localhost:3001/api/health && curl http://localhost:3000
```

