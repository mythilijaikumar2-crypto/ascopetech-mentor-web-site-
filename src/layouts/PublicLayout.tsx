import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, X, ArrowRight, LogIn, Mail, Globe } from "lucide-react";
import logoImage from "../assets/assope tech.png";
import { Button } from "../components/common/Button";
import { Drawer } from "../components/common/Drawer";
import { AnimatePresence, m } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem, fadeUp } from "../animations/variants";
import { ThemeToggle } from "../components/common/ThemeToggle";

export const PublicLayout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect on Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "Career Paths", path: "/careers" },
    { label: "Jobs", path: "/jobs" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Header Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/85 dark:bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
            : "bg-slate-950/60 backdrop-blur-sm py-4 border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logoImage}
              alt="Ascope Tech"
              className="h-14 md:h-16 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-lg group-hover:scale-105 transition-all duration-300"
            />
          </Link>

          {/* Desktop Nav Items: High Contrast Glass Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-xl">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-xs font-extrabold tracking-wide rounded-full transition-all duration-300 ${
                    active
                      ? "text-white bg-gradient-to-r from-primary-600 to-indigo-600 shadow-md scale-[1.02]"
                      : "text-slate-200 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold backdrop-blur-sm"
                  onClick={() => {
                    if (user?.role === "admin") {
                      navigate("/admin/dashboard");
                    } else {
                      navigate("/candidate/dashboard");
                    }
                  }}
                >
                  Go to Dashboard
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-200 hover:text-white hover:bg-white/10 font-bold" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="text" size="sm" className="text-white hover:text-primary-300 font-extrabold" leftIcon={<LogIn className="h-4 w-4" />}>
                    Login
                  </Button>
                </Link>
                <Link to="/onboarding">
                  <Button variant="primary" size="sm" className="font-extrabold shadow-lg shadow-primary-500/30" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 md:hidden text-white hover:bg-white/10"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Navigation Menu"
        side="right"
        size="sm"
      >
        <div className="flex flex-col gap-6 h-full justify-between pb-8">
          <div className="flex flex-col gap-2 mt-4">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    if (user?.role === "admin") {
                      navigate("/admin/dashboard");
                    } else {
                      navigate("/candidate/dashboard");
                    }
                  }}
                >
                  Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-center" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <Button variant="outline" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link to="/onboarding" className="w-full">
                  <Button variant="primary" className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* Main Pages Content */}
      <main className="grow pt-20">
        <AnimatePresence mode="wait">
          <m.div
            key={location.pathname}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Outlet />
          </m.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <m.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="bg-slate-950 text-slate-200 py-16 border-t-2 border-primary-500/40 relative overflow-hidden"
      >
        {/* Ambient glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

        <m.div
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10"
        >
          {/* Brand Info */}
          <m.div variants={staggerItem} className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 max-w-fit">
              <m.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                src={logoImage}
                alt="Ascope Tech"
                className="h-12 md:h-14 w-auto object-contain saturate-150 contrast-125 brightness-110 drop-shadow-md"
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-300 font-normal">
              CareerAI is a premium AI-powered career mentor platform guiding you with personalized resume analysis, interactive mock interviews, study roadmaps, and targeted job recommendations.
            </p>
            
            {/* Email Contact Links */}
            <div className="flex flex-col gap-2 pt-2 text-xs">
              <m.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 hover:border-primary-500 px-3 py-2 rounded-lg text-slate-100 font-medium transition-colors shadow-xs"
              >
                <Mail className="h-4 w-4 text-primary-400 shrink-0" />
                <a href="mailto:support@ascopetech.in" className="hover:text-primary-300 transition-colors font-semibold">
                  support@ascopetech.in
                </a>
              </m.div>
              <m.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 hover:border-primary-500 px-3 py-2 rounded-lg text-slate-100 font-medium transition-colors shadow-xs"
              >
                <Mail className="h-4 w-4 text-primary-400 shrink-0" />
                <a href="mailto:info@ascopetech.in" className="hover:text-primary-300 transition-colors font-semibold">
                  info@ascopetech.in
                </a>
              </m.div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  render: () => (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>
                    </svg>
                  )
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com",
                  render: () => (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                },
                {
                  label: "GitHub",
                  href: "https://github.com",
                  render: () => (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                    </svg>
                  )
                },
                {
                  label: "Website",
                  href: "https://ascopetech.in",
                  render: () => <Globe className="h-4 w-4" />
                },
              ].map((item, idx) => (
                <m.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  whileHover={{ y: -3, scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                  className="p-2.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 hover:border-primary-500 hover:bg-primary-600 hover:text-white transition-all shadow-xs"
                >
                  {item.render()}
                </m.a>
              ))}
            </div>
          </m.div>

          {/* Quick Links */}
          <m.div variants={staggerItem} className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Features
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              {[
                { to: "/features", label: "AI Guidance" },
                { to: "/onboarding", label: "Resume Builder" },
                { to: "/features", label: "Interview Prep" },
                { to: "/careers", label: "Learning Path" },
              ].map((link, idx) => (
                <m.div key={idx} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link to={link.to} className="text-slate-300 hover:text-white font-semibold transition-colors block">
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Company Links */}
          <m.div variants={staggerItem} className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Company
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Support" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map((link, idx) => (
                <m.div key={idx} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link to={link.to} className="text-slate-300 hover:text-white font-semibold transition-colors block">
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Newsletter Subscribe */}
          <m.div variants={staggerItem} className="flex flex-col gap-4">
            <h4 className="text-xs font-extrabold uppercase text-white tracking-wider flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
              Newsletter
            </h4>
            <p className="text-xs text-slate-300 font-normal">Subscribe for career growth tips and matching alerts.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed to simulated newsletter!");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Work email"
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors font-medium"
              />
              <Button type="submit" variant="primary" size="sm" className="py-2 shrink-0">
                Join
              </Button>
            </form>
          </m.div>
        </m.div>

        {/* Bottom copyright section */}
        <m.div
          variants={fadeUp}
          className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs relative z-10 text-slate-300 font-medium"
        >
          <p>© {new Date().getFullYear()} Ascope Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <m.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
              <Link to="/privacy" className="hover:text-white font-semibold transition-colors">Privacy Policy</Link>
            </m.div>
            <m.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
              <Link to="/terms" className="hover:text-white font-semibold transition-colors">Terms & Conditions</Link>
            </m.div>
          </div>
        </m.div>
      </m.footer>
    </div>
  );
};
