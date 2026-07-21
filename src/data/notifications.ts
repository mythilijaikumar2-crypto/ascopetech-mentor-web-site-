export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning";
}

export const mockNotifications: NotificationItem[] = [
  {
    id: "not-1",
    title: "Resume Analysis Finished",
    content: "Your uploaded resume has been analyzed against the Frontend Developer role. You scored an 82% ATS rating.",
    timestamp: "2 hours ago",
    read: false,
    type: "success"
  },
  {
    id: "not-2",
    title: "New Job Match Available",
    content: "TechVibe Global is hiring a Junior Frontend Engineer that matches 92% of your skill profile.",
    timestamp: "1 day ago",
    read: false,
    type: "info"
  },
  {
    id: "not-3",
    title: "Roadmap Milestones",
    content: "Don't forget to complete your React component design module to keep up with your weekly study target.",
    timestamp: "3 days ago",
    read: true,
    type: "warning"
  }
];
