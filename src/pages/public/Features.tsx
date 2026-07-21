import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Sparkles, FileText, MessageSquare, Map, Briefcase, Bot } from "lucide-react";

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: Bot,
      title: "AI Career Assistant",
      desc: "An intelligent chatbot helper available at any point in your dashboard. Ask questions about languages to learn, resume formatting, or interview responses, and receive rich, contextual answers.",
      details: ["Predefined prompt categories", "Continuous chat log persistence", "Instant simulated AI suggestions"]
    },
    {
      icon: FileText,
      title: "Resume Scorer & Analyzer",
      desc: "Verify your keyword density and ATS compliance metrics. Upload mock PDF/DOC files, receive overall scores, and compare your CV details against target job listings.",
      details: ["ATS layout verification", "Missing keyword identification", "CV formatting recommendations"]
    },
    {
      icon: MessageSquare,
      title: "Interactive Interview Practice",
      desc: "Simulate a live coding or behavioral interview loop. Answer technical questions against an active countdown timer, submit responses, and review graded scorecards with model answers.",
      details: ["HR & technical tracks", "Live answer timer tracking", "Average rating scorecard metrics"]
    },
    {
      icon: Map,
      title: "Structured Milestones Roadmap",
      desc: "Establish weekly learning milestones for your chosen career goal. Follow structured modules from beginner syntax foundations up to enterprise-level framework deployments.",
      details: ["Stage progress metrics", "Checked task persistence", "Skill assessments quizzes integration"]
    },
    {
      icon: Briefcase,
      title: "Job Search Board & Tracker",
      desc: "Explore job match indices tailored specifically to your skill levels, bookmark saved listings, submit applications using your saved CVs, and monitor progression states in Kanbans.",
      details: ["Interactive filter panels", "Kanban tracking cards", "Match rating percentages"]
    }
  ];

  return (
    <div className="py-16 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <Badge variant="primary" className="max-w-fit mx-auto">PLATFORM FEATURES</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Tools for Career Change
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed text-balance">
            We provide all the professional utilities a candidate needs to discover, prepare, study, and apply for roles.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="flex flex-col gap-8">
          {featureList.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="p-8 md:p-10 bg-white border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary-650 flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-850 tracking-tight mb-1">{f.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {f.details.map((detail, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[10px] font-semibold border border-slate-200/50">
                        <Sparkles className="h-3 w-3 text-primary-600" />
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
};
export default Features;
