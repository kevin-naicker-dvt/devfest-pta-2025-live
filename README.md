# DevFest PTA 2025 - Recruitment Application

A modern 3-tier web application built for Google Cloud Platform demonstration at DevFest Pretoria 2025.

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript and Material-UI
- **Backend**: NestJS with TypeORM
- **Database**: PostgreSQL 16
- **Containerization**: Docker & Docker Compose

### Architecture Diagram
```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Frontend │─────▶│  NestJS Backend │─────▶│   PostgreSQL    │
│   (Port 3000)   │      │   (Port 3001)   │      │   (Port 5432)   │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

## 📁 Project Structure (Monorepo)

```
devfest-pta-2025/
├── frontend/               # React TypeScript application
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── backend/                # NestJS API
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── database/               # Database scripts
│   └── init.sql
├── docker-compose.yml      # Local orchestration
└── README.md
```

## 🚀 Quick Start - Local Development with Docker

### Prerequisites
- Docker Desktop installed and running
- Git
- Windows PowerShell (or terminal of choice)

### 1. Clone the Repository
```powershell
git clone https://github.com/kevin-naicker-dvt/devfest-pta-2025.git
cd devfest-pta-2025
```

### 2. Start All Services
```powershell
docker-compose up --build
```

This command will:
- Build Docker images for frontend and backend
- Pull PostgreSQL image
- Initialize database with schema and data
- Start all three services

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health
- **Hello World**: http://localhost:3001/api/hello
- **Database**: localhost:5432 (credentials in docker-compose.yml)

### 4. Stop Services
```powershell
# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (clean slate)
docker-compose down -v
```

## 🧪 Testing the Hello World App

1. **Start the application** using `docker-compose up --build`
2. **Wait for all services to be ready** (look for "Backend is running" message)
3. **Open browser** to http://localhost:3000
4. **You should see**: "Hello World from DevFest PTA 2025! 🚀" retrieved from the database

### Troubleshooting

**Frontend shows error connecting to backend:**
- Ensure backend container is running: `docker ps`
- Check backend logs: `docker logs devfest-backend`

**Backend can't connect to database:**
- Check database health: `docker logs devfest-database`
- Wait a few seconds for database to be ready

**Port conflicts:**
- Make sure ports 3000, 3001, and 5432 are not in use
- Check with: `netstat -ano | findstr "3000"`

## 💻 Local Development (Without Docker)

### Backend Setup
```powershell
cd backend
npm install

# Copy environment file
copy .env.example .env

# Make sure PostgreSQL is running locally
# Then start the backend
npm run start:dev
```

### Frontend Setup
```powershell
cd frontend
npm install

# Start the development server
npm start
```

### Database Setup (Local PostgreSQL)
```powershell
# Connect to PostgreSQL and run
psql -U postgres
CREATE DATABASE devfest_db;
\c devfest_db
# Run the contents of database/init.sql
```

## 🔐 Environment Variables

### Backend (.env)
```
DB_HOST=database          # Use 'localhost' for local dev
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=DevF3st123-pluto-is-plan3t
DB_DATABASE=devfest_db
PORT=3001
```

### Frontend
```
REACT_APP_API_URL=http://localhost:3001
```

## 📦 Docker Commands Reference

```powershell
# Build images without starting
docker-compose build

# Start services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend

# Restart a specific service
docker-compose restart backend

# Execute command in container
docker-compose exec backend sh
docker-compose exec database psql -U postgres -d devfest_db

# Clean up everything
docker-compose down -v --rmi all
```

## 🌐 GCP Deployment (Coming Soon)

The application will be deployed to Google Cloud Platform using:
- **Cloud Build** for CI/CD (GitHub integration)
- **Cloud Run** for containerized services
- **Cloud SQL** for PostgreSQL database

## 📝 Application Features

### Phase 1: Hello World ✅
- Display message from database
- Test 3-tier architecture

### Phase 2: Recruitment Application (Coming Next)
- Job application submission form
- Recruiter dashboard with application queue
- Application detail view with notes
- Status tracking for applicants

## 🤝 Contributing

This is a demo project for DevFest PTA 2025. For questions or issues, please contact the development team.

## 📄 License

See LICENSE file for details.

## 🎯 Next Steps

1. Test the Hello World application locally
2. Deploy to GCP
3. Implement recruitment application features
4. Set up CI/CD pipeline with Cloud Build

---

**Built with ❤️ for DevFest Pretoria 2025**
