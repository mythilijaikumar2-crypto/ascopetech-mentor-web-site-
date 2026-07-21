import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore } from "../../store/profileStore";
import { useResumeStore } from "../../store/resumeStore";
import { useInterviewStore } from "../../store/interviewStore";
import { useRoadmapStore } from "../../store/roadmapStore";
import { useJobStore } from "../../store/jobStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { CircularProgress } from "../../components/common/CircularProgress";
import { m } from "framer-motion";
import { staggerContainer, staggerItem } from "../../animations/variants";
import { mockActivities } from "../../data/dashboard";
import { mockCareers } from "../../data/careers";
import {
  Sparkles,
  Target,
  FileText,
  MessageSquare,
  Map,
  Briefcase,
  Compass,
  ArrowRight,
  ClipboardList,
  Zap,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from "recharts";

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { onboarding, selectedGoal } = useProfileStore();
  const { resumes } = useResumeStore();
  const { sessions } = useInterviewStore();
  const { completedTasks, activeRoadmap } = useRoadmapStore();
  const { applications } = useJobStore();
  const navigate = useNavigate();

  // Find selected career details
  const career = mockCareers.find((c) => c.id === selectedGoal) || mockCareers[0];

  // Dynamic statistics
  const profileCompletion = onboarding?.onboardingCompleted ? 100 : 85;
  const targetGoalText = selectedGoal ? career.title : "Frontend Engineer";
  const resumeCount = resumes.length;
  const bestResumeScore = resumes.reduce((max, r) => (r.score > max ? r.score : max), 0) || 82;
  const interviewsCount = sessions.length;
  const bestInterviewScore = sessions.reduce((max, s) => (s.score && s.score > max ? s.score : max), 0) || 78;

  // Radar chart data
  const skillChartData = [
    { subject: "React/JS", A: 85, B: 90 },
    { subject: "HTML/CSS", A: 90, B: 95 },
    { subject: "TypeScript", A: 65, B: 85 },
    { subject: "State/Stores", A: 80, B: 85 },
    { subject: "Performance", A: 55, B: 80 },
    { subject: "Testing/Git", A: 75, B: 80 }
  ];

  const totalRoadmapTasks = activeRoadmap
    ? activeRoadmap.stages.reduce((sum, s) => sum + s.modules.reduce((mSum, m) => mSum + m.tasks.length, 0), 0)
    : 11;
  const completedRoadmapCount = completedTasks.length || 3;
  const roadmapProgressPercentage = Math.round((completedRoadmapCount / totalRoadmapTasks) * 100) || 27;

  const quickActions = [
    { label: "Take Career Quiz", icon: Compass, path: "/candidate/assessment", color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40" },
    { label: "Optimize Resume", icon: FileText, path: "/candidate/resume-analyzer", color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/40" },
    { label: "Practice Interview", icon: MessageSquare, path: "/candidate/interviews/setup", color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40" },
    { label: "Study Roadmap", icon: Map, path: "/candidate/roadmap", color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* AI Readiness Banner */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-primary-600 via-indigo-600 to-brand-600 text-white rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase max-w-fit">
              <Zap className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
              AI Insights Generated
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight">
              Ready for {targetGoalText} applications
            </h2>
            <p className="text-xs md:text-sm text-indigo-100 leading-relaxed">
              Your ATS resume score is at <strong className="text-white">{bestResumeScore}%</strong>. Completing 2 state management modules in your roadmap will increase job match chance by 18%.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <CircularProgress value={78} size={90} strokeWidth={7} label="READINESS" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-white">Target Match</span>
              <span className="text-[10px] text-indigo-200">Tier: Mid-Senior</span>
              <Button size="sm" variant="secondary" className="mt-1 text-xs" onClick={() => navigate("/candidate/jobs")}>
                View Jobs
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Stat Widgets */}
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "Profile Completion", value: `${profileCompletion}%`, change: "Onboarding verified", icon: Sparkles, color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60" },
          { label: "Career Goal", value: targetGoalText, change: selectedGoal ? "Target active" : "Target active", icon: Target, color: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60" },
          { label: "Resume ATS Score", value: `${bestResumeScore}%`, change: resumeCount > 0 ? `${resumeCount} CVs created` : "1 CV analyzed", icon: FileText, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60" },
          { label: "Interviews Graded", value: interviewsCount || "3", change: `Best Score: ${bestInterviewScore}%`, icon: MessageSquare, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60" }
        ].map((stat, i) => (
          <m.div key={i} variants={staggerItem}>
            <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center justify-between h-full">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{stat.label}</span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-tight">{stat.value}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{stat.change}</span>
              </div>
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </Card>
          </m.div>
        ))}
      </m.div>

      {/* Analytics Charts & Roadmap */}
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Radar Skills Match chart */}
        <m.div variants={staggerItem} className="lg:col-span-7 h-full">
          <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-6 h-full">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Skill Matrix Match Analysis</h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Comparing candidate skill points against benchmark requirements for {career.title}.</p>
            </div>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillChartData}>
                  <PolarGrid stroke="#334155" opacity={0.3} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 8 }} />
                  <Radar name="Candidate Level" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                  <Radar name="Target Requirement" dataKey="B" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </m.div>

        {/* Study Roadmap Widget */}
        <m.div variants={staggerItem} className="lg:col-span-5 h-full">
          <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between gap-6 h-full">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Weekly Training Milestone</h3>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Track and finish tasks in your personalized training plan.</p>
            </div>

            <div className="flex flex-col gap-4 my-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Completion Index</span>
                <span className="font-extrabold text-primary-600 dark:text-primary-400">{roadmapProgressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-600 to-brand-500 rounded-full transition-all duration-500" style={{ width: `${roadmapProgressPercentage}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                You completed <strong className="text-slate-700 dark:text-slate-200">{completedRoadmapCount} of {totalRoadmapTasks}</strong> tasks. Finish the state management module to maintain week 4 milestone pace.
              </p>
            </div>

            <Link to="/candidate/roadmap">
              <Button variant="outline" className="w-full justify-center text-xs font-semibold py-2.5" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue Roadmap
              </Button>
            </Link>
          </Card>
        </m.div>
      </m.div>

      {/* Quick Action & Activity Feeds */}
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Quick Operations */}
        <m.div variants={staggerItem} className="lg:col-span-4 h-full">
          <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-5 h-full">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Quick Operations</h3>
            <div className="flex flex-col gap-2.5">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => navigate(action.path)}
                    className={`w-full p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 text-left text-xs font-bold transition-all flex items-center justify-between group ${action.color}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      {action.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 translate-x-1.5 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </m.div>

        {/* Activity Stream */}
        <m.div variants={staggerItem} className="lg:col-span-8 h-full">
          <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-5 h-full">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Recent Activity Stream</h3>
            <div className="flex flex-col gap-4">
              {mockActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3.5 text-xs text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-slate-800/60 pb-3 last:border-b-0 last:pb-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    act.category === "resume" ? "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400" :
                    act.category === "interview" ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" :
                    act.category === "learning" ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                  }`}>
                    {act.category === "resume" && <FileText className="h-4 w-4" />}
                    {act.category === "interview" && <MessageSquare className="h-4 w-4" />}
                    {act.category === "learning" && <Map className="h-4 w-4" />}
                    {act.category === "system" && <ClipboardList className="h-4 w-4" />}
                    {act.category === "job" && <Briefcase className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.8">
                    <p className="font-semibold text-slate-700 dark:text-slate-200 leading-normal">{act.title}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </m.div>
      </m.div>
    </div>
  );
};

export default Dashboard;
