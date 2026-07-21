import React, { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profileStore";
import { useRoadmapStore } from "../../store/roadmapStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Compass, CheckCircle2, ChevronDown, ChevronUp, Map, Award, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { mockCareers } from "../../data/careers";

export const Roadmap: React.FC = () => {
  const { selectedGoal } = useProfileStore();
  const { activeRoadmap, completedTasks, loadRoadmap, toggleTaskCompleted, resetProgress } = useRoadmapStore();
  const [openModuleIds, setOpenModuleIds] = useState<string[]>([]);
  
  const career = mockCareers.find((c) => c.id === selectedGoal) || mockCareers[0];

  useEffect(() => {
    const currentGoal = selectedGoal || mockCareers[0].id;
    loadRoadmap(currentGoal);
  }, [selectedGoal, loadRoadmap]);

  useEffect(() => {
    if (activeRoadmap) {
      const ids = activeRoadmap.stages.flatMap((s) => s.modules.map((m) => m.id));
      setOpenModuleIds([ids[0]]);
    }
  }, [activeRoadmap]);

  const toggleModule = (id: string) => {
    setOpenModuleIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const handleTaskCheck = (taskId: string) => {
    toggleTaskCompleted(taskId);
  };

  if (!activeRoadmap) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400">Loading learning roadmaps...</p>
      </div>
    );
  }

  const totalTasks = activeRoadmap.stages.reduce(
    (sum, stage) => sum + stage.modules.reduce((mSum, mod) => mSum + mod.tasks.length, 0),
    0
  );
  const completedCount = completedTasks.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100) || 0;

  return (
    <div className="py-6 flex flex-col gap-8">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <Badge variant="primary" className="text-[10px]">STUDY CURRICULUM</Badge>
          <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Personal Study Roadmap
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
            Step-by-step milestones to master core capabilities required for: <strong className="text-slate-800 dark:text-slate-200">{career.title}</strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={resetProgress} disabled={completedTasks.length === 0}>
            Reset Progress
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col md:flex-row items-center justify-around gap-6">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shadow-xs">
            <Map className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Stage Curriculum Progress</h3>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Completed: {completedCount} of {totalTasks} milestones</p>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Overall Roadmap Completion</span>
            <span className="text-primary-600 dark:text-primary-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-600 to-brand-500 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {progressPercent >= 100 && (
          <Badge variant="success" className="inline-flex items-center gap-1.5 p-2 px-3 text-xs">
            <Award className="h-4 w-4" /> Certificate Unlocked!
          </Badge>
        )}
      </Card>

      {/* Vertical Timeline Stages tree layout */}
      <div className="relative pl-8 flex flex-col gap-10">
        <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-slate-200 dark:bg-slate-800 z-0" />

        {activeRoadmap.stages.map((stage) => (
          <div key={stage.id} className="relative z-10 flex flex-col gap-6">
            <div className="absolute -left-8 top-1 h-7.5 w-7.5 rounded-full border-4 border-slate-200 dark:border-slate-800 bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Award className="h-3.8 w-3.8 text-primary-400" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                {stage.title}
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{stage.description}</p>
            </div>

            {/* Modules inside stage */}
            <div className="flex flex-col gap-4">
              {stage.modules.map((mod) => {
                const isOpen = openModuleIds.includes(mod.id);
                const modCompleted = mod.tasks.filter((t) => completedTasks.includes(t.id)).length;
                const isModDone = modCompleted === mod.tasks.length;

                return (
                  <Card
                    key={mod.id}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "border-slate-300 dark:border-slate-700 shadow-xs" : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900"
                    }`}
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none bg-slate-50/50 dark:bg-slate-950/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isModDone ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}>
                          {isModDone ? "✓" : modCompleted}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-snug">{mod.title}</h4>
                          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">{modCompleted} / {mod.tasks.length} completed</p>
                        </div>
                      </div>
                      <span className="text-slate-400">
                        {isOpen ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4 bg-white dark:bg-slate-900 animate-fade-up">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed">{mod.description}</p>
                        
                        <div className="flex flex-col gap-2.5">
                          {mod.tasks.map((task) => {
                            const isDone = completedTasks.includes(task.id);
                            return (
                              <div
                                key={task.id}
                                className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                                  isDone
                                    ? "bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                                }`}
                              >
                                <div className="flex items-center gap-3.5 truncate">
                                  <input
                                    type="checkbox"
                                    checked={isDone}
                                    onChange={() => handleTaskCheck(task.id)}
                                    className="h-4.5 w-4.5 rounded-lg border-slate-300 dark:border-slate-700 text-primary-600 focus:ring-primary-500 cursor-pointer accent-primary-600"
                                  />
                                  <div className="truncate">
                                    <h5 className={`text-xs font-bold truncate ${isDone ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"}`}>
                                      {task.title}
                                    </h5>
                                    {task.description && !isDone && (
                                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed truncate">
                                        {task.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={task.type === "project" ? "secondary" : task.type === "quiz" ? "warning" : "neutral"} className="text-[8px] py-0 px-2 uppercase shrink-0">
                                    {task.type}
                                  </Badge>
                                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold shrink-0">{task.duration}</span>
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
