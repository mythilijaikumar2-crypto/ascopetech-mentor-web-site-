import { CareerRoadmap, mockRoadmaps } from "../data/roadmap";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const roadmapService = {
  generateRoadmap: async (careerId: string): Promise<CareerRoadmap> => {
    await delay(1500); // Simulate roadmap calculation latency

    const existing = mockRoadmaps[careerId];
    if (existing) return existing;

    // Generate standard fallback roadmap with specific names
    return {
      careerId,
      durationWeeks: 12,
      stages: [
        {
          id: "beginner",
          title: "Beginner Stage",
          description: "Establish the fundamentals of the role.",
          modules: [
            {
              id: "m1",
              title: "Foundations & Setup",
              description: "Configure tools and learn basic concepts.",
              tasks: [
                { id: `t-basic-1`, title: "Overview and Terms", duration: "4 hours", completed: false, type: "theory" },
                { id: `t-basic-2`, title: "Setup Local Workflow", duration: "3 hours", completed: false, type: "project" },
                { id: `t-basic-3`, title: "Foundation Assessment Quiz", duration: "15 mins", completed: false, type: "quiz" }
              ]
            }
          ]
        }
      ]
    };
  }
};
