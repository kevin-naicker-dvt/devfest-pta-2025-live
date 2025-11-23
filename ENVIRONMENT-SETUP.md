# Environment Variables Setup

## Overview

This project uses environment variables for configuration. Different setups are needed for:
- **Docker Compose** (local testing) - variables in docker-compose.yml
- **Local Development** (without Docker) - .env files needed
- **GCP Deployment** - Cloud environment variables

## 🐳 Docker Compose (Default - Ready to Use)

The `docker-compose.yml` already contains all necessary environment variables. No additional setup needed!

```yaml
# Backend environment (in docker-compose.yml)
environment:
  DB_HOST: database
  DB_PORT: 5432
  DB_USERNAME: postgres
  DB_PASSWORD: DevF3st123-pluto-is-plan3t
  DB_DATABASE: devfest_db
  PORT: 3001
  NODE_ENV: production

# Frontend environment (in docker-compose.yml)
environment:
  REACT_APP_API_URL: http://localhost:3001
```

**To run**: Simply execute `docker-compose up --build` - it works out of the box!

## 💻 Local Development Setup (Without Docker)

If you want to run services locally without Docker:

### Backend `.env` File

Create a file `backend/.env` with:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=DevF3st123-pluto-is-plan3t
DB_DATABASE=devfest_db

# Application Configuration
PORT=3001
NODE_ENV=development
```

### Frontend Environment

For local React development, create `frontend/.env` with:

```env
REACT_APP_API_URL=http://localhost:3001
```

### Local PostgreSQL Setup

You'll also need PostgreSQL installed locally:

```powershell
# Install PostgreSQL (using Chocolatey)
choco install postgresql

# Or download from: https://www.postgresql.org/download/windows/

# Create database
psql -U postgres
CREATE DATABASE devfest_db;
\c devfest_db

# Run the init script
\i database/init.sql
```

### Running Locally

```powershell
# Terminal 1: Backend
cd backend
npm install
npm run start:dev

# Terminal 2: Frontend  
cd frontend
npm install
npm start

# Make sure PostgreSQL is running!
```

## ☁️ GCP Deployment Configuration

For Google Cloud Platform deployment, environment variables will be configured differently:

### Backend (Cloud Run)

Environment variables will be set via Cloud Run configuration:

```yaml
# These will be set in Cloud Run Console or via gcloud CLI
DB_HOST: <CLOUD_SQL_CONNECTION_NAME>
DB_PORT: 5432
DB_USERNAME: <CLOUD_SQL_USERNAME>
DB_PASSWORD: <STORED_IN_SECRET_MANAGER>
DB_DATABASE: devfest_db
PORT: 8080  # Cloud Run default
NODE_ENV: production
```

### Frontend (Cloud Run)

Build-time environment variables for React:

```yaml
# Set during Cloud Build
REACT_APP_API_URL: <BACKEND_CLOUD_RUN_URL>
```

### Cloud SQL Connection

The backend will connect to Cloud SQL via:
- Unix socket (recommended): `/cloudsql/<PROJECT>:<REGION>:<INSTANCE>`
- Or TCP with Cloud SQL Proxy

## 🔐 Security Best Practices

### For Development (Current)
- ✅ Credentials in docker-compose.yml (local only, not committed to GitHub public repo)
- ✅ .env files in .gitignore (never committed)

### For Production (GCP)
- 🔒 Use Cloud Secret Manager for sensitive data
- 🔒 Use Cloud SQL IAM authentication when possible
- 🔒 Rotate credentials regularly
- 🔒 Use least-privilege service accounts
- 🔒 Enable Cloud SQL SSL/TLS

## 📋 Environment Variables Reference

### Backend Environment Variables

| Variable | Description | Local Dev | Docker | GCP |
|----------|-------------|-----------|--------|-----|
| `DB_HOST` | Database hostname | localhost | database | Cloud SQL |
| `DB_PORT` | Database port | 5432 | 5432 | 5432 |
| `DB_USERNAME` | Database user | postgres | postgres | postgres |
| `DB_PASSWORD` | Database password | (see above) | (see above) | Secret Manager |
| `DB_DATABASE` | Database name | devfest_db | devfest_db | devfest_db |
| `PORT` | API port | 3001 | 3001 | 8080 |
| `NODE_ENV` | Environment | development | production | production |

### Frontend Environment Variables

| Variable | Description | Local Dev | Docker | GCP |
|----------|-------------|-----------|--------|-----|
| `REACT_APP_API_URL` | Backend API URL | http://localhost:3001 | http://localhost:3001 | https://backend-xxx.run.app |

## 🧪 Testing Environment Configuration

### Verify Backend Configuration

```powershell
# Using Docker
docker-compose exec backend env

# Or check logs for connection info
docker-compose logs backend | findstr "DB_HOST"
```

### Verify Frontend Configuration

Check the browser console, or test the API endpoint:

```javascript
// In browser console at http://localhost:3000
console.log(process.env.REACT_APP_API_URL);
```

### Test Database Connection

```powershell
# From backend container
docker-compose exec backend sh
# Then test connection (inside container)
nc -zv database 5432

# Or query directly
docker-compose exec database psql -U postgres -d devfest_db -c "SELECT version();"
```

## 🔄 Changing Environment Variables

### Docker Compose

1. Edit `docker-compose.yml`
2. Restart services:
   ```powershell
   docker-compose down
   docker-compose up --build
   ```

### Local Development

1. Edit `.env` files
2. Restart the application (changes auto-reload for backend in dev mode)

### GCP

1. Update Cloud Run service environment variables:
   ```bash
   gcloud run services update SERVICE_NAME \
     --set-env-vars KEY=VALUE
   ```

2. Or update via Cloud Console

## ⚠️ Common Issues

### Issue: Backend can't connect to database

**Symptom**: "Connection refused" or "ECONNREFUSED"

**Solution**:
- Check `DB_HOST` is correct:
  - Docker: should be `database` (service name)
  - Local: should be `localhost`
- Verify database is running
- Check port is correct (5432)

### Issue: Frontend can't reach backend

**Symptom**: "Network Error" or "Failed to fetch"

**Solution**:
- Verify `REACT_APP_API_URL` is correct
- For Docker: `http://localhost:3001`
- Check backend is running and healthy
- Verify CORS is enabled in backend

### Issue: Changes to .env not reflecting

**Solution**:
- Frontend: Must rebuild (npm start automatically rebuilds)
- Backend: Should auto-reload in dev mode
- Docker: Must rebuild images (`docker-compose up --build`)

## 📝 Notes

### Build-time vs Runtime Variables

**Frontend (React)**:
- `REACT_APP_*` variables are embedded at **build time**
- Changes require rebuild
- Accessible via `process.env.REACT_APP_*`

**Backend (NestJS)**:
- All variables loaded at **runtime**
- Changes take effect after restart (no rebuild needed)
- Accessible via `process.env.*`

### Docker Compose Override

For local customization without modifying `docker-compose.yml`, create `docker-compose.override.yml`:

```yaml
version: '3.8'
services:
  backend:
    environment:
      DEBUG: 'true'
  frontend:
    environment:
      REACT_APP_DEBUG: 'true'
```

This file is automatically merged with `docker-compose.yml` and should be added to `.gitignore`.

## ✅ Quick Verification

Everything is set up correctly if:

- [ ] `docker-compose up` starts without errors
- [ ] Backend connects to database successfully
- [ ] Frontend displays "Hello World" from database
- [ ] No environment-related errors in logs
- [ ] Health check returns 200: http://localhost:3001/api/health

---

**Current Status**: ✅ All environment variables configured for Docker Compose

**Action Required**: None for Docker testing. Create `.env` files only if running locally without Docker.


