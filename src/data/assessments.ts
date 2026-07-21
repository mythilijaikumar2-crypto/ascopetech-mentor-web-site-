export interface AssessmentQuestion {
  id: string;
  type: "choice" | "rating" | "boolean";
  category: "interest" | "skills" | "workstyle";
  question: string;
  options?: { value: string; label: string; scoreWeights: Record<string, number> }[];
  minLabel?: string;
  maxLabel?: string;
  scoreWeights?: Record<string, number>; // For rating and boolean questions
}

export const mockAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q-1",
    type: "choice",
    category: "interest",
    question: "When working on a project, which role do you naturally gravitate towards?",
    options: [
      {
        value: "design",
        label: "Drafting the look, layout, colors, and overall feel of the interface",
        scoreWeights: { "ui-ux-designer": 5, "frontend-developer": 2 }
      },
      {
        value: "coding-server",
        label: "Architecting backend database systems, server routines, and APIs",
        scoreWeights: { "backend-developer": 5, "data-scientist": 2 }
      },
      {
        value: "coding-client",
        label: "Coding components, page behaviors, and animations on the screen",
        scoreWeights: { "frontend-developer": 5, "ui-ux-designer": 2 }
      },
      {
        value: "organizing",
        label: "Defining schedules, coordinating teammates, and managing goals",
        scoreWeights: { "product-manager": 5, "digital-marketing-specialist": 2 }
      }
    ]
  },
  {
    id: "q-2",
    type: "rating",
    category: "skills",
    question: "How confident are you in analyzing patterns in data, using numbers, and calculating statistics?",
    minLabel: "Beginner",
    maxLabel: "Expert",
    scoreWeights: { "data-scientist": 4, "backend-developer": 2, "product-manager": 1 }
  },
  {
    id: "q-3",
    type: "choice",
    category: "workstyle",
    question: "A client reports that a feature is confusing to use. What is your immediate reaction?",
    options: [
      {
        value: "research",
        label: "Conduct user testing to understand why they find it confusing and design a clearer flow",
        scoreWeights: { "ui-ux-designer": 5, "product-manager": 3 }
      },
      {
        value: "fix",
        label: "Open the source code immediately and rewrite the interactive layout logic",
        scoreWeights: { "frontend-developer": 5, "backend-developer": 2 }
      },
      {
        value: "market",
        label: "Check if the feature description is misleading and optimize onboarding messages",
        scoreWeights: { "digital-marketing-specialist": 5, "product-manager": 2 }
      }
    ]
  },
  {
    id: "q-4",
    type: "boolean",
    category: "interest",
    question: "Do you enjoy writing copy, analyzing social engagement metrics, or building ad campaigns?",
    scoreWeights: { "digital-marketing-specialist": 5 }
  },
  {
    id: "q-5",
    type: "rating",
    category: "workstyle",
    question: "How comfortable are you working in environments with high ambiguity where requirements change frequently?",
    minLabel: "Prefer Structure",
    maxLabel: "Thrive in Ambiguity",
    scoreWeights: { "product-manager": 4, "frontend-developer": 2, "ui-ux-designer": 2 }
  },
  {
    id: "q-6",
    type: "choice",
    category: "skills",
    question: "What is your level of comfort with writing code?",
    options: [
      {
        value: "none",
        label: "I prefer not to write code and focus on design or business tasks",
        scoreWeights: { "ui-ux-designer": 4, "product-manager": 4, "digital-marketing-specialist": 4 }
      },
      {
        value: "some",
        label: "I can write basic scripts or build simple HTML pages",
        scoreWeights: { "frontend-developer": 2, "ui-ux-designer": 2, "digital-marketing-specialist": 2 }
      },
      {
        value: "advanced",
        label: "I am comfortable building full applications, algorithms, and managing databases",
        scoreWeights: { "frontend-developer": 5, "backend-developer": 5, "data-scientist": 4 }
      }
    ]
  }
];
