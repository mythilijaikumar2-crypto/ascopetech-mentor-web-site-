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
import { m } from "framer-motion";
import { staggerContainer, staggerItem, fadeIn } from "../../animations/variants";
import { mockDashboardStats, mockActivities } from "../../data/dashboard";
import { mockCareers } from "../../data/careers";
import {
  Sparkles,
  Target,
  FileText,
  MessageSquare,
  Map,
  Briefcase,
  TrendingUp,
  Compass,
  ArrowRight,
  ClipboardList
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { onboarding, selectedGoal } = useProfileStore();
  const { resumes } = useResumeStore();
  const { sessions } = useInterviewStore();
  const { completedTasks, activeRoadmap } = useRoadmapStore();
  const { applications, savedJobIds } = useJobStore();
  const navigate = useNavigate();

  // Find selected career details
  const career = mockCareers.find((c) => c.id === selectedGoal) || mockCareers[0];

  // Calculate statistics dynamically based on stores, falling back to mock stats if empty
  const profileCompletion = onboarding?.onboardingCompleted ? 100 : 85;
  const targetGoalText = selectedGoal ? career.title : "Not Selected";
  const resumeCount = resumes.length;
  const bestResumeScore = resumes.reduce((max, r) => (r.score > max ? r.score : max), 0) || 82;
  const interviewsCount = sessions.length;
  const bestInterviewScore = sessions.reduce((max, s) => (s.score && s.score > max ? s.score : max), 0) || 78;

  // Recharts radar chart data representing profile skill levels vs goal required levels
  const skillChartData = [
    { subject: "React/JS", A: 85, B: 90, fullMark: 100 },
    { subject: "HTML/CSS", A: 90, B: 95, fullMark: 100 },
    { subject: "TypeScript", A: 65, B: 85, fullMark: 100 },
    { subject: "State/Stores", A: 80, B: 85, fullMark: 100 },
    { subject: "Performance", A: 55, B: 80, fullMark: 100 },
    { subject: "Testing/Git", A: 75, B: 80, fullMark: 100 }
  ];

  // Study progress stats
  const totalRoadmapTasks = activeRoadmap
    ? activeRoadmap.stages.reduce((sum, s) => sum + s.modules.reduce((mSum, m) => mSum + m.tasks.length, 0), 0)
    : 11;
  const completedRoadmapCount = completedTasks.length || 3;
  const roadmapProgressPercentage = Math.round((completedRoadmapCount / totalRoadmapTasks) * 100) || 27;

  const quickActions = [
    { label: "Take Career Quiz", icon: Compass, path: "/candidate/assessment", color: "bg-indigo-50 text-indigo-650 hover:bg-indigo-100" },
    { label: "Optimize Resume", icon: FileText, path: "/candidate/resumes", color: "bg-violet-50 text-violet-650 hover:bg-violet-100" },
    { label: "Practice Interview", icon: MessageSquare, path: "/candidate/interviews/setup", color: "bg-amber-50 text-amber-650 hover:bg-amber-100" },
    { label: "Study Modules", icon: Map, path: "/candidate/roadmap", color: "bg-emerald-50 text-emerald-650 hover:bg-emerald-100" }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Dashboard Top Widgets Panel */}
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "Profile Completion", value: `${profileCompletion}%`, change: "onboarding verified", icon: Sparkles, color: "text-indigo-600 bg-indigo-50" },
          { label: "Career Goal", value: targetGoalText, change: selectedGoal ? "active target set" : "choose career target", icon: Target, color: "text-violet-600 bg-violet-50" },
          { label: "Resume ATS Rating", value: `${bestResumeScore}%`, change: resumeCount > 0 ? `${resumeCount} CVs built` : "no resume built yet", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
          { label: "Interviews Graded", value: interviewsCount || "3", change: bestInterviewScore ? `Best Score: ${bestInterviewScore}%` : "graded via AI trainer", icon: MessageSquare, color: "text-amber-600 bg-amber-50" }
        ].map((stat, i) => (
          <m.div key={i} variants={staggerItem}>
            <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex items-center justify-between h-full">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{stat.label}</span>
                <span className="text-lg font-extrabold text-slate-900 leading-tight">{stat.value}</span>
                <span className="text-[10px] text-slate-400 font-medium">{stat.change}</span>
              </div>
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </Card>
          </m.div>
        ))}
      </m.div>

      {/* Analytics Charts Panel */}
      <m.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Radar Skills Match chart */}
        <m.div variants={staggerItem} className="lg:col-span-7 h-full">
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-6 h-full">
            <div>
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">Skills Capability Analysis</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Comparing your confidence indices against targets for {career.title}.</p>
            </div>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillChartData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 10, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 8 }} />
                  <Radar name="Your Level" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                  <Radar name="Target Required" dataKey="B" stroke="#9333ea" fill="#9333ea" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </m.div>
 
        {/* Study Roadmap Widget */}
        <m.div variants={staggerItem} className="lg:col-span-5 h-full">
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col justify-between gap-6 h-full">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">Weekly Roadmap Milestones</h3>
              <p className="text-[10px] text-slate-400">Track and finish tasks in your personalized training plan.</p>
            </div>
 
            <div className="flex flex-col gap-4 my-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Roadmap Completion</span>
                <span className="font-extrabold text-primary-650">{roadmapProgressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-600 to-brand-500 rounded-full transition-all duration-500" style={{ width: `${roadmapProgressPercentage}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                You completed <strong className="text-slate-700">{completedRoadmapCount} of {totalRoadmapTasks}</strong> tasks. Complete React component tasks to keep up with your weekly target.
              </p>
            </div>
 
            <Link to="/candidate/roadmap">
              <Button variant="outline" className="w-full justify-center text-xs font-semibold py-2.5" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue Learning
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
        {/* Quick Actions Shortcuts */}
        <m.div variants={staggerItem} className="lg:col-span-4 h-full">
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-5 h-full">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Quick Operations</h3>
            <div className="flex flex-col gap-2.5">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => navigate(action.path)}
                    className={`w-full p-3.5 rounded-xl border border-slate-100 text-left text-xs font-bold transition-all flex items-center justify-between group ${action.color}`}
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
 
        {/* Activity Stream Feed */}
        <m.div variants={staggerItem} className="lg:col-span-8 h-full">
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-5 h-full">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Recent Activity Log</h3>
            <div className="flex flex-col gap-4">
              {mockActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3.5 text-xs text-slate-600 border-b border-slate-50 pb-3 last:border-b-0 last:pb-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    act.category === "resume" ? "bg-violet-50 text-violet-600" :
                    act.category === "interview" ? "bg-amber-50 text-amber-600" :
                    act.category === "learning" ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-655"
                  }`}>
                    {act.category === "resume" && <FileText className="h-4 w-4" />}
                    {act.category === "interview" && <MessageSquare className="h-4 w-4" />}
                    {act.category === "learning" && <Map className="h-4 w-4" />}
                    {act.category === "system" && <ClipboardList className="h-4 w-4" />}
                    {act.category === "job" && <Briefcase className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 flex flex-col gap-0.8">
                    <p className="font-semibold text-slate-700 leading-normal">{act.title}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{act.timestamp}</span>
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
