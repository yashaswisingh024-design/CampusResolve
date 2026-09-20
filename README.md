# CampusResolve

A modern frontend interface for reporting and tracking campus complaints.

## ✨ Features

- 🎓 Student-friendly complaint reporting
- 📋 Complaint tracking dashboard
- 🔎 Complaint details and status
- 🏢 Admin dashboard interface
- 📊 Complaint analytics UI
- 🔐 Login & registration pages
- 📱 Responsive design
- ⚡ Modern React-based UI

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- CSS
- React Router
##  Backend

The backend is developed using Java and Spring Boot and provides REST APIs
for communication between the frontend and MySQL database.

### Backend Features

- Student registration and login
- Student/Admin role handling
- Complaint submission
- Complaint retrieval and tracking
- Admin complaint management
- Complaint filtering
- Priority management
- Status management
- Admin dashboard statistics
- Student feedback

### Backend Architecture

```text
Controller
    ↓
Service
    ↓
DAO
    ↓
JDBC
    ↓
MySQL

### Database
The backend uses MySQL with the following main tables:
users
complaints
feedback

### API
The backend exposes REST endpoints for:
Authentication
Complaint management
Admin management
Dashboard statistics
Feedback

## 🚀 Run Locally

```bash
git clone https://github.com/yashaswisingh024-design/CampusResolve.git
cd CampusResolve
npm install
npm run dev
