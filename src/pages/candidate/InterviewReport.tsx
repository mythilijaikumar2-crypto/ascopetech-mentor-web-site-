import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useInterviewStore, InterviewSession } from "../../store/interviewStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MessageSquare, ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, Eye, EyeOff } from "lucide-react";

export const InterviewReport: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { sessions } = useInterviewStore();
  const [session, setSession] = useState<InterviewSession | null>(null);
  
  // Accordions to view model answers keyed by question index
  const [expandedModelIdxs, setExpandedModelIdxs] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const found = sessions.find((s) => s.sessionId === sessionId);
    if (found) {
      setSession(found);
    }
  }, [sessionId, sessions]);

  const toggleModelAnswer = (idx: number) => {
    setExpandedModelIdxs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  if (!session) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Interview report not found</h2>
        <Link to="/candidate/interviews" className="text-primary-600 hover:underline">
          Back to Interviews
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col gap-10">
      {/* Action Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
        <Link to="/candidate/interviews" className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-655 rounded-xl transition-all">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Interview Scorecard</h1>
          <p className="text-[10px] text-slate-400">Detailed AI evaluation and model answers checklist.</p>
        </div>
      </div>

      {/* Main Scorecard Widget */}
      <Card className="p-8 bg-gradient-to-tr from-slate-950 via-primary-950 to-brand-950 text-white border-slate-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-lg">
          <Badge variant="secondary" className="max-w-fit bg-white/20 border-white/10 text-white font-bold">
            GRADING COMPLETE
          </Badge>
          <h2 className="text-2xl font-extrabold tracking-tight">{session.roleTitle}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your timed answers were scanned for technical accuracy, clarity of delivery, and keyword alignment.
          </p>
        </div>

        {/* Big score dial */}
        <div className="h-28 w-28 rounded-full border-4 border-slate-800 flex flex-col items-center justify-center bg-slate-900 shrink-0 shadow-lg relative">
          <span className="text-3xl font-extrabold text-indigo-400">{session.score}%</span>
          <span className="text-[8px] font-bold text-slate-500 uppercase mt-0.5">SCORE</span>
        </div>
      </Card>

      {/* Analytics Progress metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Technical Accuracy", score: session.technicalAccuracy || 85, color: "bg-indigo-500" },
          { label: "Answer Relevance", score: session.relevanceScore || 88, color: "bg-violet-500" },
          { label: "Delivery Clarity", score: session.clarityScore || 82, color: "bg-emerald-500" }
        ].map((metric, i) => (
          <Card key={i} className="p-5 border-slate-200/80 bg-white shadow-sm flex flex-col gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{metric.label}</span>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Performance</span>
              <span>{metric.score}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${metric.score}%`, backgroundColor: metric.color === "bg-indigo-500" ? "#4f46e5" : metric.color === "bg-violet-500" ? "#8b5cf6" : "#10b981" }} />
            </div>
          </Card>
        ))}
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 border-slate-200/85 bg-white shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2.5">
            Key Strengths
          </h3>
          <div className="flex flex-col gap-3 text-xs text-slate-655 leading-relaxed">
            {session.strengths?.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-slate-200/85 bg-white shadow-sm flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2.5">
            Areas to Improve
          </h3>
          <div className="flex flex-col gap-3 text-xs text-slate-655 leading-relaxed">
            {session.improvements?.map((imp, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{imp}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Question Feedback Cards list */}
      <div className="flex flex-col gap-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Question-by-Question breakdown</h3>
        <div className="flex flex-col gap-6">
          {session.questions.map((q, idx) => {
            const showModel = expandedModelIdxs.includes(idx);
            return (
              <Card key={q.id} className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold text-slate-400">QUESTION {idx + 1} OF {session.questions.length}</span>
                  <Badge variant="primary" className="font-extrabold text-[10px]">
                    Score: {q.score}%
                  </Badge>
                </div>
                
                <h4 className="text-xs md:text-sm font-bold text-slate-800 leading-snug">{q.question}</h4>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">Your Submitted Answer</span>
                  <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap">
                    {q.submittedAnswer || "No answer submitted."}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 p-3.5 bg-indigo-50/20 border border-indigo-150/20 rounded-xl text-xs text-slate-600">
                  <span className="text-[8.5px] font-bold text-indigo-600 uppercase tracking-wider">Evaluator Feedback</span>
                  <p className="leading-relaxed">{q.feedback || "Evaluating keywords match criteria..."}</p>
                </div>

                {/* Model answers accordion */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => toggleModelAnswer(idx)}
                    className="flex items-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700 self-start"
                  >
                    {showModel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showModel ? "Hide Model Response" : "View Model Response"}
                  </button>

                  {showModel && (
                    <div className="flex flex-col gap-4 bg-slate-50 p-4.5 rounded-xl border border-slate-150/60 animate-fade-up">
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Suggested Key Points:</span>
                        <ul className="list-disc pl-5 text-slate-600 flex flex-col gap-1.5 mt-1 leading-relaxed">
                          {q.suggestedPoints.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-1 text-xs border-t border-slate-150/60 pt-3">
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Sample Answer:</span>
                        <p className="text-slate-600 leading-relaxed mt-1 font-mono">{q.sampleAnswer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
};
export default InterviewReport;
