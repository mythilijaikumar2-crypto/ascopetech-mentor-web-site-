import { AnalysisResult } from "../store/resumeStore";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const resumeService = {
  analyzeResume: async (fileName: string, fileSize: number): Promise<AnalysisResult> => {
    await delay(1500); // Simulate upload and parsing latency

    const baseScore = Math.floor(Math.random() * 15) + 70; // 70 to 85

    return {
      score: baseScore,
      atsScore: baseScore + 2,
      completeness: 88,
      formattingIssues: [
        "Multiple column design might conflict with older ATS parsers",
        "Profile picture included (unrecommended for standard US/UK markets)"
      ],
      missingSections: [
        "Certifications section is missing",
        "GitHub links not clickable"
      ],
      strongPoints: [
        "Excellent clear typography structure",
        "Action verbs used in past professional experience descriptions",
        "Proper separation of education details"
      ],
      recommendations: [
        "Add certified professional badges (e.g. AWS, React certificate)",
        "Convert single line lists into bullet lists with quantifiable impacts",
        "Add direct URLs for personal project websites"
      ]
    };
  },

  compareWithJobDescription: async (
    resumeText: string,
    jobDescription: string
  ): Promise<AnalysisResult["jdMatch"]> => {
    await delay(1200); // Simulate comparator latency

    // Simple word comparison to make it feel responsive and logical
    const skillsList = [
      "react",
      "javascript",
      "typescript",
      "html",
      "css",
      "tailwind",
      "git",
      "redux",
      "node",
      "python",
      "sql",
      "figma"
    ];
    const jdLower = jobDescription.toLowerCase();
    const resumeLower = resumeText.toLowerCase();

    const matchingSkills: string[] = [];
    const missingSkills: string[] = [];

    skillsList.forEach((skill) => {
      const isReq = jdLower.includes(skill);
      if (isReq) {
        if (resumeLower.includes(skill)) {
          matchingSkills.push(skill.toUpperCase());
        } else {
          missingSkills.push(skill.toUpperCase());
        }
      }
    });

    // Handle fallback if no skills found in text
    if (matchingSkills.length === 0 && missingSkills.length === 0) {
      matchingSkills.push("REACT", "JAVASCRIPT", "GIT");
      missingSkills.push("TYPESCRIPT", "TAILWIND CSS");
    }

    const totalMatchable = matchingSkills.length + missingSkills.length;
    const matchPercentage = Math.round((matchingSkills.length / totalMatchable) * 100) || 70;

    return {
      matchPercentage,
      matchingSkills,
      missingSkills,
      suggestions: [
        `Integrate missing keywords: ${missingSkills.slice(0, 3).join(", ")} directly into your experience bullet points.`,
        "Quantify your accomplishments (e.g. 'Optimized LCP rendering, reducing load times by 25%').",
        "Make sure your contact email matches the one listed in your profile."
      ]
    };
  }
};
