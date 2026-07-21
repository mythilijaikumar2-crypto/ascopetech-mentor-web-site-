import React from "react";
import { useNavigate } from "react-router-dom";
import { useInterviewStore } from "../../store/interviewStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { MessageSquare, Calendar, Star, Play } from "lucide-react";

export const Interviews: React.FC = () => {
  const { sessions } = useInterviewStore();
  const navigate = useNavigate();

  return (
    <div className="py-8 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <Badge variant="primary">INTERVIEW PRACTICE</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Mock Interview Hub
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            Practice situational HR and technical coding questions, and review graded scorecards.
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Play className="h-4.5 w-4.5" />}
          onClick={() => navigate("/candidate/interviews/setup")}
        >
          Start New Practice
        </Button>
      </div>

      {/* Sessions History List */}
      {sessions.length === 0 ? (
        <Card className="py-16 text-center border-slate-200/80 bg-white shadow-sm p-8 max-w-lg mx-auto flex flex-col items-center gap-4">
          <MessageSquare className="h-10 w-10 text-slate-300 animate-pulse" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">No mock interviews completed</h3>
            <p className="text-xs text-slate-455 mt-1">Start your first timed practice loop to test your answering skills.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate("/candidate/interviews/setup")}>
            Start My First Session
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Graded Attempt History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((sess) => (
              <Card
                key={sess.sessionId}
                variant="interactive"
                className="p-6 cursor-pointer flex flex-col gap-4"
                onClick={() => navigate(`/candidate/interviews/report/${sess.sessionId}`)}
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">
                      {sess.roleTitle}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {sess.difficulty} Level | {sess.focus} Questions
                    </p>
                  </div>
                  <Badge variant="primary" className="text-xs font-extrabold px-2.5 py-0.8 bg-primary-50 text-primary-700 rounded-xl">
                    Score: {sess.score}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-450 font-semibold mt-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Completed: {sess.dateCompleted}
                  </span>
                  <span className="text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    Review Report →
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Interviews;
