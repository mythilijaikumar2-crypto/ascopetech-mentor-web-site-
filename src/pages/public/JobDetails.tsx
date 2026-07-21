import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockJobs, Job } from "../../data/jobs";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Select } from "../../components/common/Select";
import { useAuthStore } from "../../store/authStore";
import { useJobStore } from "../../store/jobStore";
import { useResumeStore } from "../../store/resumeStore";
import { ArrowLeft, MapPin, Briefcase, DollarSign, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const { isAuthenticated } = useAuthStore();
  const { savedJobIds, saveJob, unsaveJob, applyToJob, applications } = useJobStore();
  const { resumes } = useResumeStore();
  
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const found = mockJobs.find((j) => j.id === jobId);
    if (found) {
      setJob(found);
    }
  }, [jobId]);

  if (!job) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Job posting not found</h2>
        <Link to="/jobs" className="text-primary-600 hover:underline mt-2 inline-block">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const alreadyApplied = applications.some((app) => app.jobId === job.id);

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to bookmark jobs.");
      navigate("/login");
      return;
    }
    if (isSaved) {
      unsaveJob(job.id);
      toast.success("Job removed from saved bookmarks.");
    } else {
      saveJob(job.id);
      toast.success("Job bookmarked successfully!");
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      toast.info("Please log in to apply for job postings.");
      navigate("/login");
      return;
    }
    if (resumes.length === 0) {
      toast.warning("You must build or upload a resume in the Resume Builder before applying.");
      navigate("/candidate/resumes");
      return;
    }
    // Set default resume
    setSelectedResumeId(resumes[0].id);
    setIsApplyModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResumeId) return;

    setIsApplying(true);
    setTimeout(() => {
      const selectedCv = resumes.find((r) => r.id === selectedResumeId);
      applyToJob({
        id: `app-${Math.random().toString(36).substr(2, 9)}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        resumeId: selectedResumeId,
        resumeTitle: selectedCv?.title || "My Resume",
        coverNote,
        status: "Applied",
        appliedDate: new Date().toLocaleDateString()
      });
      
      setIsApplying(false);
      setIsApplyModalOpen(false);
      toast.success("Your application has been successfully submitted!");
    }, 1200);
  };

  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        
        {/* Back navigation */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" /> Back to Jobs Explorer
        </Link>

        {/* Job Heading Card */}
        <Card className="p-8 border-slate-100 bg-white shadow-sm flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-sm ${job.logo}`}>
                {job.company.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                  {job.title}
                </h1>
                <p className="text-xs text-slate-450 mt-0.5">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Badge variant="primary" className="text-xs">{job.type}</Badge>
              <Badge variant="secondary" className="text-xs inline-flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> {job.matchPercentage}% Match
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-slate-100 py-6 my-2">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Location</p>
              <p className="text-xs font-bold text-slate-700 mt-1">{job.location}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide inline-flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> Salary Range</p>
              <p className="text-xs font-bold text-slate-700 mt-1">{job.salary}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Experience</p>
              <p className="text-xs font-bold text-slate-700 mt-1">{job.experience}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Date Posted</p>
              <p className="text-xs font-bold text-slate-700 mt-1">{job.datePosted}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleSaveToggle}
            >
              {isSaved ? "Saved Listing" : "Bookmark Job"}
            </Button>
            <Button
              variant="primary"
              disabled={alreadyApplied}
              onClick={handleApplyClick}
            >
              {alreadyApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </Card>

        {/* Description & Skill requirements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Description */}
          <Card className="md:col-span-2 p-8 border-slate-100 bg-white shadow-sm flex flex-col gap-5">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-3">
              Role Specification & Scope
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {job.description}
            </p>
            <h4 className="text-xs font-bold text-slate-800 mt-2">Key Responsibilities</h4>
            <ul className="list-disc pl-5 text-xs text-slate-600 flex flex-col gap-2 leading-relaxed">
              <li>Collaborate with product designers, managers, and backend engineers to launch performant digital tools.</li>
              <li>Participate in design systems development and code optimization cycles.</li>
              <li>Translate wireframes into modular, dry components with rich animation transitions.</li>
            </ul>
          </Card>

          {/* Core Skills Required */}
          <Card className="p-6 border-slate-100 bg-white shadow-sm flex flex-col gap-4 self-start">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-3">
              Desired Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2.5 py-0.8 text-[10px]">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Application Modal */}
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title={`Apply to ${job.company}`}
        >
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h4 className="text-xs font-bold text-slate-800">Applying for: {job.title}</h4>
              <p className="text-[11px] text-slate-400">Please select which cv to submit and compose a short cover letter.</p>
            </div>

            <Select
              label="Submit Resume"
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              options={resumes.map((r) => ({ value: r.id, label: `${r.title} (ATS Score: ${r.score}%)` }))}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 tracking-wide">
                Introduce Yourself (Optional)
              </label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Briefly state why you're a great fit for this role..."
                className="w-full h-32 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4 border-t border-slate-50 pt-4">
              <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isApplying}>
                Submit Application
              </Button>
            </div>
          </form>
        </Modal>

      </div>
    </div>
  );
};
export default JobDetails;
