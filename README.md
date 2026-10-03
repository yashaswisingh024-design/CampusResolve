# CampusResolve

A modern, premium frontend interface for reporting and tracking campus complaints, fully integrated with a Spring Boot backend.

## ✨ Features

- **Premium UI & Animations**: Distinctive startup-style design featuring a bespoke brand color palette (Charcoal, Coral, Peach, Teal), and dynamic `framer-motion` micro-interactions.
- **Student Portal**: Intuitive complaint reporting, issue tracking dashboard, and real-time status updates.
- **Admin Dashboard**: Comprehensive complaint management, priority routing, status updating, and data-driven analytics.
- **Real Backend Integration**: 100% integrated with a Spring Boot REST API. Zero mock data.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop devices.
- **Centralized API config**: Easy to re-configure backend endpoints for local development vs production.

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS v3
- Framer Motion
- React Router DOM
- Recharts (Analytics)
- Lucide React (Icons)

### Backend
The backend is developed using Java and Spring Boot, providing REST APIs connected to a MySQL database.
*Architecture:* Controller → Service → DAO → JDBC → MySQL

## 🔧 Setup & Configuration

### Prerequisites
Make sure your Spring Boot backend is running locally (usually on port `8080`) before starting the frontend.

### Environment Configuration
The frontend uses a `.env` file to locate the backend API.
A default `.env` file is included with:
```env
VITE_API_BASE_URL=http://localhost:8080
```
Change this if your backend runs on a different port or server.

### 🚀 Run Locally

```bash
git clone https://github.com/yashaswisingh024-design/CampusResolve.git
cd CampusResolve
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## 🏗️ Recent Updates
- Overhauled Landing, Login, and Registration pages into a modern, polished product experience.
- Completely removed all legacy mock JSON data and simulated responses.
- Implemented `apiClient.js` to intelligently handle network errors (e.g. `Failed to fetch` -> "Unable to connect to the server").
- Fixed dynamic stat calculation on the Admin Analytics dashboard based on actual complaint timestamps and statuses.
