export interface InterviewQuestion {
  id: string;
  roleId: string; // matches career id e.g. 'frontend-developer'
  type: "Technical" | "HR";
  question: string;
  suggestedPoints: string[];
  sampleAnswer: string;
}

export const mockInterviewQuestions: InterviewQuestion[] = [
  {
    id: "fq-1",
    roleId: "frontend-developer",
    type: "Technical",
    question: "Explain the virtual DOM concept in React and how it differs from the real DOM.",
    suggestedPoints: [
      "Virtual DOM is an in-memory representation of the real DOM elements.",
      "React updates the VDOM first, then differences are calculated (reconciliation/diffing).",
      "Updates are batched and applied to the real DOM in a single pass (repaint optimization).",
      "Improves rendering performance by avoiding direct, heavy writes to the browser DOM."
    ],
    sampleAnswer: "The virtual DOM (VDOM) is a lightweight programming concept where a 'virtual' representation of the UI is kept in memory and synced with the 'real' DOM by a library such as ReactDOM. When a component's state changes, React creates a new VDOM tree and compares it with the previous one. Using a diffing algorithm, React identifies exactly which nodes changed and batches updates to the real DOM, avoiding expensive layout reflows and repaints."
  },
  {
    id: "fq-2",
    roleId: "frontend-developer",
    type: "Technical",
    question: "How do you optimize a website's Largest Contentful Paint (LCP) score?",
    suggestedPoints: [
      "Optimize images using modern formats (WebP, AVIF) and correct sizing.",
      "Assign high priority using 'fetchpriority=\"high\"' to the main hero image.",
      "Remove or defer render-blocking JavaScript and CSS.",
      "Utilize preloading for critical resources.",
      "Implement server-side rendering or static generation."
    ],
    sampleAnswer: "To optimize LCP, I first locate the LCP element (typically a hero image or large text block). If it is an image, I compress it to WebP/AVIF format, add fetchpriority='high', and avoid lazy-loading it. I also defer non-critical JS/CSS, preload critical fonts, optimize server response times, and use a CDN to cache assets closer to the user."
  },
  {
    id: "fq-3",
    roleId: "frontend-developer",
    type: "HR",
    question: "How do you handle disagreements with a UI/UX designer regarding a feature layout?",
    suggestedPoints: [
      "Communicate with empathy, respect, and clear visual evidence.",
      "Discuss implementation tradeoffs, loading times, and technical constraints.",
      "Focus on the user experience rather than personal opinions.",
      "Suggest rapid prototyping or A/B testing as unbiased arbiters."
    ],
    sampleAnswer: "When I disagree with a designer, I schedule a brief call to talk through our perspectives. I explain any technical limits, like layout shifts or performance impacts on mobile devices. I present alternatives that maintain their design intent but are faster to build or load. If we are stuck, I suggest building a quick interactive prototype or running a quick user test to gather objective data."
  },
  {
    id: "bq-1",
    roleId: "backend-developer",
    type: "Technical",
    question: "What is database indexing and how does it speed up queries? Are there any drawbacks?",
    suggestedPoints: [
      "Indexes are data structures (like B-Trees) that allow fast data lookup.",
      "Avoids full table scans by pointing directly to data rows.",
      "Drawbacks include slower write operations (INSERT, UPDATE, DELETE) because indexes must update.",
      "Consumes additional disk space."
    ],
    sampleAnswer: "Database indexing creates a search-optimized data structure (commonly a B-Tree) on specific columns. Instead of scanning every row, the database engine searches the index to point to row locations. While it speeds up SELECT queries, indexes slow down write operations (INSERT, UPDATE, DELETE) because the index must rebuild, and they also occupy extra storage space."
  },
  {
    id: "dq-1",
    roleId: "data-scientist",
    type: "Technical",
    question: "What is overfitting in machine learning and how do you prevent it?",
    suggestedPoints: [
      "Overfitting occurs when a model learns noise in training data too well, failing to generalize to new data.",
      "Prevent using cross-validation (e.g., K-Fold).",
      "Apply regularization techniques (L1 Lasso, L2 Ridge).",
      "Reduce model complexity or prune decision trees.",
      "Gather more training data or perform feature selection."
    ],
    sampleAnswer: "Overfitting happens when a machine learning model is overly complex and learns random noise in the training set instead of the underlying pattern, resulting in poor generalizability to validation data. I prevent it by using cross-validation, applying L1/L2 regularization to penalize large weights, pruning trees, simplifying model layers, or collecting more training data."
  }
];
