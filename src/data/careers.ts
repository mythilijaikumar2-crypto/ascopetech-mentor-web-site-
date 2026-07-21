export interface CareerPath {
  id: string;
  title: string;
  category: string;
  description: string;
  demand: "High" | "Medium" | "Low";
  growthRate: string;
  salaryRange: {
    min: string;
    max: string;
    avg: string;
  };
  skillsRequired: string[];
  descriptionFull: string;
  pros: string[];
  cons: string[];
  learningTime: string;
}

export const careerCategories = [
  "Software Development",
  "Data and AI",
  "UI/UX Design",
  "Digital Marketing",
  "Business Management",
  "Finance",
  "Human Resources",
  "Sales"
];

export const mockCareers: CareerPath[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Software Development",
    description: "Design and implement beautiful, responsive, and performance-optimized web interfaces using modern frameworks.",
    demand: "High",
    growthRate: "+22% YoY",
    salaryRange: {
      min: "$70,000",
      max: "$145,000",
      avg: "$105,000"
    },
    skillsRequired: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Git"],
    descriptionFull: "Frontend Developers are responsible for the user-facing part of web applications. They collaborate with UI/UX designers to translate wireframes into interactive digital interfaces, ensuring pixel-perfect layout, cross-browser compatibility, and top-tier loading speeds.",
    pros: ["Highly creative work", "Immediate visual feedback", "Massive global job demand", "Rich ecosystem of tools"],
    cons: ["Rapidly changing technology landscape", "Cross-browser compatibility quirks", "Optimization challenges on low-end devices"],
    learningTime: "6 - 9 Months"
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Development",
    description: "Architect secure, scalable, and high-performance server logic, database structures, and integration systems.",
    demand: "High",
    growthRate: "+18% YoY",
    salaryRange: {
      min: "$75,000",
      max: "$160,000",
      avg: "$115,000"
    },
    skillsRequired: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "Docker"],
    descriptionFull: "Backend Developers construct the foundational server infrastructure that powers modern applications. They focus on databases, data communication protocol architectures, secure user storage, authorization schemes, and computational heavy-lifting.",
    pros: ["Focus on logic and architecture", "Relatively stable technology core", "Crucial component of any digital product"],
    cons: ["No direct visual outputs", "High stakes for security/data breaches", "On-call debugging for system crashes"],
    learningTime: "8 - 12 Months"
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data and AI",
    description: "Analyze large, complex datasets to build machine learning models and extract game-changing business insights.",
    demand: "High",
    growthRate: "+25% YoY",
    salaryRange: {
      min: "$85,000",
      max: "$180,000",
      avg: "$130,000"
    },
    skillsRequired: ["Python", "SQL", "Pandas", "Scikit-Learn", "TensorFlow", "Statistics", "Data Visualization", "Jupyter"],
    descriptionFull: "Data Scientists leverage mathematics, programming, and data engineering pipelines to extract valuable insights and build intelligent prediction engines. They clean messy raw data, build machine learning models, and communicate findings to executives.",
    pros: ["Extremely high earning potential", "Work on cutting-edge AI problems", "Strong influence on business strategies"],
    cons: ["Requires strong mathematical foundation", "A lot of time spent cleansing messy data", "High barrier to entry (often requires graduate degree)"],
    learningTime: "12 - 18 Months"
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "UI/UX Design",
    description: "Conduct user research, design wireframes, and draft modern aesthetic interfaces for web and mobile platforms.",
    demand: "High",
    growthRate: "+15% YoY",
    salaryRange: {
      min: "$60,000",
      max: "$135,000",
      avg: "$95,000"
    },
    skillsRequired: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems", "Typography", "Color Theory", "Interaction Design"],
    descriptionFull: "UI/UX Designers balance beauty and utility. They conduct extensive user interviews, design conceptual interactive flows, construct wireframes, and detail production-ready design libraries to create products that are beautiful and intuitive to navigate.",
    pros: ["Direct impact on user satisfaction", "Blend of artistic expression and problem-solving", "Highly creative environment"],
    cons: ["Subjective feedback from clients/managers", "Hard to quantify direct impact of layouts", "Need to balance aesthetics with dev capabilities"],
    learningTime: "4 - 8 Months"
  },
  {
    id: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    category: "Digital Marketing",
    description: "Launch advertising campaigns, optimize SEO structures, and analyze social content performance to grow audiences.",
    demand: "Medium",
    growthRate: "+10% YoY",
    salaryRange: {
      min: "$50,000",
      max: "$110,000",
      avg: "$78,000"
    },
    skillsRequired: ["SEO", "Google Analytics", "Social Media Ads", "Copywriting", "Email Marketing", "A/B Testing", "Content Strategy"],
    descriptionFull: "Digital Marketing Specialists manage a brand's web footprint. They draft campaign copy, manage media budgets, analyze click conversion channels, optimize landing pages for search engines, and target specific demographies to scale business operations.",
    pros: ["Fast-paced and dynamic", "Numbers-driven and measurable outputs", "Diverse paths (creative copy vs. analytical search ads)"],
    cons: ["Constantly changing search/social algorithms", "Ad spend pressure and budget stress", "Highly competitive market space"],
    learningTime: "3 - 6 Months"
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business Management",
    description: "Define product roadmaps, coordinate cross-functional engineering teams, and drive product success from vision to launch.",
    demand: "High",
    growthRate: "+16% YoY",
    salaryRange: {
      min: "$90,000",
      max: "$195,000",
      avg: "$140,000"
    },
    skillsRequired: ["Agile/Scrum", "Product Roadmap", "User Personas", "Market Research", "Jira", "SQL", "Stakeholder Management"],
    descriptionFull: "Product Managers stand at the intersection of business, design, and engineering. They translate customer pain points into software development backlogs, draft visual strategies, prioritize feature tasks, and drive cross-functional engineering execution.",
    pros: ["High ownership and visibility", "Central hub of product launch decisions", "Diverse everyday tasks"],
    cons: ["Responsibility without direct authority over devs", "High stress during release deadlines", "Constantly balancing conflicting stakeholders"],
    learningTime: "9 - 15 Months"
  }
];
