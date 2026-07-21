import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import logoImage from "../assets/assope tech.png";
import {
  Compass,
  LayoutDashboard,
  Users,
  UserCheck,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  MessageSquareCode,
  FileCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Drawer } from "../components/common/Drawer";
import { Badge } from "../components/common/Badge";
import { ThemeToggle } from "../components/common/ThemeToggle";
import { AnimatePresence, m } from "framer-motion";
import { fadeIn } from "../animations/variants";

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "User Accounts", icon: Users, path: "/admin/users" },
    { label: "Candidates", icon: UserCheck, path: "/admin/candidates" },
    { label: "Mentors Directory", icon: Users, path: "/admin/mentors" },
    { label: "Career Fields", icon: Award, path: "/admin/careers" },
    { label: "Skill Quizzes", icon: BookOpen, path: "/admin/skills" },
    { label: "Job Postings", icon: Briefcase, path: "/admin/jobs" },
    { label: "Partner Companies", icon: Layers, path: "/admin/companies" },
    { label: "Contact Inbox", icon: MessageSquareCode, path: "/admin/contact-messages" },
    { label: "Reports & Audits", icon: FileCheck, path: "/admin/reports" },
    { label: "Admin Settings", icon: Settings, path: "/admin/settings" }
  ];

  return (
    <div className="min-h-screen flex transition-colors duration-250" style={{ backgroundColor: "var(--bg-background)", color: "var(--text-paragraph)" }}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col text-slate-200 transition-all duration-300 relative z-30 ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
        style={{ backgroundColor: "#0d1b3e", borderRight: "1px solid rgba(171,196,255,0.15)" }}
      >
        <div className={`p-6 flex items-center justify-between ${sidebarExpanded ? "px-6" : "px-4 justify-center"}`} style={{ borderBottom: "1px solid rgba(171,196,255,0.12)" }}>
          {sidebarExpanded ? (
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logoImage} alt="Ascope Tech" className="h-11 md:h-12 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-md" />
            </Link>
          ) : (
            <Link to="/">
              <img src={logoImage} alt="Ascope Tech" className="h-8 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-md" />
            </Link>
          )}

          {sidebarExpanded && (
            <Badge variant="danger" className="text-[9px] px-1.5 py-0">
              SYSTEM
            </Badge>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all group"
                style={active
                  ? { background: "linear-gradient(135deg,#ef4444,#f87171)", color: "#ffffff", boxShadow: "0 2px 10px rgba(239,68,68,0.3)" }
                  : { color: "rgba(171,196,255,0.8)" }
                }
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-red-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                {sidebarExpanded && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div className={`p-4 ${sidebarExpanded ? "px-5" : "px-3"}`} style={{ borderTop: "1px solid rgba(171,196,255,0.12)" }}>
          <Button
            variant="ghost"
            className="w-full text-slate-400 hover:text-white hover:bg-slate-900 justify-start px-2 py-2.5"
            onClick={logout}
            leftIcon={<LogOut className="h-4.5 w-4.5" />}
          >
            {sidebarExpanded && <span className="text-xs font-semibold tracking-wide">Sign Out</span>}
          </Button>
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="absolute bottom-16 -right-3 h-6 w-6 rounded-full flex items-center justify-center z-40 shadow-md hover:text-white"
          style={{ backgroundColor: "#0d1b3e", border: "1px solid rgba(171,196,255,0.25)", color: "rgba(171,196,255,0.7)" }}
        >
          {sidebarExpanded ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </aside>

      {/* Mobile Menu Drawer */}
      <Drawer
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        side="left"
        size="sm"
        title="Admin Control panel"
      >
        <div className="flex flex-col gap-6 justify-between h-full pb-8">
          <div className="flex flex-col gap-1 mt-4">
            {menuItems.map((item) => {
              const active = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    active
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          <Button
            variant="outline"
            className="w-full justify-center"
            leftIcon={<LogOut className="h-4.5 w-4.5" />}
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 px-6 flex items-center justify-between shrink-0 transition-colors duration-250" style={{ backgroundColor: "var(--bg-navbar)", borderBottom: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Administrative Console (Role: Systems Administrator)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="h-9 w-9 rounded-full bg-slate-950 dark:bg-slate-800 text-white border border-slate-700 flex items-center justify-center font-bold text-xs shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Main Panels */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 transition-colors duration-250" style={{ backgroundColor: "var(--bg-section)" }}>
          <AnimatePresence mode="wait">
            <m.div
              key={location.pathname}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-7xl mx-auto h-full"
            >
              <Outlet />
            </m.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
