import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Compass, Users, Heart, Shield } from "lucide-react";

export const About: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <Badge variant="primary" className="max-w-fit mx-auto">ABOUT CAREERAI</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Democratizing Career Growth through AI
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed text-balance">
            Our mission is to empower professionals worldwide with personalized, actionable mentoring to succeed in the modern job market.
          </p>
        </div>

        {/* Vision & Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Expert Mentorship",
              desc: "Combining technical standard guides with simulated AI algorithms to replicate high-value career tutoring.",
              color: "bg-indigo-50 text-indigo-650"
            },
            {
              icon: Heart,
              title: "Candidate Centered",
              desc: "Designing tools that solve real candidate problems: drafting CVs, managing stage studies, and training answer delivery.",
              color: "bg-rose-50 text-rose-650"
            },
            {
              icon: Shield,
              title: "Data Confidentiality",
              desc: "Ensuring candidate credentials, scores, and portfolios are kept secure. In this prototype, all records are stored in browser memory.",
              color: "bg-emerald-50 text-emerald-650"
            }
          ].map((pillar, i) => (
            <Card key={i} className="p-8 flex flex-col gap-4 border-slate-100 bg-white shadow-sm">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${pillar.color}`}>
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{pillar.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
            </Card>
          ))}
        </div>

        {/* Platform Story Section */}
        <div className="bg-white border border-slate-150/60 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Our Story</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              CareerAI started as an engineering experiment designed by a team of senior frontend web developers and designers who noticed a massive gap in how applicants prepare for tech roles. Traditional platforms only display listings; they do not help candidates review their CVs, practice timed questions, or roadmap their studies.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              We developed CareerAI to bridge this gap, integrating interactive frontend modules that simulate complex AI pipelines directly in the client browser, helping you build skills without server dependencies.
            </p>
          </div>
          <div className="md:col-span-5 bg-linear-to-br from-primary-600 to-brand-500 p-8 rounded-2xl text-white flex flex-col justify-around min-h-[220px]">
            <Compass className="h-10 w-10 text-white opacity-85" />
            <div>
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-xs opacity-90 mt-1">Browser-based frontend simulation. Safe, fast, and private.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default About;
