import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { useProfileStore } from "../store/profileStore";
import logoImage from "../assets/assope tech.png";
import {
  Compass,
  LayoutDashboard,
  User,
  Activity,
  Award,
  FileText,
  FileSearch,
  MessageSquare,
  Map,
  BookOpen,
  Briefcase,
  Bookmark,
  Send,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bot
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Drawer } from "../components/common/Drawer";
import { Badge } from "../components/common/Badge";
import { AnimatePresence, m } from "framer-motion";
import { fadeIn } from "../animations/variants";

import { ThemeToggle } from "../components/common/ThemeToggle";
import { ToastContainer } from "../components/common/ToastContainer";

export const CandidateLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { selectedGoal } = useProfileStore();
  const { notifications, markAsRead } = useNotificationStore();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Close overlays on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
    setNotificationsOpen(false);
  }, [location]);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/candidate/dashboard" },
    { label: "My Profile", icon: User, path: "/candidate/profile" },
    { label: "Career Quiz", icon: Activity, path: "/candidate/assessment" },
    { label: "Career Matches", icon: Award, path: "/candidate/careers" },
    { label: "Resume Builder", icon: FileText, path: "/candidate/resumes" },
    { label: "Resume Analyzer", icon: FileSearch, path: "/candidate/resume-analyzer" },
    { label: "Mock Interviews", icon: MessageSquare, path: "/candidate/interviews" },
    { label: "Learning Roadmap", icon: Map, path: "/candidate/roadmap" },
    { label: "Skill Quizzes", icon: BookOpen, path: "/candidate/skills" },
    { label: "Job Matches", icon: Briefcase, path: "/candidate/jobs" },
    { label: "Saved Jobs", icon: Bookmark, path: "/candidate/saved-jobs" },
    { label: "Applications Tracker", icon: Send, path: "/candidate/applications" },
    { label: "AI Assistant Chat", icon: Bot, path: "/candidate/assistant" },
    { label: "Account Settings", icon: Settings, path: "/candidate/settings" }
  ];

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-slate-900 dark:bg-slate-950 text-slate-300 border-r border-slate-800 transition-all duration-300 relative z-30 ${
          sidebarExpanded ? "w-64" : "w-20"
        }`}
      >
        {/* Brand header */}
        <div className={`p-6 border-b border-slate-800 flex items-center justify-between ${sidebarExpanded ? "px-6" : "px-4 justify-center"}`}>
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
            <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
              MEMBER
            </Badge>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                  active
                    ? "bg-primary-600 text-white shadow-xs shadow-primary-500/20"
                    : "hover:bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                {sidebarExpanded && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t border-slate-800 ${sidebarExpanded ? "px-5" : "px-3"}`}>
          <Button
            variant="ghost"
            className={`w-full text-slate-400 hover:text-white hover:bg-slate-800 justify-start px-2 py-2.5 ${!sidebarExpanded && "justify-center"}`}
            onClick={logout}
            leftIcon={<LogOut className="h-4.5 w-4.5" />}
          >
            {sidebarExpanded && <span className="text-xs font-semibold tracking-wide">Sign Out</span>}
          </Button>
        </div>

        {/* Expand/Collapse Toggle Button */}
        <button
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          className="absolute bottom-16 -right-3 h-6 w-6 rounded-full bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400 flex items-center justify-center z-40 transition-colors shadow-md"
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
        title="Candidate Menu"
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
                      ? "bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Dashboard Header */}
        <header className="h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100 capitalize tracking-tight">
              Welcome back, {user?.name || "Candidate"}
            </h1>
          </div>

          <div className="flex items-center gap-3 relative">
            <ThemeToggle />

            {/* Notifications Trigger */}
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl relative"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>

            {/* Profile Dropdown Simulation */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/candidate/profile")}>
              <div className="h-9 w-9 rounded-full bg-linear-to-tr from-primary-600 to-brand-500 flex items-center justify-center font-bold text-white text-xs shadow-md border border-white dark:border-slate-800">
                {user?.name ? user.name.split(" ").map(n => n[0]).join("") : "U"}
              </div>
            </div>

            {/* Notifications Panel */}
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <m.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 flex flex-col max-h-96 overflow-hidden"
                  >
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Notifications</h4>
                      <Badge variant="primary" className="text-[10px]">
                        {unreadNotifications.length} NEW
                      </Badge>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500 font-medium">
                          No notifications
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex gap-3 ${
                              !notif.read ? "bg-primary-50/20 dark:bg-primary-950/30" : ""
                            }`}
                            onClick={() => {
                              markAsRead(notif.id);
                              navigate("/candidate/notifications");
                            }}
                          >
                            <div className="flex-1 flex flex-col gap-0.8">
                              <p className={`text-xs font-semibold ${!notif.read ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"}`}>
                                {notif.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {notif.content}
                              </p>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{notif.timestamp}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div
                      className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold cursor-pointer bg-slate-50/20 dark:bg-slate-950/20 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                      onClick={() => {
                        setNotificationsOpen(false);
                        navigate("/candidate/notifications");
                      }}
                    >
                      View all notifications
                    </div>
                  </m.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
          <AnimatePresence mode="wait">
            <m.div
              key={location.pathname}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-5.5xl mx-auto h-full"
            >
              <Outlet />
            </m.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating AI Bot Drawer Trigger */}
      <button
        onClick={() => navigate("/candidate/assistant")}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-linear-to-tr from-primary-600 to-brand-500 hover:from-primary-700 hover:to-brand-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/30 z-30 transition-transform hover:scale-105 active:scale-95"
        aria-label="Open AI Career Assistant chat"
      >
        <Bot className="h-6 w-6" />
      </button>

      <ToastContainer />
    </div>
  );
};
