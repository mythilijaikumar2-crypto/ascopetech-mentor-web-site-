import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../../store/jobStore";
import { useResumeStore } from "../../store/resumeStore";
import { mockJobs } from "../../data/jobs";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Select } from "../../components/common/Select";
import { Modal } from "../../components/common/Modal";
import { Bookmark, MapPin, Briefcase, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const SavedJobs: React.FC = () => {
  const { savedJobIds, unsaveJob, applyToJob, applications } = useJobStore();
  const { resumes } = useResumeStore();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const savedJobs = mockJobs.filter((j) => savedJobIds.includes(j.id));

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    unsaveJob(id);
    toast.success("Job listing removed from saved bookmarks.");
  };

  const handleApplyClick = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    if (resumes.length === 0) {
      toast.warning("You must build or upload a resume in the Resume Builder before applying.");
      navigate("/candidate/resumes");
      return;
    }
    setActiveJobId(jobId);
    setResumeId(resumes[0].id);
    setCoverNote("");
    setIsModalOpen(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeJobId || !resumeId) return;

    setIsApplying(true);
    setTimeout(() => {
      const targetJob = mockJobs.find((j) => j.id === activeJobId);
      const selectedCv = resumes.find((r) => r.id === resumeId);
      if (targetJob && selectedCv) {
        applyToJob({
          id: `app-${Math.random().toString(36).substr(2, 9)}`,
          jobId: targetJob.id,
          jobTitle: targetJob.title,
          company: targetJob.company,
          resumeId,
          resumeTitle: selectedCv.title,
          coverNote,
          status: "Applied",
          appliedDate: new Date().toLocaleDateString()
        });
        toast.success(`Application submitted to ${targetJob.company}!`);
      }
      setIsApplying(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="py-8 flex flex-col gap-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">BOOKMARKED</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Saved Job Listings</h1>
        <p className="text-[10px] text-slate-400">Review, unsave, or submit applications to your bookmarked positions.</p>
      </div>

      {savedJobs.length === 0 ? (
        <Card className="py-16 text-center border-slate-200 bg-white shadow-sm p-8 max-w-lg mx-auto flex flex-col items-center gap-4">
          <Bookmark className="h-10 w-10 text-slate-300" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">No bookmarked jobs</h3>
            <p className="text-xs text-slate-455 mt-1">Explore job matches and click bookmarks to track them here.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate("/candidate/jobs")}>
            Browse Job Matches
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => {
            const isApplied = applications.some((app) => app.jobId === job.id);
            return (
              <Card
                key={job.id}
                variant="interactive"
                className="p-6 cursor-pointer flex flex-col justify-between min-h-[220px]"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-xs ${job.logo}`}>
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 tracking-tight">{job.title}</h3>
                        <p className="text-[11px] text-slate-450 font-semibold">{job.company}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemove(e, job.id)}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="primary" size="sm">{job.type}</Badge>
                    <Badge variant="neutral" size="sm" className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                  <span className="text-[10px] text-slate-400 font-semibold">{job.datePosted}</span>
                  <Button
                    variant={isApplied ? "ghost" : "primary"}
                    size="sm"
                    disabled={isApplied}
                    onClick={(e) => handleApplyClick(e, job.id)}
                  >
                    {isApplied ? "Applied" : "Quick Apply"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Apply Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Quick Application">
        <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
          <Select
            label="Select Resume"
            value={resumeId}
            onChange={(e: any) => setResumeId(e.target.value)}
            options={resumes.map((r) => ({ value: r.id, label: `${r.title} (ATS Score: ${r.score}%)` }))}
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Cover Note (Optional)</label>
            <textarea
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Introduce yourself to the recruiter..."
              className="w-full h-28 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4 border-t border-slate-50 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isApplying}>
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default SavedJobs;
