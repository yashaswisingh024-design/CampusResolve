import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import ReportIssue from './pages/student/ReportIssue';
import StudentComplaints from './pages/student/StudentComplaints';
import ComplaintDetails from './pages/student/ComplaintDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminDepartments from './pages/admin/AdminDepartments';
import Analytics from './pages/admin/Analytics';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Student Routes */}
      <Route path="/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/report" element={<ProtectedRoute allowedRole="student"><ReportIssue /></ProtectedRoute>} />
      <Route path="/complaints" element={<ProtectedRoute allowedRole="student"><StudentComplaints /></ProtectedRoute>} />
      <Route path="/complaints/:id" element={<ProtectedRoute allowedRole="student"><ComplaintDetails /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute allowedRole="admin"><AdminComplaints /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<ProtectedRoute allowedRole="admin"><AdminDepartments /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><Analytics /></ProtectedRoute>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
