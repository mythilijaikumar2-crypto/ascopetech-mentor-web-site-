export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string; // Tailwind bg color or company symbol
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: "Entry-level" | "Mid-level" | "Senior-level";
  salary: string;
  remote: "Remote" | "Hybrid" | "On-site";
  category: string;
  skills: string[];
  description: string;
  matchPercentage: number;
  datePosted: string;
}

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Junior Frontend Engineer",
    company: "TechVibe Global",
    logo: "bg-indigo-600 text-white",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Entry-level",
    salary: "$80,000 - $95,000",
    remote: "Hybrid",
    category: "Software Development",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Git"],
    description: "Join our core UI engineering team. You will be building responsive pages, fixing component layouts, and collaborating with UX designers using Figma wireframes.",
    matchPercentage: 92,
    datePosted: "2 days ago"
  },
  {
    id: "job-2",
    title: "React Web Architect",
    company: "SaaSify Inc.",
    logo: "bg-violet-600 text-white",
    location: "Austin, TX",
    type: "Full-time",
    experience: "Senior-level",
    salary: "$140,000 - $165,000",
    remote: "Remote",
    category: "Software Development",
    skills: ["TypeScript", "React", "Tailwind CSS", "Framer Motion", "Vite"],
    description: "Lead the migration of our enterprise application to a micro-frontend architecture. Set up clean coding standards, optimize LCP loading times, and maintain our design system.",
    matchPercentage: 98,
    datePosted: "1 day ago"
  },
  {
    id: "job-3",
    title: "Data Scientist (NLP & LLMs)",
    company: "CognitiveAI Labs",
    logo: "bg-emerald-600 text-white",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$120,000 - $145,000",
    remote: "On-site",
    category: "Data and AI",
    skills: ["Python", "SQL", "Pandas", "Scikit-Learn", "TensorFlow"],
    description: "Develop NLP models and work with Large Language Models (LLMs) to build intelligent summarization and automation agents for corporate clients.",
    matchPercentage: 85,
    datePosted: "3 days ago"
  },
  {
    id: "job-4",
    title: "UI/UX Interaction Designer",
    company: "PixelPerfect Co.",
    logo: "bg-amber-600 text-white",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$90,000 - $110,000",
    remote: "Remote",
    category: "UI/UX Design",
    skills: ["Figma", "User Research", "Wireframing", "Interaction Design"],
    description: "Own user research and design wireframes for our next-gen mobile application. Build robust prototypes and conduct usability testing.",
    matchPercentage: 88,
    datePosted: "4 days ago"
  },
  {
    id: "job-5",
    title: "Growth Marketing Specialist",
    company: "BrandBoost Media",
    logo: "bg-rose-600 text-white",
    location: "Los Angeles, CA",
    type: "Contract",
    experience: "Mid-level",
    salary: "$60 - $80 / hour",
    remote: "Remote",
    category: "Digital Marketing",
    skills: ["SEO", "Google Analytics", "Social Media Ads", "A/B Testing"],
    description: "Drive traffic and optimize paid search channels. Coordinate landing page audits, email drip systems, and keyword campaigns to scale active client acquisition.",
    matchPercentage: 78,
    datePosted: "1 week ago"
  },
  {
    id: "job-6",
    title: "Node.js Platform Developer",
    company: "CloudCore Systems",
    logo: "bg-cyan-600 text-white",
    location: "Chicago, IL",
    type: "Full-time",
    experience: "Mid-level",
    salary: "$110,000 - $130,000",
    remote: "Hybrid",
    category: "Software Development",
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Docker"],
    description: "Architect security schemes, user sessions, and database indices. Scale API responsiveness and build reliable third-party SaaS integrations.",
    matchPercentage: 80,
    datePosted: "5 days ago"
  },
  {
    id: "job-7",
    title: "Lead Product Manager",
    company: "NextGen Software",
    logo: "bg-fuchsia-600 text-white",
    location: "Boston, MA",
    type: "Full-time",
    experience: "Senior-level",
    salary: "$150,000 - $180,000",
    remote: "On-site",
    category: "Business Management",
    skills: ["Agile/Scrum", "Product Roadmap", "Stakeholder Management", "Jira"],
    description: "Direct product scope and release pipelines. Align engineering capabilities, sales feedback, and design layouts into a unified roadmap.",
    matchPercentage: 90,
    datePosted: "Today"
  }
];
