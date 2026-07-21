import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MessageSquare, Users, Award } from "lucide-react";
import { toast } from "sonner";

export const MentorsPage: React.FC = () => {
  const mentors = [
    { name: "Sarah Jenkins", role: "Design Lead at Stripe", bio: "10+ years experience in UX design systems.", matches: 14 },
    { name: "David Chen", role: "Principal Engineer at Google", bio: "Expert in distributed computing & Python.", matches: 28 },
    { name: "Emily Watson", role: "Product Director at Airbnb", bio: "Focuses on growth scaling metrics & PM roles.", matches: 9 }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">DIRECTORY</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Registered Mentors</h1>
        <p className="text-[10px] text-slate-400">View active partner mentors conducting mock interview sessions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((m, i) => (
          <Card key={i} className="p-6 border-slate-200 bg-white shadow-sm flex flex-col justify-between min-h-[180px]">
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">{m.name}</h4>
                <p className="text-[10px] text-primary-600 font-semibold mt-0.5">{m.role}</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{m.bio}</p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
              <span className="text-[10px] text-slate-400 font-semibold inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {m.matches} Candidate Reviews
              </span>
              <Button variant="ghost" size="sm" onClick={() => toast.info(`Accessing conversation logs for ${m.name}...`)}>
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default MentorsPage;
