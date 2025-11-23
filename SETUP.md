# Setup Instructions for DevFest PTA 2025

## Step-by-Step Setup Guide

### Step 1: Install Prerequisites

1. **Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop
   - Install and ensure it's running
   - Verify: `docker --version` and `docker-compose --version`

2. **Git**
   - Download from: https://git-scm.com/download/win
   - Verify: `git --version`

### Step 2: Clone and Setup

```powershell
# Clone the repository
git clone https://github.com/kevin-naicker-dvt/devfest-pta-2025.git
cd devfest-pta-2025

# Verify structure
ls
```

You should see: frontend/, backend/, database/, docker-compose.yml

### Step 3: Start Docker Desktop

1. Open Docker Desktop application
2. Wait for it to fully start (whale icon in system tray)
3. Ensure it shows "Docker Desktop is running"

### Step 4: Build and Run

```powershell
# Build and start all services
docker-compose up --build

# This will take a few minutes the first time
# You'll see output from all three services
```

### Step 5: Wait for Services to Start

Watch the terminal output. You should see:

```
devfest-database | database system is ready to accept connections
devfest-backend  | 🚀 Backend is running on: http://localhost:3001
devfest-frontend | /docker-entrypoint.sh: Configuration complete
```

### Step 6: Test the Application

1. Open browser: http://localhost:3000
2. You should see "Hello World from DevFest PTA 2025! 🚀"
3. Test API directly: http://localhost:3001/api/health

### Step 7: Stop the Application

```powershell
# Press Ctrl+C in the terminal
# Then run:
docker-compose down
```

## Verification Checklist

- [ ] Docker Desktop is installed and running
- [ ] Repository is cloned
- [ ] All services start without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:3001/api/health
- [ ] "Hello World" message displays from database

## Common Issues and Solutions

### Issue: Port Already in Use

**Error**: "port is already allocated"

**Solution**:
```powershell
# Find what's using the port (e.g., 3000)
netstat -ano | findstr "3000"

# Kill the process using the port
taskkill /F /PID <process_id>

# Or change the port in docker-compose.yml
```

### Issue: Docker Not Running

**Error**: "Cannot connect to the Docker daemon"

**Solution**: 
- Open Docker Desktop application
- Wait for it to fully start
- Try again

### Issue: Database Connection Failed

**Error**: Backend shows "Connection refused" or "Database connection error"

**Solution**:
- Database takes 10-15 seconds to initialize
- Wait a bit longer
- Check database logs: `docker-compose logs database`

### Issue: Frontend Shows "Failed to connect to backend"

**Solution**:
1. Check if backend is running: `docker ps`
2. Check backend logs: `docker-compose logs backend`
3. Verify backend health: http://localhost:3001/api/health
4. Restart services: `docker-compose restart`

### Issue: Changes Not Reflecting

**Solution**:
```powershell
# Rebuild images
docker-compose up --build

# Or clean build
docker-compose down -v
docker-compose up --build
```

## Database Access

To access the PostgreSQL database directly:

```powershell
# Connect to database container
docker-compose exec database psql -U postgres -d devfest_db

# List tables
\dt

# Query hello_world table
SELECT * FROM hello_world;

# Exit
\q
```

## Useful Docker Commands

```powershell
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Restart specific service
docker-compose restart backend

# Stop all services
docker-compose down

# Remove all containers, networks, and volumes
docker-compose down -v

# Remove images as well
docker-compose down -v --rmi all
```

## Next Steps After Setup

Once everything is working:

1. ✅ Hello World app is running
2. 🔄 Ready to implement recruitment features
3. 🚀 Prepare for GCP deployment

## Need Help?

Check the main README.md for more detailed information.


