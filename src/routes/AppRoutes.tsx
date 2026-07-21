import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { Skeleton } from "../components/common/Skeleton";

// Layouts
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { CandidateLayout } from "../layouts/CandidateLayout";
import { AdminLayout } from "../layouts/AdminLayout";

// Lazy Public Pages
const Home = React.lazy(() => import("../pages/public/Home"));
const About = React.lazy(() => import("../pages/public/About"));
const Features = React.lazy(() => import("../pages/public/Features"));
const Careers = React.lazy(() => import("../pages/public/Careers"));
const CareerDetails = React.lazy(() => import("../pages/public/CareerDetails"));
const Jobs = React.lazy(() => import("../pages/public/Jobs"));
const JobDetails = React.lazy(() => import("../pages/public/JobDetails"));
const Contact = React.lazy(() => import("../pages/public/Contact"));
const Privacy = React.lazy(() => import("../pages/public/Privacy"));
const Terms = React.lazy(() => import("../pages/public/Terms"));

// Lazy Auth Pages
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const ForgotPassword = React.lazy(() => import("../pages/auth/ForgotPassword"));

// Lazy Onboarding
const Onboarding = React.lazy(() => import("../pages/onboarding/Onboarding"));

// Lazy Candidate Dashboard Pages
const CandidateDashboard = React.lazy(() => import("../pages/candidate/Dashboard"));
const CandidateProfile = React.lazy(() => import("../pages/candidate/Profile"));
const CandidateAssessment = React.lazy(() => import("../pages/candidate/Assessment"));
const CandidateAssessmentResult = React.lazy(() => import("../pages/candidate/AssessmentResult"));
const CandidateCareers = React.lazy(() => import("../pages/candidate/Careers"));
const CandidateResumes = React.lazy(() => import("../pages/candidate/Resumes"));
const CandidateResumeCreate = React.lazy(() => import("../pages/candidate/ResumeCreate"));
const CandidateResumeEdit = React.lazy(() => import("../pages/candidate/ResumeEdit"));
const CandidateResumeAnalyzer = React.lazy(() => import("../pages/candidate/ResumeAnalyzer"));
const CandidateInterviews = React.lazy(() => import("../pages/candidate/Interviews"));
const CandidateInterviewSetup = React.lazy(() => import("../pages/candidate/InterviewSetup"));
const CandidateInterviewSession = React.lazy(() => import("../pages/candidate/InterviewSession"));
const CandidateInterviewReport = React.lazy(() => import("../pages/candidate/InterviewReport"));
const CandidateRoadmap = React.lazy(() => import("../pages/candidate/Roadmap"));
const CandidateSkills = React.lazy(() => import("../pages/candidate/Skills"));
const CandidateJobs = React.lazy(() => import("../pages/candidate/Jobs"));
const CandidateSavedJobs = React.lazy(() => import("../pages/candidate/SavedJobs"));
const CandidateApplications = React.lazy(() => import("../pages/candidate/Applications"));
const CandidateAssistant = React.lazy(() => import("../pages/candidate/Assistant"));
const CandidateNotifications = React.lazy(() => import("../pages/candidate/Notifications"));
const CandidateSettings = React.lazy(() => import("../pages/candidate/Settings"));

// Lazy Admin Dashboard Pages
const AdminDashboard = React.lazy(() => import("../pages/admin/Dashboard"));
const AdminUsers = React.lazy(() => import("../pages/admin/Users"));
const AdminCandidates = React.lazy(() => import("../pages/admin/Candidates"));
const AdminMentors = React.lazy(() => import("../pages/admin/Mentors"));
const AdminCareers = React.lazy(() => import("../pages/admin/Careers"));
const AdminSkills = React.lazy(() => import("../pages/admin/Skills"));
const AdminAssessments = React.lazy(() => import("../pages/admin/Assessments"));
const AdminJobs = React.lazy(() => import("../pages/admin/Jobs"));
const AdminCompanies = React.lazy(() => import("../pages/admin/Companies"));
const AdminApplications = React.lazy(() => import("../pages/admin/Applications"));
const AdminContactMessages = React.lazy(() => import("../pages/admin/ContactMessages"));
const AdminReports = React.lazy(() => import("../pages/admin/Reports"));
const AdminSettings = React.lazy(() => import("../pages/admin/Settings"));

const NotFound = React.lazy(() => import("../pages/errors/NotFound"));

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
