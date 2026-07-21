export interface RoadmapTask {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "theory" | "project" | "quiz";
  description?: string;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  tasks: RoadmapTask[];
}

export interface RoadmapStage {
  id: string;
  title: string; // e.g. 'Beginner Stage'
  description: string;
  modules: RoadmapModule[];
}

export interface CareerRoadmap {
  careerId: string;
  durationWeeks: number;
  stages: RoadmapStage[];
}

export const mockRoadmaps: Record<string, CareerRoadmap> = {
  "frontend-developer": {
    careerId: "frontend-developer",
    durationWeeks: 24,
    stages: [
      {
        id: "beginner",
        title: "Beginner Stage",
        description: "Master the foundations of the web: structure, style, and programming basics.",
        modules: [
          {
            id: "m1-foundation",
            title: "Web Foundations (HTML5 & CSS3)",
            description: "Understand semantic markup, document layout structures, and responsive grid layouts.",
            tasks: [
              { id: "t1", title: "Semantic HTML Elements", duration: "3 hours", completed: false, type: "theory", description: "Learn structural tags like <article>, <section>, <header>, and <nav>." },
              { id: "t2", title: "CSS Flexbox & Grid layouts", duration: "5 hours", completed: false, type: "theory", description: "Master 1D and 2D alignment systems for fully responsive UI designs." },
              { id: "t3", title: "Build a Portfolio Site", duration: "10 hours", completed: false, type: "project", description: "Create a modern, responsive page layout showing your bio, skills, and projects." },
              { id: "t4", title: "HTML/CSS Core Assessment", duration: "30 mins", completed: false, type: "quiz" }
            ]
          },
          {
            id: "m2-js-basics",
            title: "JavaScript Programming Core",
            description: "Learn functional JavaScript syntax, DOM manipulation, APIs, and array algorithms.",
            tasks: [
              { id: "t5", title: "JS Control Flow & Data Types", duration: "4 hours", completed: false, type: "theory" },
              { id: "t6", title: "DOM Manipulation & Event Listeners", duration: "6 hours", completed: false, type: "theory" },
              { id: "t7", title: "Interactive Modal Project", duration: "8 hours", completed: false, type: "project", description: "Build a modal overlay with keyboard close capability, focus trapping, and fade-in animations." }
            ]
          }
        ]
      },
      {
        id: "intermediate",
        title: "Intermediate Stage",
        description: "Adopt interactive JavaScript frameworks, application logic, and package tooling.",
        modules: [
          {
            id: "m3-react",
            title: "React JS Library Core",
            description: "Understand state, props, JSX syntax, and modern React hooks.",
            tasks: [
              { id: "t8", title: "Components, JSX & Props", duration: "4 hours", completed: false, type: "theory" },
              { id: "t9", title: "React State & Hooks (useState, useEffect)", duration: "6 hours", completed: false, type: "theory" },
              { id: "t10", title: "Interactive Dashboard Widget", duration: "12 hours", completed: false, type: "project" },
              { id: "t11", title: "React Framework Assessment", duration: "45 mins", completed: false, type: "quiz" }
            ]
          }
        ]
      },
      {
        id: "advanced",
        title: "Advanced Stage",
        description: "Optimize application speed, structure production builds, and learn robust animations.",
        modules: [
          {
            id: "m4-advanced",
            title: "Performance & Micro-animations",
            description: "Master Framer Motion transition setups, LCP speeds, and code splitting.",
            tasks: [
              { id: "t12", title: "Vite Bundling & Route Code Splitting", duration: "5 hours", completed: false, type: "theory" },
              { id: "t13", title: "Framer Motion Custom Animations", duration: "8 hours", completed: false, type: "theory" },
              { id: "t14", title: "Enterprise Resume Builder App", duration: "25 hours", completed: false, type: "project", description: "Construct a complete client application featuring state persistence, multi-stage forms, and interactive layout previewing." }
            ]
          }
        ]
      }
    ]
  }
};
