# Recruitment Application Guide

## ✅ Successfully Deployed!

All services are now running with the recruitment application features.

## 🚀 Quick Start

1. **Access the Application**: http://localhost:3000
2. **Backend API**: http://localhost:3001
3. **Database**: PostgreSQL on port 5432

## 👤 Candidate Login

The app starts with a **Candidate Login** screen where you can:

### Option 1: Manual Entry
- Enter your **Candidate Name** (username)
- Enter your **Email Address**
- Enter your **Full Name**
- Click "Continue"

### Option 2: Quick Login (Demo Profiles)
Three pre-configured profiles for quick testing:
- **Sarah Chen** - sarah.chen@example.com
- **Michael Jones** - michael.jones@example.com
- **Priya Patel** - priya.patel@example.com

> ✅ No "John Doe" - using real-sounding names instead!

## 📝 Application Features

### 1. Apply for Job
Navigate to: **Apply for Job** (or click the button in navigation)

Features:
- **Candidate Info Display**: Shows your username, email, and full name
- **Position Selection**: Choose from 10 available positions:
  - Senior Software Engineer
  - Frontend Developer
  - Backend Developer
  - Full Stack Developer
  - DevOps Engineer
  - Cloud Architect
  - Data Scientist
  - Product Manager
  - UX/UI Designer
  - QA Engineer
- **CV Upload (Simulated)**: Click "Upload CV" to simulate a file upload
  - No actual file is uploaded (demo only)
  - A filename is generated: `CV_[username]_[timestamp].pdf`
  - Can delete and re-upload
- **Submit**: Creates your application in the database

### 2. My Applications
Navigate to: **My Applications** (or click the button in navigation)

Features:
- **Real-time Updates**: Automatically refreshes every 5 seconds
- **Application Cards**: Each shows:
  - Application ID
  - Position applied for
  - Status badge (color-coded)
  - Application date
  - Last updated date
  - CV filename
  - Recruiter notes (if any)
- **Empty State**: Shows friendly message if no applications yet

### Status Colors:
- 🟡 **Pending** - Yellow (initial status)
- 🔵 **Reviewing** - Blue (being reviewed)
- 🔵 **Interviewed** - Blue (interview stage)
- 🟢 **Accepted** - Green (offer made)
- 🔴 **Rejected** - Red (declined)

## 🎨 Navigation Features

**Top Navigation Bar** shows:
- App title: "DevFest PTA 2025 - Recruitment"
- **Apply for Job** button
- **My Applications** button
- **Candidate badge** with your username
- **Logout** button

## 🔄 Creating Multiple Candidates

To test with different candidates:

1. **Logout**: Click the Logout button
2. **Login again**: Use a different email/name
3. **Submit applications**: Each candidate can submit multiple applications
4. **Switch between candidates**: Logout and login to see different applications

### Suggested Test Flow:
```
1. Login as Sarah Chen
2. Apply for "Frontend Developer"
3. Go to My Applications - see your application
4. Logout
5. Login as Michael Jones
6. Apply for "Backend Developer"
7. Go to My Applications - see only Michael's applications
8. Logout and switch back to Sarah - see only Sarah's applications
```

## 📊 Database Schema

### Applications Table
```sql
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    candidate_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    cv_filename VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Applications API (`/api/applications`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications` | Create new application |
| GET | `/api/applications` | Get all applications |
| GET | `/api/applications/by-email?email={email}` | Get applications by candidate email |
| GET | `/api/applications/:id` | Get specific application |
| PUT | `/api/applications/:id` | Update application (status/notes) |
| DELETE | `/api/applications/:id` | Delete application |

### Example: Create Application
```bash
curl -X POST http://localhost:3001/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "sarah_chen",
    "email": "sarah.chen@example.com",
    "fullName": "Sarah Chen",
    "position": "Frontend Developer",
    "cvFilename": "CV_sarah_chen_1234567890.pdf"
  }'
```

### Example: Get Applications by Email
```bash
curl http://localhost:3001/api/applications/by-email?email=sarah.chen@example.com
```

### Example: Update Application Status (Recruiter Action)
```bash
curl -X PUT http://localhost:3001/api/applications/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "reviewing",
    "notes": "Great portfolio! Scheduling interview for next week."
  }'
```

## 🧪 Testing Scenarios

### Scenario 1: Submit Multiple Applications
1. Login as any candidate
2. Submit application for "Frontend Developer"
3. Click "Apply for Job" again
4. Submit application for "Backend Developer"
5. Go to "My Applications" - see both applications

### Scenario 2: See Recruiter Updates
1. Submit an application
2. Use curl or Postman to update the application status
3. Watch "My Applications" page (refreshes every 5 seconds)
4. See the status change and notes appear

### Scenario 3: Multiple Candidates
1. Login as Sarah Chen, submit 2 applications
2. Logout, login as Michael Jones, submit 1 application
3. Logout, login as Priya Patel, submit 3 applications
4. Each candidate only sees their own applications

## 🎯 What's Different from "Hello World"

### ✅ NEW Features Added:
- **Candidate Authentication** (simulated - no real auth)
- **Application Submission Form** with position selection
- **CV Upload Simulation** (no actual file handling)
- **My Applications Dashboard** with real-time updates
- **Navigation Menu** with routing
- **Local Storage** to persist candidate session
- **Applications Database Table**
- **Full REST API** for applications
- **Color-coded Status Badges**
- **Responsive UI** with Material-UI components

### ✅ Database Updates:
- New `applications` table with indexes
- Migration-ready SQL script for cloud deployment
- Proper relationships and constraints

## 🚀 Next Steps (Recruiter View)

The next phase will add:
- Recruiter login/dashboard
- Application queue view
- Application detail page with notes editor
- Status management interface
- Filtering and sorting

## 📝 Notes

- **No actual file uploads**: CV upload is simulated for demo purposes
- **No authentication**: Login is emulated for simplicity
- **Auto-refresh**: My Applications page polls every 5 seconds for updates
- **Persistent sessions**: Candidate info stored in localStorage
- **Editable candidates**: You can create as many candidates as needed

## 🐛 Troubleshooting

### Applications not showing up?
- Check browser console for errors
- Verify backend is running: http://localhost:3001/api/health
- Check email matches exactly

### Can't see status updates?
- Wait 5 seconds for auto-refresh
- Check backend logs for database queries
- Verify application ID in database

### Fresh start?
```bash
docker-compose down -v
docker-compose up --build
```

---

**Status**: ✅ Recruitment Application Ready for Demo!

**Built with**: React + TypeScript + Material-UI + NestJS + PostgreSQL + Docker


