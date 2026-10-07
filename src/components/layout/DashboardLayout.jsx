import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  List, 
  LogOut, 
  Menu,
  X,
  BarChart3,
  ArrowUpRight
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
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const links = user?.role === 'ADMIN' ? adminLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="px-6 pt-7 pb-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 bg-[#2F858E] rounded-2xl text-white flex items-center justify-center shadow-md shadow-[#2F858E]/20">
            <ShieldCheck size={21} className="stroke-[2.4]" />
          </div>
          <span className="font-bold text-[17px] text-[#222B33] tracking-tight">
            Campus<span className="text-[#2F858E]">Resolve</span>
          </span>
        </Link>
        <div className="mt-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">
          <span className="h-px flex-1 bg-[#e8dfd3]" /> Workspace <span className="h-px flex-1 bg-[#e8dfd3]" />
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path || (link.path !== '/dashboard' && link.path !== '/admin' && location.pathname.startsWith(link.path));
          
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                 "group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive 
                   ? "bg-[#2F858E] text-white shadow-md shadow-[#2F858E]/15" 
                   : "text-[#53636a] hover:bg-[#f5eee5] hover:text-[#222B33]"
              )}
            >
              <Icon size={18} className={isActive ? "text-[#f5dfce]" : "text-[#8a9a9b] group-hover:text-[#2F858E]"} />
              {link.name}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#EBCFB7]" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="mb-3 rounded-2xl bg-[#f5eee5] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#2F858E]">Campus desk</p>
          <p className="mt-1 text-xs leading-relaxed text-[#53636a]">One clear channel for a better campus.</p>
          <ArrowUpRight size={14} className="mt-3 text-[#2F858E]" />
        </div>
        <div className="pt-3 border-t border-[#e8dfd3]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-sm font-semibold text-[#9d5c4d] hover:bg-[#f7e8e1] transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="dashboard-shell min-h-[100dvh] bg-[#f7efe5] flex text-[#222B33]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#222B33]/45 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-[264px] bg-[#fbf8f2] border-r border-[#e8dfd3] flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-[100dvh]">
        {/* Topbar */}
        <header className="bg-[#f7efe5]/95 border-b border-[#e8dfd3] min-h-16 flex items-center justify-between px-4 sm:px-6 lg:px-9 shrink-0">
          <button 
            aria-label="Open navigation"
            className="lg:hidden text-[#53636a] hover:text-[#2F858E] p-2 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#7a898d]">
            <span className="h-2 w-2 rounded-full bg-[#2F858E]" /> Campus operations <span className="text-[#c3b8aa]">/</span> {links.find(link => link.path === location.pathname)?.name || links[0].name}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-semibold text-[#222B33]">{user?.name}</span>
                <span className="text-[10px] text-[#7a898d] uppercase tracking-[.14em]">{user?.role === 'ADMIN' ? 'Administrator' : 'Student'}</span>
              </div>
              <div aria-label={user?.name || 'User'} className="h-10 w-10 rounded-full bg-[#EBCFB7] border-2 border-white text-[#60483d] flex items-center justify-center text-sm font-bold shadow-sm">
                {(user?.name || 'U').split(' ').map(part => part[0]).slice(0, 2).join('').toUpperCase()}
              </div>
              {sidebarOpen && <button aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-[#53636a]"><X size={18} /></button>}
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 p-4 sm:p-6 lg:px-9 lg:py-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
