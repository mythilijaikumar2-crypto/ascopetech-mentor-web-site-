# Ascope Tech Mentor - AI Career Guidance & Mentor Platform

**Ascope Tech Mentor** is a state-of-the-art, AI-powered career development and mentorship platform designed to help job seekers, students, and professionals transition smoothly into tech careers. From personalized career path discovery to ATS resume optimization, AI-driven mock interviews, and tailored study roadmaps, Ascope Tech Mentor provides an end-to-end guidance system.

---

## 🚀 Key Features Overview

### 1. 🤖 Artificial Intelligence Capabilities (AI Core)

Ascope Tech Mentor leverages artificial intelligence algorithms across 5 core pillars of career growth:

#### A. 🎯 AI Career Assessment & Path Recommendation
- **Interactive Aptitude & Preference Profiling**: Analyzes user work preferences, technical expertise levels, and situational choices.
- **Affinity Scoring Engine**: Matches candidate profile vectors against real-world tech career profiles (Frontend Engineer, Data Scientist, Product Manager, DevOps Specialist, UI/UX Designer, etc.).
- **Readiness Index**: Calculates percentage readiness score and identifies specific missing skill gaps for target roles.

#### B. 📄 AI Resume Analyzer & ATS Scorer
- **ATS Match Score Engine**: Parses resume content and benchmarks it directly against target job descriptions.
- **Keyword & Action-Verb Analysis**: Identifies missing critical technical keywords, soft skills, and formatting red flags.
- **Instant Optimization Suggestions**: Provides actionable recommendations to increase resume visibility in applicant tracking systems.

#### C. 🎙️ AI Mock Interview Trainer
- **Role & Difficulty Tailoring**: Generates role-specific technical and behavioral interview question sets.
- **Real-time Answer Evaluation**: Evaluates candidate responses with AI scoring metrics (0–100 scale), assessing technical accuracy, clarity, and keyword inclusion.
- **Detailed Performance Report**: Provides instant feedback, strengths, areas for improvement, and ideal benchmark answers.

#### D. 🗺️ AI Personalized Study Roadmap
- **Customized Milestone Generation**: Builds structured week-by-week learning roadmaps based on candidate target career goals and missing skill gaps.
- **Interactive Progress Tracking**: Tracks checked milestones, lesson plans, quiz checkpoints, and estimated completion duration.

#### E. 💬 Virtual AI Career Mentor (24/7 Assistant)
- **Real-time Interactive Conversational Assistant**: Answers candidate questions on framework selection, interview preparation strategies, resume tips, and industry trends.

---

### 2. 💼 Candidate Portal Features

- **Interactive Candidate Dashboard**: Real-time overview of readiness scores, active applications, resume ATS match, and recommended jobs.
- **Multi-Template Resume Builder**: Build classic, modern, or creative resumes with live preview and PDF export support.
- **Job Board & Recommendations**: Browse personalized job listings, filter by domain/salary, save favorite jobs, and track application statuses.
- **Skill Assessment & Badging**: Take interactive skill tests to earn badges and showcase domain mastery.
- **Application Kanban Tracker**: Track application states (Saved, Applied, Interviewing, Offered).

---

### 3. 🛡️ Admin Management Portal

- **Analytics & Insights Dashboard**: Monitor user registrations, active candidates, completed interviews, and job application trends.
- **User & Candidate Management**: Manage candidate profiles, role permissions, and user accounts.
- **Job Posting & Application Review**: Create, edit, and publish job vacancies, and manage applicant statuses.
- **Skill & Assessment Management**: Manage skill taxonomies, assessment questions, and benchmark metrics.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Vanilla CSS custom tokens
- **Animations**: Framer Motion (page transitions, micro-interactions, 3D perspective hero interactions)
- **Icons**: Lucide React
- **State Management**: Zustand, React Hooks & Context
- **Routing**: React Router DOM (v6) with lazy-loading code splitting

---

## 📁 Project Directory Structure

```
ascope-mentor/
├── public/                 # Static public assets (favicons, icons)
├── src/
│   ├── animations/         # Framer motion animation variants
│   ├── assets/             # Brand logos, hero images, media files
│   ├── components/         # Reusable UI component library
│   │   ├── animations/     # IntroductionAnimation, loading overlays
│   │   └── common/         # Button, Card, Badge, Modal, Input, Select, Drawer, Skeleton
│   ├── data/               # Mock datasets (careers, jobs, questions, roadmaps, skills)
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # PublicLayout, AuthLayout, CandidateLayout, AdminLayout
│   ├── pages/
│   │   ├── admin/          # Admin portal pages (Dashboard, Users, Jobs, Applications, etc.)
│   │   ├── auth/           # Login, Register, Forgot Password
│   │   ├── candidate/      # Candidate dashboard, Resume Analyzer, Mock Interviews, Roadmap, Jobs
│   │   ├── onboarding/     # Onboarding walkthrough
│   │   └── public/         # Landing Page (Home), Features, About Us, Careers, Contact
│   ├── routes/             # AppRoutes configuration and ProtectedRoute guards
│   ├── services/           # API services (AI analysis engines, resume scoring, interview evaluation)
│   ├── store/              # Global state management stores
│   └── styles/             # Global CSS variables and custom utilities
├── index.html              # Main HTML entry file
├── tailwind.config.js      # Tailwind configuration and design system tokens
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build settings
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mythilijaikumar2-crypto/ascopetech-mentor-web-site-.git
   cd ascopetech-mentor-web-site-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License & Contact

Developed for **Ascope Tech**. All rights reserved.  
- **Website**: [ascopetech.in](https://ascopetech.in)  
- **Support**: support@ascopetech.in  
- **General Inquiry**: info@ascopetech.in  
