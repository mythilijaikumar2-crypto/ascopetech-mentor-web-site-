import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CareerRoadmap, mockRoadmaps } from "../data/roadmap";

interface RoadmapState {
  activeRoadmap: CareerRoadmap | null;
  completedTasks: string[]; // List of task IDs
  loadRoadmap: (careerId: string) => void;
  toggleTaskCompleted: (taskId: string) => void;
  resetProgress: () => void;
}

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set) => ({
      activeRoadmap: null,
      completedTasks: [],
      loadRoadmap: (careerId) => {
        const template = mockRoadmaps[careerId];
        if (template) {
          set({ activeRoadmap: template });
        } else {
          // Generate a custom roadmap structure dynamically if not found
          const fallbackRoadmap: CareerRoadmap = {
            careerId,
            durationWeeks: 16,
            stages: [
              {
                id: "stage-1",
                title: "Fundamentals Stage",
                description: "Acquire basic concepts, environment setups, and core tool familiarizations.",
                modules: [
                  {
                    id: "mod-1",
                    title: "Introductory Theory & Setup",
                    description: "Learn syntax conventions and essential terminal structures.",
                    tasks: [
                      { id: `${careerId}-t1`, title: "Core Terminology & Concepts", duration: "4 hours", completed: false, type: "theory" },
                      { id: `${careerId}-t2`, title: "Setup Local Dev Environment", duration: "3 hours", completed: false, type: "project" },
                      { id: `${careerId}-t3`, title: "Baseline Knowledge Assessment", duration: "15 mins", completed: false, type: "quiz" }
                    ]
                  }
                ]
              }
            ]
          };
          set({ activeRoadmap: fallbackRoadmap });
        }
      },
      toggleTaskCompleted: (taskId) => {
        set((state) => {
          const isCompleted = state.completedTasks.includes(taskId);
          const completedTasks = isCompleted
            ? state.completedTasks.filter((id) => id !== taskId)
            : [...state.completedTasks, taskId];
          return { completedTasks };
        });
      },
      resetProgress: () => {
        set({ completedTasks: [] });
      },
    }),
    {
      name: "career_ai_roadmaps",
    }
  )
);
