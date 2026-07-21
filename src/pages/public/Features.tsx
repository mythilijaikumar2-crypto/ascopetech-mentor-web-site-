import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Sparkles, FileText, MessageSquare, Map, Briefcase, Bot } from "lucide-react";
import featureVideo from "../../assets/herosection2ascopetech.mp4";

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

        {/* Feature HD Video Demo Player */}
        <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900">
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" /> Platform Walkthrough & HD Video Demo
            </span>
            <Badge variant="success" className="text-[9px]">HD 1080P</Badge>
          </div>
          <div className="aspect-video bg-black overflow-hidden">
            <video
              autoPlay
              loop
              muted
              controls
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={featureVideo} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="flex flex-col gap-8">
          {featureList.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card key={i} className="p-8 md:p-10 bg-white border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                <div className="h-14 w-14 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {f.details.map((d, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700">
                        <Sparkles className="h-3 w-3 text-primary-500" /> {d}
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
