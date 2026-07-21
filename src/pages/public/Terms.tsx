import React from "react";
import { Card } from "../../components/common/Card";

export const Terms: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Terms and Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: July 15, 2026</p>
        
        <Card className="p-8 bg-white border-slate-100 shadow-sm flex flex-col gap-6 text-xs text-slate-650 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">1. Agreement to Terms</h2>
          <p>
            By accessing CareerAI, you acknowledge that this is a frontend-only prototype design. All tools (Resume scoring, assessment metrics, chatbot) operate as local browser simulations using predefined static scripts.
          </p>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">2. Disclaimer of Warranties</h2>
          <p>
            The services, matches, and recommendations on this site are for presentation and prototyping purposes only. No guarantee of employment, technical correctness, or score validity is represented.
          </p>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">3. Modifications</h2>
          <p>
            We reserve the right to modify the template layout structures, design tokens, mock datasets, or simulation scripts at any time without notification.
          </p>
        </Card>
      </div>
    </div>
  );
};
export default Terms;
