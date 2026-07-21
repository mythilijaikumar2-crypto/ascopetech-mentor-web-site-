import React, { useState } from "react";
import { m } from "framer-motion";
import { useResumeStore, AnalysisResult } from "../../store/resumeStore";
import { resumeService } from "../../services/resumeService";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { CircularProgress } from "../../components/common/CircularProgress";
import { AiThinkingAnimation } from "../../components/animations/AiThinkingAnimation";
import { Upload, CheckCircle2, AlertTriangle, Play, FileSearch, Sparkles, FileText, Eye } from "lucide-react";

export const ResumeAnalyzer: React.FC = () => {
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Comparator states
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [compareResult, setCompareResult] = useState<AnalysisResult["jdMatch"] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      alert("Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    setFileName(file.name);
    setIsAnalyzing(true);
    setAnalysisStep(1);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      
      if (progress === 40) setAnalysisStep(2);
      if (progress === 80) setAnalysisStep(3);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(async () => {
          const report = await resumeService.analyzeResume(file.name, file.size);
          setResult(report);
          setIsAnalyzing(false);
        }, 600);
      }
    }, 300);
  };

  const handleCompareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) return;

    setIsComparing(true);
    try {
      const matchReport = await resumeService.compareWithJobDescription(resumeText, jobDescription);
      setCompareResult(matchReport);
    } catch {
      // Handled
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="py-6 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Badge variant="primary" className="max-w-fit">ATS SCORING ENGINE</Badge>
        <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          ATS Resume Analyzer & Matcher
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Audit layout blocks, score keyword match percentages, and optimize your CV against job specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: File Upload & Audit Results */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Upload CV for AI Audit</h3>
            
            <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 bg-slate-50 dark:bg-slate-950/50 p-8 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
              <Upload className="h-8 w-8 text-slate-400 group-hover:text-primary-500 mb-2 animate-bounce" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Drop resume here, or click to browse</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Supports PDF, DOC, DOCX up to 5MB</p>
            </div>

            {isAnalyzing && (
              <div className="flex flex-col gap-3 p-4 bg-primary-50/40 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/40 rounded-2xl text-center items-center">
                <AiThinkingAnimation label={
                  analysisStep === 1 ? "Uploading document..." :
                  analysisStep === 2 ? "Parsing layout blocks..." : "Matching ATS keywords..."
                } size="sm" />
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </Card>

          {/* Audit Results Panel */}
          {result && (
            <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-6 animate-fade-up">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">CV Audit Report</h4>
                    <p className="text-[10px] text-slate-400 truncate max-w-[180px]">File: {fileName}</p>
                  </div>
                </div>
                <CircularProgress value={result.score} size={70} strokeWidth={6} label="SCORE" />
              </div>

              {/* Formatting and Checklist lists */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Strong Points</span>
                  {result.strongPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Formatting Issues</span>
                  {result.formattingIssues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Optimization Suggestions</span>
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0 mt-2 ml-1" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Side: Job Description Matcher */}
        <div className="lg:col-span-6">
          <Card className="p-6 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">Job Description Match Calculator</h3>
            </div>
            
            <form onSubmit={handleCompareSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Paste Resume Text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your CV plain text content here..."
                  className="w-full h-28 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl text-xs focus:outline-none focus:border-primary-500 transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Target Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description requirements here..."
                  className="w-full h-28 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl text-xs focus:outline-none focus:border-primary-500 transition-colors"
                  required
                />
              </div>

              <Button type="submit" variant="primary" isLoading={isComparing} leftIcon={<Play className="h-4 w-4" />}>
                Calculate ATS Match %
              </Button>
            </form>

            {/* Comparison results */}
            {compareResult && (
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl mt-2"
              >
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Match Percentage Result:</span>
                  <span className="text-base font-extrabold text-primary-600 dark:text-primary-400">{compareResult.matchPercentage}% Ratio</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Found Keywords</span>
                    <div className="flex flex-wrap gap-1">
                      {compareResult.matchingSkills.map((s) => (
                        <Badge key={s} variant="success" className="text-[8px] px-2 py-0">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Missing Keywords</span>
                    <div className="flex flex-wrap gap-1">
                      {compareResult.missingSkills.map((s) => (
                        <Badge key={s} variant="danger" className="text-[8px] px-2 py-0">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Optimization Checklist</span>
                  {compareResult.suggestions.map((sug, i) => (
                    <p key={i} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      💡 {sug}
                    </p>
                  ))}
                </div>
              </m.div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
