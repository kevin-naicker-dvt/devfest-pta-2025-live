# Recruiter Dashboard Guide

## ✅ Successfully Deployed!

The recruiter interface is now available with full queue management and application editing capabilities.

## 🚀 Getting Started

### Access the Application
1. Open your browser: **http://localhost:3000**
2. You'll see the **Role Selection** screen
3. Click **"Continue as Recruiter"** button

## 🎯 Recruiter Features

### 1. Role Selection Screen
When you first load the app, you choose between:
- **Job Candidate** - Submit and track applications
- **Recruiter** - Review and manage applications

**Note**: No login credentials required for the recruiter role (demo mode)

### 2. Application Queue (Main View)

A comprehensive table view showing all submitted applications:

#### Table Columns:
| Column | Description |
|--------|-------------|
| **ID** | Application number (e.g., #1, #2) |
| **Candidate** | Full name and username |
| **Email** | Candidate's email address |
| **Position** | Job position applied for |
| **Status** | Current application status (color-coded badge) |
| **Applied** | Submission date and time |
| **CV** | CV filename (simulated upload) |
| **Actions** | Edit button to open application details |

#### Features:
- ✅ **Real-time Updates**: Automatically refreshes every 5 seconds
- ✅ **Application Counter**: Shows total number of applications
- ✅ **Sortable**: Click columns to sort (if implemented)
- ✅ **Hover Effects**: Row highlights on hover
- ✅ **Empty State**: Shows friendly message when no applications exist

### 3. Edit Application Dialog

Click the **Edit** button (pencil icon) on any application to open the editor.

#### Candidate Information (Read-Only):
- Full Name
- Username
- Email
- Position Applied For
- CV Filename
- Application Date
- Last Updated Date

#### Editable Fields:
1. **Status Dropdown** - Select from:
   - 🟡 Pending (initial status)
   - 🔵 Reviewing
   - 🔵 Interviewed
   - 🟢 Accepted
   - 🔴 Rejected

2. **Recruiter Notes** - Multi-line text field
   - Add comments about the candidate
   - Record interview feedback
   - Document hiring decisions
   - **Note**: These notes are visible to candidates!

#### Actions:
- **Cancel** - Close without saving
- **Save Changes** - Update application in database

### Status Badge Colors:
- 🟡 **Pending** - Yellow (default for new applications)
- 🔵 **Reviewing/Interviewed** - Blue (in progress)
- 🟢 **Accepted** - Green (positive outcome)
- 🔴 **Rejected** - Red (negative outcome)

## 🔄 Typical Workflow

### Scenario 1: Review New Application
```
1. View Application Queue
2. See new application with "PENDING" status
3. Click Edit button
4. Review candidate information
5. Update status to "REVIEWING"
6. Add note: "Reviewing credentials, strong portfolio"
7. Save Changes
8. Candidate sees update within 5 seconds
```

### Scenario 2: Schedule Interview
```
1. Find application in queue
2. Click Edit
3. Update status to "INTERVIEWED"
4. Add note: "Interview scheduled for Nov 25, 2pm"
5. Save Changes
```

### Scenario 3: Make Decision
```
1. Open application after interview
2. Update status to "ACCEPTED" or "REJECTED"
3. Add note: 
   - Accepted: "Great fit! Preparing offer letter."
   - Rejected: "Looking for more experience. Thank you for applying."
4. Save Changes
```

## 🎨 Navigation Features

**Top Navigation Bar** (Recruiter Mode - Purple/Pink):
- App title: "DevFest PTA 2025 - Recruitment"
- **Application Queue** button
- **Recruiter** badge
- **Switch Role** button (returns to role selection)

## 🔄 Switching Between Roles

### To Test Both Views:
1. **As Recruiter**: Click "Switch Role"
2. **Role Selection**: Choose "Job Candidate"
3. **Login**: Select or create a candidate profile
4. **Submit Applications**: Create test data
5. **Switch Back**: Logout → Choose "Recruiter"
6. **See Updates**: View applications in queue

## 📊 Testing Guide

### Complete End-to-End Test:

#### Part 1: Create Test Data (As Candidate)
```
1. Open app → Select "Job Candidate"
2. Login as "Sarah Chen"
3. Apply for "Frontend Developer"
4. Logout → Select "Job Candidate"
5. Login as "Michael Jones"
6. Apply for "Backend Developer"
7. Apply for "DevOps Engineer"
8. Logout
```

#### Part 2: Manage Applications (As Recruiter)
```
1. Select "Recruiter"
2. See 3 applications in queue
3. Click Edit on Sarah's application
4. Update status to "REVIEWING"
5. Add note: "Excellent React portfolio"
6. Save
7. Click Edit on Michael's first application
8. Update status to "INTERVIEWED"
9. Add note: "Interview on Friday"
10. Save
```

#### Part 3: Verify Updates (As Candidate)
```
1. Switch Role → Job Candidate
2. Login as Sarah Chen
3. Go to "My Applications"
4. See status changed to "REVIEWING"
5. See recruiter note appear
6. Logout → Login as Michael Jones
7. See "INTERVIEWED" status with note
```

## 🔌 API Usage

The recruiter interface uses these API endpoints:

### Get All Applications
```bash
curl http://localhost:3001/api/applications
```

### Update Application
```bash
curl -X PUT http://localhost:3001/api/applications/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "reviewing",
    "notes": "Great portfolio! Scheduling interview."
  }'
```

### Get Specific Application
```bash
curl http://localhost:3001/api/applications/1
```

## 💡 Pro Tips

### For Demo Presentations:

1. **Pre-populate Data**: 
   - Before demo, create 5-10 applications as different candidates
   - Use various positions and dates

2. **Show Real-time Updates**:
   - Open recruiter view on one screen
   - Open candidate view (different candidate) on another
   - Update status in recruiter view
   - Show automatic update in candidate view

3. **Highlight Features**:
   - Color-coded status badges
   - Edit dialog with all candidate info
   - Notes visible to candidates
   - Auto-refresh functionality

4. **Use Realistic Scenarios**:
   - Accept some candidates
   - Reject some with polite notes
   - Keep some in "Reviewing" or "Interviewed"

## 🎯 What's Different from Candidate View

### Recruiter View Has:
- ✅ **Application Queue** - See ALL applications from all candidates
- ✅ **Edit Capability** - Change status and add notes
- ✅ **No Personal Info** - No login required (demo simplicity)
- ✅ **Purple/Pink Theme** - Different color scheme
- ✅ **Table View** - Efficient queue management

### Candidate View Has:
- ✅ **Login Required** - Must identify as a candidate
- ✅ **Personal Applications** - See only own applications
- ✅ **Submit Applications** - Create new applications
- ✅ **Read-Only Status** - Cannot edit own applications
- ✅ **Blue Theme** - Different color scheme

## 🚀 Next Steps (Future Enhancements)

Potential additions (not implemented yet):
- Filtering by status
- Search by candidate name/email
- Bulk status updates
- Export to CSV
- Email notifications
- Application statistics dashboard
- File attachment preview
- Interview scheduling integration

## 📝 Important Notes

### Demo Limitations:
- ✅ **No Authentication** - Recruiter role has no login (by design for simplicity)
- ✅ **Notes Are Public** - Candidates can see all recruiter notes
- ✅ **No Permissions** - Any recruiter can edit any application
- ✅ **No Audit Trail** - Changes not tracked by user
- ✅ **Simulated CV** - No actual file download

### Production Recommendations:
For a real production system, you would add:
- Recruiter authentication
- Role-based permissions
- Audit logging
- Private notes vs public notes
- File upload/download
- Email notifications
- Advanced filtering and search

## 🐛 Troubleshooting

### Can't see applications in queue?
- Check if any applications have been submitted
- Verify backend is running: http://localhost:3001/api/applications
- Check browser console for errors

### Changes not saving?
- Check backend logs for errors
- Verify database connection
- Ensure status is selected

### Updates not showing immediately?
- Wait 5 seconds for auto-refresh
- Manually refresh browser
- Check network tab for API calls

### Need fresh start?
```bash
# Stop all services and clear database
docker-compose down -v

# Rebuild and start
docker-compose up --build
```

---

**Status**: ✅ Recruiter Dashboard Complete and Ready!

**Features**: Role Selection, Application Queue, Edit Dialog, Real-time Updates, Status Management, Notes System

**Built with**: React + TypeScript + Material-UI + NestJS + PostgreSQL + Docker


