import { mockCareers, CareerPath } from "../data/careers";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CareerRecommendation extends CareerPath {
  matchScore: number;
  reason: string;
}

export const careerService = {
  getCareers: async (): Promise<CareerPath[]> => {
    await delay(600);
    return mockCareers;
  },

  getCareerById: async (id: string): Promise<CareerPath | undefined> => {
    await delay(300);
    return mockCareers.find((c) => c.id === id);
  },

  analyzeAssessment: async (answers: Record<string, any>): Promise<CareerRecommendation[]> => {
    await delay(1800); // Higher delay for analysis visualization

    // Calculate score weights for each career path based on quiz answers
    const scores: Record<string, number> = {};
    mockCareers.forEach((c) => {
      scores[c.id] = 50; // Base score
    });

    // Go through each answer and sum weights
    Object.entries(answers).forEach(([questionId, val]) => {
      // Find matching question in mock data (simulated weight addition)
      if (questionId === "q-1") {
        if (val === "design") { scores["ui-ux-designer"] += 25; scores["frontend-developer"] += 10; }
        if (val === "coding-server") { scores["backend-developer"] += 25; scores["data-scientist"] += 10; }
        if (val === "coding-client") { scores["frontend-developer"] += 25; scores["ui-ux-designer"] += 10; }
        if (val === "organizing") { scores["product-manager"] += 25; scores["digital-marketing-specialist"] += 10; }
      } else if (questionId === "q-2") {
        const rating = Number(val) || 3;
        scores["data-scientist"] += rating * 5;
        scores["backend-developer"] += rating * 2;
      } else if (questionId === "q-3") {
        if (val === "research") { scores["ui-ux-designer"] += 20; scores["product-manager"] += 15; }
        if (val === "fix") { scores["frontend-developer"] += 20; scores["backend-developer"] += 10; }
        if (val === "market") { scores["digital-marketing-specialist"] += 20; scores["product-manager"] += 10; }
      } else if (questionId === "q-4") {
        if (val === true || val === "yes") scores["digital-marketing-specialist"] += 25;
      } else if (questionId === "q-5") {
        const rating = Number(val) || 3;
        scores["product-manager"] += rating * 5;
      } else if (questionId === "q-6") {
        if (val === "none") {
          scores["ui-ux-designer"] += 15;
          scores["product-manager"] += 15;
          scores["digital-marketing-specialist"] += 15;
        } else if (val === "some") {
          scores["frontend-developer"] += 10;
          scores["ui-ux-designer"] += 10;
        } else if (val === "advanced") {
          scores["frontend-developer"] += 25;
          scores["backend-developer"] += 25;
          scores["data-scientist"] += 20;
        }
      }
    });

    // Map weights to recommendation results and sort by match percentage
    const recommendations: CareerRecommendation[] = mockCareers.map((c) => {
      const rawScore = scores[c.id];
      const matchScore = Math.min(Math.round((rawScore / 100) * 100), 99); // max 99%
      
      let reason = "Your interests align closely with the key responsibilities of this role.";
      if (c.id === "frontend-developer") {
        reason = "Your combination of interactive coding interests and visual design preferences make Frontend Development a perfect match.";
      } else if (c.id === "backend-developer") {
        reason = "You show a strong inclination towards server architecture, databases, and structured programming paradigms.";
      } else if (c.id === "data-scientist") {
        reason = "Your strong rating in analytics and statistical analysis supports a highly technical data science path.";
      } else if (c.id === "ui-ux-designer") {
        reason = "Your preference for layout styling, design prototyping, and research aligns with UI/UX creation.";
      } else if (c.id === "product-manager") {
        reason = "You demonstrate a strong preference for coordination, roadmapping, and managing team milestones in ambiguity.";
      } else if (c.id === "digital-marketing-specialist") {
        reason = "Your interest in copywriting, audience engagement, and campaign analysis perfectly matches marketing growth roles.";
      }

      return {
        ...c,
        matchScore,
        reason
      };
    });

    return recommendations.sort((a, b) => b.matchScore - a.matchScore);
  }
};
