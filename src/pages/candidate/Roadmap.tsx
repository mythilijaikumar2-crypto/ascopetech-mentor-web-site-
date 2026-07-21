import React, { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profileStore";
import { useRoadmapStore } from "../../store/roadmapStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Compass, CheckCircle2, ChevronDown, ChevronUp, Map, Award, BookOpen, AlertCircle } from "lucide-react";
import { mockCareers } from "../../data/careers";
import { toast } from "sonner";

export const Roadmap: React.FC = () => {
  const { selectedGoal } = useProfileStore();
  const { activeRoadmap, completedTasks, loadRoadmap, toggleTaskCompleted, resetProgress } = useRoadmapStore();
  
  // Track open module accordions keyed by module ID
  const [openModuleIds, setOpenModuleIds] = useState<string[]>([]);
  
  const career = mockCareers.find((c) => c.id === selectedGoal) || mockCareers[0];

  useEffect(() => {
    // Automatically load roadmap for target goal if none set
    const currentGoal = selectedGoal || mockCareers[0].id;
    loadRoadmap(currentGoal);
  }, [selectedGoal, loadRoadmap]);

  // Set default modules expanded
  useEffect(() => {
    if (activeRoadmap) {
      const ids = activeRoadmap.stages.flatMap((s) => s.modules.map((m) => m.id));
      setOpenModuleIds([ids[0]]); // Expand the first module initially
    }
  }, [activeRoadmap]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const handleTaskCheck = (taskId: string, taskTitle: string, isNowCompleted: boolean) => {
    toggleTaskCompleted(taskId);
    if (!isNowCompleted) {
      toast.success(`Completed: '${taskTitle}'! Keep it up.`);
    }
  };

  if (!activeRoadmap) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400">Loading learning roadmaps...</p>
      </div>
    );
  }

  // Calculate progress
  const totalTasks = activeRoadmap.stages.reduce(
    (sum, stage) => sum + stage.modules.reduce((mSum, mod) => mSum + mod.tasks.length, 0),
    0
  );
  const completedCount = completedTasks.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100) || 0;

  return (
    <div className="py-8 flex flex-col gap-10">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <Badge variant="primary">STUDY ROADMAP</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Personal Study Curriculum
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            Your step-by-step roadmap for mastering core capabilities required for: <strong>{career.title}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={resetProgress} disabled={completedTasks.length === 0}>
            Reset Progress
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm">
            <Map className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Stage Curriculum Progress</h3>
            <p className="text-[10px] text-slate-400">Completed: {completedCount} of {totalTasks} milestones</p>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Overall Roadmap Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-600 to-brand-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </Card>

      {/* Vertical Timeline Stages tree layout */}
      <div className="relative pl-8 flex flex-col gap-10">
        
        {/* Connecting Vertical line indicator */}
        <div className="absolute left-3.5 top-3 bottom-3 w-0.8 bg-slate-200 z-0" />

        {activeRoadmap.stages.map((stage, stageIdx) => (
          <div key={stage.id} className="relative z-10 flex flex-col gap-6">
            
            {/* Stage Indicator Node */}
            <div className="absolute -left-8 top-1 h-7.5 w-7.5 rounded-full border-4 border-slate-200 bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <Award className="h-3.8 w-3.8 text-primary-400" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight uppercase tracking-wider">
                {stage.title}
              </h2>
              <p className="text-[10px] text-slate-450 mt-0.5 leading-relaxed">{stage.description}</p>
            </div>

            {/* Modules inside stage */}
            <div className="flex flex-col gap-4">
              {stage.modules.map((mod) => {
                const isOpen = openModuleIds.includes(mod.id);
                
                // Calculate module task stats
                const modCompleted = mod.tasks.filter((t) => completedTasks.includes(t.id)).length;
                const isModDone = modCompleted === mod.tasks.length;

                return (
                  <Card
                    key={mod.id}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "border-slate-350 shadow-sm" : "border-slate-200 bg-white"
                    }`}
                  >
                    {/* Module Accordion Trigger */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none bg-slate-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isModDone ? "bg-emerald-500 text-white" : "bg-slate-250 text-slate-500"
                        }`}>
                          {isModDone ? "✓" : modCompleted}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-snug">{mod.title}</h4>
                          <p className="text-[9px] text-slate-400 font-semibold">{modCompleted} / {mod.tasks.length} completed</p>
                        </div>
                      </div>
                      <span className="text-slate-400">
                        {isOpen ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                      </span>
                    </button>

                    {/* Expandable Module tasks checklist */}
                    {isOpen && (
                      <div className="p-5 border-t border-slate-100 flex flex-col gap-4 bg-white animate-fade-up">
                        <p className="text-[10px] text-slate-450 italic leading-relaxed">{mod.description}</p>
                        
                        <div className="flex flex-col gap-2.5">
                          {mod.tasks.map((task) => {
                            const isDone = completedTasks.includes(task.id);
                            return (
                              <div
                                key={task.id}
                                className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                                  isDone ? "bg-slate-50/50 border-slate-200 text-slate-500" : "bg-white border-slate-150 text-slate-800 hover:bg-slate-50/20"
                                }`}
                              >
                                <div className="flex items-center gap-3.5 truncate">
                                  <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => handleTaskCheck(task.id, task.title, isDone)}
                                    className="h-4.5 w-4.5 rounded-lg border-slate-300 text-primary-650 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                  />
                                  <div className="truncate">
                                    <h5 className={`text-xs font-bold truncate ${isDone ? "line-through text-slate-400" : "text-slate-800"}`}>
                                      {task.title}
                                    </h5>
                                    {task.description && !isDone && (
                                      <p className="text-[10px] text-slate-450 mt-0.5 leading-relaxed truncate">
                                        {task.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={task.type === "project" ? "secondary" : task.type === "quiz" ? "warning" : "neutral"} className="text-[8px] py-0 px-2 uppercase shrink-0">
                                    {task.type}
                                  </Badge>
                                  <span className="text-[9px] text-slate-400 font-semibold shrink-0">{task.duration}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
export default Roadmap;
