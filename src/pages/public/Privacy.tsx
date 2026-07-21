import React from "react";
import { Card } from "../../components/common/Card";

export const Privacy: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: July 15, 2026</p>
        
        <Card className="p-8 bg-white border-slate-100 shadow-sm flex flex-col gap-6 text-xs text-slate-650 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">1. Information Collection</h2>
          <p>
            CareerAI is a frontend-only demonstration platform. We do not transmit or save any personal data, resume documents, mock interview transcripts, or assessment responses to external servers.
          </p>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">2. Local Storage Utilization</h2>
          <p>
            All inputs, CV structures, mock study roadmap indicators, and chat logs are saved strictly in your browser's local memory (`localStorage` / `sessionStorage`) to provide persistence between page refreshes. Clearing browser caches will erase these records permanently.
          </p>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">3. Security</h2>
          <p>
            Since all operations occur client-side, security depends on your local device. We recommend not entering actual sensitive passwords or real financial credentials anywhere on this demonstration interface.
          </p>
        </Card>
      </div>
    </div>
  );
};
export default Privacy;
