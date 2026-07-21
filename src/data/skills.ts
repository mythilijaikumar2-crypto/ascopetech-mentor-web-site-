export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface SkillQuiz {
  id: string;
  name: string;
  category: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export const mockSkillQuizzes: SkillQuiz[] = [
  {
    id: "html",
    name: "HTML5 Essentials",
    category: "Technical",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "Which HTML5 element is used to represent self-contained content, like illustrations, diagrams, photos, or code listings?",
        options: ["<section>", "<article>", "<figure>", "<aside>"],
        correctOptionIndex: 2,
        explanation: "The <figure> HTML element represents self-contained content, optionally with a caption (<figcaption>), and is typically referenced as a single unit from the main flow of the document."
      },
      {
        id: 2,
        question: "What is the purpose of the 'alt' attribute on an image element?",
        options: [
          "To specify a high-resolution version of the image",
          "To provide a textual description for screen readers and search engines",
          "To define the alignment of the image relative to text",
          "To display a tooltip overlay when hovering"
        ],
        correctOptionIndex: 1,
        explanation: "The alt attribute provides alternative information for an image if a user for some reason cannot view it (because of slow connection, screen reader utilization, or search engine indexing)."
      }
    ]
  },
  {
    id: "css",
    name: "CSS3 & Responsive Layouts",
    category: "Technical",
    timeLimitMinutes: 5,
    questions: [
      {
        id: 1,
        question: "Which CSS layout feature allows you to control content alignment in both horizontal and vertical directions simultaneously (two-dimensional)?",
        options: ["Flexbox", "Grid Layout", "Float alignment", "Absolute positioning"],
        correctOptionIndex: 1,
        explanation: "CSS Grid Layout is a two-dimensional layout system, allowing you to align items in columns and rows. Flexbox is primarily one-dimensional."
      },
      {
        id: 2,
        question: "In CSS, what does the ':has()' pseudo-class represent?",
        options: [
          "A pseudo-class for matching an element that has focused children",
          "A relational pseudo-class that matches an element if any of the selectors passed as parameters match at least one element",
          "A selector matching elements that contain specific text content",
          "An obsolete selector for hover transitions"
        ],
        correctOptionIndex: 1,
        explanation: "The CSS parent selector :has() represents an element if any of the relative selectors, when resolved against the element, match at least one element. It is often referred to as the 'parent selector'."
      }
    ]
  },
  {
    id: "javascript",
    name: "Modern JavaScript (ES6+)",
    category: "Technical",
    timeLimitMinutes: 10,
    questions: [
      {
        id: 1,
        question: "What is the behavior of the JavaScript event loop when processing microtasks vs. macrotasks?",
        options: [
          "Macrotasks are executed immediately, while microtasks are processed at the end of the script",
          "All microtasks in the microtask queue are executed before the next macrotask is pulled from the queue",
          "Macrotasks and microtasks are run in parallel threads",
          "They are run in a random order based on processor scheduling"
        ],
        correctOptionIndex: 1,
        explanation: "At the end of each task in the event loop, the engine checks the microtask queue (e.g., Promise callbacks, queueMicrotask). It will execute ALL microtasks in the queue before moving on to render updates or pull the next macrotask."
      },
      {
        id: 2,
        question: "What is the difference between '==' and '===' in JavaScript?",
        options: [
          "There is no difference; they are interchangeable",
          "'==' performs type coercion before comparison, whereas '===' compares values and types strictly without coercion",
          "'===' is slower and should be avoided in performance-critical loops",
          "'==' is used for mathematical evaluation, '===' is used for text comparison"
        ],
        correctOptionIndex: 1,
        explanation: "The loose equality operator '==' converts the operands to common types before comparing. The strict equality operator '===' does not do coercion and returns false if the types are different."
      }
    ]
  },
  {
    id: "react",
    name: "React & State Management",
    category: "Technical",
    timeLimitMinutes: 10,
    questions: [
      {
        id: 1,
        question: "What is the primary benefit of React 18 Concurrent Rendering features like 'useTransition'?",
        options: [
          "It forces components to render instantly on a background web worker thread",
          "It allows you to mark state updates as non-blocking transitions, keeping the browser UI responsive during heavy renders",
          "It automatically caches all fetch network API requests in memory",
          "It compiles React components to highly optimized WebAssembly widgets"
        ],
        correctOptionIndex: 1,
        explanation: "The useTransition hook lets you mark state updates as transitions. This keeps the UI interactive during slow renders, letting users click other tabs or type in inputs without locking the main thread."
      },
      {
        id: 2,
        question: "When does the callback inside a 'useEffect' hook run?",
        options: [
          "Directly during the render phase before the DOM is painted",
          "Asynchronously after the render is committed and the browser has painted the DOM updates",
          "Only when the browser window is resized",
          "Only when the component throws an error"
        ],
        correctOptionIndex: 1,
        explanation: "By default, useEffect runs its callback asynchronously after the render is committed to the screen and the browser has painted, ensuring it does not block critical rendering frames."
      }
    ]
  }
];
