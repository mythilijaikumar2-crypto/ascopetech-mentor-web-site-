import React, { useState } from "react";
import { m } from "framer-motion";
import { useResumeStore, AnalysisResult } from "../../store/resumeStore";
import { resumeService } from "../../services/resumeService";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Upload, CheckCircle2, AlertTriangle, Play, RefreshCw, FileSearch, Sparkles } from "lucide-react";
import { toast } from "sonner";

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
      toast.error("Format error. Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    setFileName(file.name);
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Staggered analysis phases
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      
      if (progress === 40) setAnalysisStep(2); // parsing text
      if (progress === 80) setAnalysisStep(3); // matching keywords
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(async () => {
          const report = await resumeService.analyzeResume(file.name, file.size);
          setResult(report);
          setIsAnalyzing(false);
          toast.success("Resume analysis complete!");
        }, 800);
      }
    }, 400);
  };

  const handleCompareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast.error("Please provide both your resume content and the job description.");
      return;
    }

    setIsComparing(true);
    try {
      const matchReport = await resumeService.compareWithJobDescription(resumeText, jobDescription);
      setCompareResult(matchReport);
      toast.success("Job description comparison finished!");
    } catch (err) {
      toast.error("Comparison failed.");
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="py-8 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Badge variant="primary" className="max-w-fit">ATS ANALYSIS</Badge>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
          ATS Resume Analyzer
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
          Scan your CV structure, verify keyword densities, and compare parameters against custom job listings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Upload Dropzone & Analysis Results */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* File Dropzone */}
          <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Upload Resume for Audit</h3>
            
            <div className="relative border-2 border-dashed border-slate-200 hover:border-primary-500 bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isAnalyzing}
              />
              <Upload className="h-7 w-7 text-slate-400 group-hover:text-primary-600 mb-2.5 animate-pulse" />
              <p className="text-xs font-bold text-slate-700">Drop resume here, or click to browse</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF, DOC, DOCX up to 5MB</p>
            </div>

            {isAnalyzing && (
              <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl mt-2 text-center items-center">
                <span className="text-xs font-bold text-slate-700 animate-pulse">
                  {analysisStep === 1 && "Uploading document..."}
                  {analysisStep === 2 && "Parsing layout and text nodes..."}
                  {analysisStep === 3 && "Evaluating formatting checklists..."}
                </span>
                <div className="w-full h-1.5 bg-slate-150 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </Card>

          {/* Audit Results Panel */}
          {result && (
            <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-6 animate-fade-up">
              <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">CV Audit Report</h4>
                  <p className="text-[9px] text-slate-400 truncate">Filename: {fileName}</p>
                </div>
                <Badge variant="primary" className="text-sm font-extrabold px-3 py-1 bg-primary-50 border-primary-100 text-primary-700 rounded-xl">
                  {result.score}% Rating
                </Badge>
              </div>

              {/* Formatting and Checklist lists */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Strong Points</span>
                  {result.strongPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-655 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-slate-50 pt-3">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Formatting & Improvements</span>
                  {result.formattingIssues.map((issue, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-655 leading-relaxed">
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2 border-t border-slate-50 pt-3">
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide">Optimization Checklist</span>
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-655 leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-350 shrink-0 mt-2 ml-1" />
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
          <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-800 tracking-tight">Job Match Calculator</h3>
            </div>
            
            <form onSubmit={handleCompareSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Paste Resume Text</label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your CV plain text content here..."
                  className="w-full h-32 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Target Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description requirements here..."
                  className="w-full h-32 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                  required
                />
              </div>

              <Button type="submit" variant="primary" isLoading={isComparing} leftIcon={<Play className="h-4 w-4" />}>
                Compare & Calculate Match %
              </Button>
            </form>

            {/* Comparison results */}
            {compareResult && (
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-5 bg-slate-50 border border-slate-100 p-4 rounded-xl mt-3"
              >
                <div className="flex justify-between items-center border-b border-slate-150/60 pb-3">
                  <span className="text-xs font-bold text-slate-700">Comparator Match Result:</span>
                  <span className="text-base font-extrabold text-primary-650">{compareResult.matchPercentage}% Ratio</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Matching Keywords</span>
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

                <div className="flex flex-col gap-2 border-t border-slate-150/60 pt-3">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Optimization Checklist</span>
                  {compareResult.suggestions.map((sug, i) => (
                    <p key={i} className="text-xs text-slate-600 leading-relaxed">
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
