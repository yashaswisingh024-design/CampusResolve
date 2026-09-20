import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  FileText, 
  List, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Menu,
  X,
  Building,
  BarChart3,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const studentLinks = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Report Issue', path: '/report', icon: FileText },
    { name: 'My Complaints', path: '/complaints', icon: List },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'All Complaints', path: '/admin/complaints', icon: List },
    { name: 'Departments', path: '/admin/departments', icon: Building },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-accent rounded p-1.5 text-white">
            <Shield size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            Campus<span className="text-primary-accent">Resolve</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path || (link.path !== '/dashboard' && link.path !== '/admin' && location.pathname.startsWith(link.path));
          
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary-soft text-primary-accent" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={18} className={isActive ? "text-primary-accent" : "text-slate-400"} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="pt-4 border-t border-slate-200 space-y-1">
          <button 
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Settings size={18} className="text-slate-400" />
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="text-red-400" />
            Logout
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-700 p-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-medium text-slate-900">{user?.name}</span>
                <span className="text-xs text-slate-500 capitalize">{user?.role}</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <img src={user?.avatar} alt={user?.name} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
