import React, { useState } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Search, Compass, Eye, Edit } from "lucide-react";
import { toast } from "sonner";

export const CandidatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const candidates = [
    { id: "cand-1", name: "Alex Mercer", email: "candidate@careerai.com", goal: "Frontend Developer", progress: 85, matchScore: 82, lastActive: "Today" },
    { id: "cand-2", name: "Sarah Jenkins", email: "sarah@gmail.com", goal: "UI/UX Designer", progress: 92, matchScore: 88, lastActive: "Yesterday" },
    { id: "cand-3", name: "David Chen", email: "chen.d@outlook.com", goal: "Data Scientist", progress: 70, matchScore: 75, lastActive: "3 days ago" },
    { id: "cand-4", name: "Emily Watson", email: "emily@gmail.com", goal: "Product Manager", progress: 40, matchScore: 68, lastActive: "1 week ago" }
  ];

  const filtered = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">MONITORING</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Candidate Directory</h1>
        <p className="text-[10px] text-slate-400">View progress checklists, average match scores, and activity timelines.</p>
      </div>

      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-6">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
        </div>

        <div className="overflow-x-auto border border-slate-150 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-455 uppercase tracking-wider">
                <th className="p-4">Candidate</th>
                <th className="p-4">Selected Target Goal</th>
                <th className="p-4">Study Roadmap Progress</th>
                <th className="p-4">Match Ratio</th>
                <th className="p-4">Last Active</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-655 font-medium">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/40">
                  <td className="p-4">
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-slate-800 font-bold">{c.name}</strong>
                      <span className="text-[10px] text-slate-400">{c.email}</span>
                    </div>
                  </td>
                  <td className="p-4">{c.goal}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${c.progress}%` }} />
                      </div>
                      <span>{c.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{c.matchScore}% Match</td>
                  <td className="p-4 text-slate-400">{c.lastActive}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => toast.info(`Viewing ${c.name}'s visual profile report...`)}>
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default CandidatesPage;
