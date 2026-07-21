import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Skeleton } from "../components/common/Skeleton";

// Layouts
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { CandidateLayout } from "../layouts/CandidateLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Universal Lazy Loader Helper supporting both Default & Named Exports
const lazyLoad = (factory: () => Promise<any>, exportName?: string) =>
  React.lazy(() =>
    factory().then((module) => {
      const component = exportName
        ? module[exportName]
        : module.default || module[Object.keys(module)[0]];
      return { default: component };
    })
  );

// Lazy Public Pages
const Home = lazyLoad(() => import("../pages/public/Home"), "Home");
const About = lazyLoad(() => import("../pages/public/About"), "About");
const Features = lazyLoad(() => import("../pages/public/Features"), "Features");
const Careers = lazyLoad(() => import("../pages/public/Careers"), "Careers");
const CareerDetails = lazyLoad(() => import("../pages/public/CareerDetails"), "CareerDetails");
const Jobs = lazyLoad(() => import("../pages/public/Jobs"), "Jobs");
const JobDetails = lazyLoad(() => import("../pages/public/JobDetails"), "JobDetails");
const Contact = lazyLoad(() => import("../pages/public/Contact"), "Contact");
const Privacy = lazyLoad(() => import("../pages/public/Privacy"), "Privacy");
const Terms = lazyLoad(() => import("../pages/public/Terms"), "Terms");

// Lazy Auth Pages
const Login = lazyLoad(() => import("../pages/auth/Login"), "Login");
const Register = lazyLoad(() => import("../pages/auth/Register"), "Register");
const ForgotPassword = lazyLoad(() => import("../pages/auth/ForgotPassword"), "ForgotPassword");

// Lazy Onboarding
const Onboarding = lazyLoad(() => import("../pages/onboarding/Onboarding"), "Onboarding");

// Lazy Candidate Dashboard Pages
const CandidateDashboard = lazyLoad(() => import("../pages/candidate/Dashboard"), "Dashboard");
const CandidateProfile = lazyLoad(() => import("../pages/candidate/Profile"), "Profile");
const CandidateAssessment = lazyLoad(() => import("../pages/candidate/Assessment"), "Assessment");
const CandidateAssessmentResult = lazyLoad(() => import("../pages/candidate/AssessmentResult"), "AssessmentResult");
const CandidateCareers = lazyLoad(() => import("../pages/candidate/Careers"), "Careers");
const CandidateResumes = lazyLoad(() => import("../pages/candidate/Resumes"), "Resumes");
const CandidateResumeCreate = lazyLoad(() => import("../pages/candidate/ResumeCreate"), "ResumeCreate");
const CandidateResumeEdit = lazyLoad(() => import("../pages/candidate/ResumeEdit"), "ResumeEdit");
const CandidateResumeAnalyzer = lazyLoad(() => import("../pages/candidate/ResumeAnalyzer"), "ResumeAnalyzer");
const CandidateInterviews = lazyLoad(() => import("../pages/candidate/Interviews"), "Interviews");
const CandidateInterviewSetup = lazyLoad(() => import("../pages/candidate/InterviewSetup"), "InterviewSetup");
const CandidateInterviewSession = lazyLoad(() => import("../pages/candidate/InterviewSession"), "InterviewSession");
const CandidateInterviewReport = lazyLoad(() => import("../pages/candidate/InterviewReport"), "InterviewReport");
const CandidateRoadmap = lazyLoad(() => import("../pages/candidate/Roadmap"), "Roadmap");
const CandidateSkills = lazyLoad(() => import("../pages/candidate/Skills"), "Skills");
const CandidateJobs = lazyLoad(() => import("../pages/candidate/Jobs"), "Jobs");
const CandidateSavedJobs = lazyLoad(() => import("../pages/candidate/SavedJobs"), "SavedJobs");
const CandidateApplications = lazyLoad(() => import("../pages/candidate/Applications"), "Applications");
const CandidateAssistant = lazyLoad(() => import("../pages/candidate/Assistant"), "Assistant");
const CandidateNotifications = lazyLoad(() => import("../pages/candidate/Notifications"), "Notifications");
const CandidateSettings = lazyLoad(() => import("../pages/candidate/Settings"), "Settings");

// Lazy Admin Dashboard Pages
const AdminDashboard = lazyLoad(() => import("../pages/admin/Dashboard"), "Dashboard");
const AdminUsers = lazyLoad(() => import("../pages/admin/Users"), "Users");
const AdminCandidates = lazyLoad(() => import("../pages/admin/Candidates"), "Candidates");
const AdminMentors = lazyLoad(() => import("../pages/admin/Mentors"), "Mentors");
const AdminCareers = lazyLoad(() => import("../pages/admin/Careers"), "Careers");
const AdminSkills = lazyLoad(() => import("../pages/admin/Skills"), "Skills");
const AdminAssessments = lazyLoad(() => import("../pages/admin/Assessments"), "Assessments");
const AdminJobs = lazyLoad(() => import("../pages/admin/Jobs"), "Jobs");
const AdminCompanies = lazyLoad(() => import("../pages/admin/Companies"), "Companies");
const AdminApplications = lazyLoad(() => import("../pages/admin/Applications"), "Applications");
const AdminContactMessages = lazyLoad(() => import("../pages/admin/ContactMessages"), "ContactMessages");
const AdminReports = lazyLoad(() => import("../pages/admin/Reports"), "Reports");
const AdminSettings = lazyLoad(() => import("../pages/admin/Settings"), "Settings");

const NotFound = lazyLoad(() => import("../pages/errors/NotFound"), "NotFound");

// Helper Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="w-full flex flex-col gap-4 p-8">
    <Skeleton variant="rectangular" className="h-10 w-1/3" />
    <Skeleton variant="rectangular" className="h-64 w-full" />
    <div className="flex gap-4">
      <Skeleton variant="rectangular" className="h-12 flex-1" />
      <Skeleton variant="rectangular" className="h-12 flex-1" />
      <Skeleton variant="rectangular" className="h-12 flex-1" />
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:careerId" element={<CareerDetails />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:jobId" element={<JobDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Onboarding Route */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Candidate Dashboard Routes */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute allowedRole="candidate">
              <CandidateLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/candidate/dashboard" replace />} />
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="profile" element={<CandidateProfile />} />
          <Route path="assessment" element={<CandidateAssessment />} />
          <Route path="assessment/result" element={<CandidateAssessmentResult />} />
          <Route path="careers" element={<CandidateCareers />} />
          <Route path="resumes" element={<CandidateResumes />} />
          <Route path="resumes/create" element={<CandidateResumeCreate />} />
          <Route path="resumes/:resumeId/edit" element={<CandidateResumeEdit />} />
          <Route path="resume-analyzer" element={<CandidateResumeAnalyzer />} />
          <Route path="interviews" element={<CandidateInterviews />} />
          <Route path="interviews/setup" element={<CandidateInterviewSetup />} />
          <Route path="interviews/session/:sessionId" element={<CandidateInterviewSession />} />
          <Route path="interviews/report/:sessionId" element={<CandidateInterviewReport />} />
          <Route path="roadmap" element={<CandidateRoadmap />} />
          <Route path="skills" element={<CandidateSkills />} />
          <Route path="jobs" element={<CandidateJobs />} />
          <Route path="saved-jobs" element={<CandidateSavedJobs />} />
          <Route path="applications" element={<CandidateApplications />} />
          <Route path="assistant" element={<CandidateAssistant />} />
          <Route path="notifications" element={<CandidateNotifications />} />
          <Route path="settings" element={<CandidateSettings />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="candidates" element={<AdminCandidates />} />
          <Route path="mentors" element={<AdminMentors />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="assessments" element={<AdminAssessments />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="contact-messages" element={<AdminContactMessages />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
