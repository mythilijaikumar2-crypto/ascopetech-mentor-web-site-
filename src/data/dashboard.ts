export interface DashboardStat {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  type: "score" | "percentage" | "count" | "currency";
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  category: "resume" | "interview" | "learning" | "job" | "system";
}

export const mockDashboardStats: DashboardStat[] = [
  { label: "Profile Completion", value: "85%", change: "+10% this week", isPositive: true, type: "percentage" },
  { label: "Career Readiness", value: "78/100", change: "+5 points", isPositive: true, type: "score" },
  { label: "Resume ATS Score", value: "82", change: "Updated yesterday", isPositive: true, type: "score" },
  { label: "Mock Interviews Completed", value: "3", change: "Next scheduled tomorrow", isPositive: true, type: "count" }
];

export const mockActivities: ActivityItem[] = [
  { id: "act-1", title: "Updated resume 'Frontend Engineer CV'", timestamp: "2 hours ago", category: "resume" },
  { id: "act-2", title: "Completed HTML5 Essentials skill assessment (Score: 100%)", timestamp: "5 hours ago", category: "learning" },
  { id: "act-3", title: "Applied to 'Junior Frontend Engineer' at TechVibe Global", timestamp: "1 day ago", category: "job" },
  { id: "act-4", title: "Completed Junior React Developer Mock Interview (Score: 84%)", timestamp: "2 days ago", category: "interview" },
  { id: "act-5", title: "Selected 'Frontend Developer' as career goal", timestamp: "3 days ago", category: "system" }
];
