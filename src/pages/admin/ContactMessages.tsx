import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";

export const ContactMessagesPage: React.FC = () => {
  const messages = [
    { name: "John Doe", email: "john@company.com", subject: "Partnership Query", msg: "We would love to list our front-end openings on CareerAI.", date: "2026-07-14" },
    { name: "Jane Smith", email: "jane.s@gmail.com", subject: "Candidate Support", msg: "I encountered an error uploading my docx resume format.", date: "2026-07-15" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">CONTACT MESSAGES</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Support Inbox</h1>
        <p className="text-[10px] text-slate-405">Review submitted public contact form messages and inquiries.</p>
      </div>

      <div className="flex flex-col gap-4">
        {messages.map((m, i) => (
          <Card key={i} className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 tracking-tight">{m.subject}</h4>
                <p className="text-[9px] text-slate-400 font-semibold mt-0.5">From: {m.name} ({m.email})</p>
              </div>
              <span className="text-[9px] text-slate-400 inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {m.date}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap">{m.msg}</p>
            <div className="flex justify-end pt-2 border-t border-slate-50 mt-1">
              <Button variant="primary" size="sm" onClick={() => toast.success(`Draft reply sent to ${m.email}!`)}>
                Reply Email
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ContactMessagesPage;
