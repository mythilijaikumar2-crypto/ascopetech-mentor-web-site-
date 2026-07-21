import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../../store/jobStore";
import { useResumeStore } from "../../store/resumeStore";
import { useProfileStore } from "../../store/profileStore";
import { mockJobs } from "../../data/jobs";
import { mockCareers } from "../../data/careers";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { Modal } from "../../components/common/Modal";
import { Search, MapPin, Briefcase, Bookmark, BookmarkCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Jobs: React.FC = () => {
  const { savedJobIds, saveJob, unsaveJob, applyToJob, applications } = useJobStore();
  const { resumes } = useResumeStore();
  const { selectedGoal } = useProfileStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  
  // Application Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const navigate = useNavigate();

  const handleSaveToggle = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isSaved = savedJobIds.includes(id);
    if (isSaved) {
      unsaveJob(id);
      toast.success("Job listing removed from saved bookmarks.");
    } else {
      saveJob(id);
      toast.success("Job listing bookmarked!");
    }
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

  // Find candidate's target career category
  const targetCareer = mockCareers.find((c) => c.id === selectedGoal);
  
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || job.location.includes(selectedLocation);
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="py-8 flex flex-col gap-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <Badge variant="primary">RECOMMENDED JOBS</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Jobs Matching Your Profile
          </h1>
          <p className="text-xs text-slate-505 leading-relaxed mt-0.5">
            Explore listings matching your {targetCareer ? `'${targetCareer.title}'` : ""} profile readiness score.
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm items-end">
        <div className="md:col-span-6 relative w-full">
          <Input
            type="text"
            label="Keywords"
            placeholder="Search roles, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3.5 top-10 h-4.5 w-4.5 text-slate-400" />
        </div>
        <div className="md:col-span-3 w-full">
          <Select
            label="Location"
            value={selectedLocation}
            onChange={(e: any) => setSelectedLocation(e.target.value)}
            options={[
              { value: "All", label: "All Locations" },
              { value: "San Francisco", label: "San Francisco, CA" },
              { value: "Austin", label: "Austin, TX" },
              { value: "Seattle", label: "Seattle, WA" },
              { value: "Remote", label: "Remote" }
            ]}
          />
        </div>
        <div className="md:col-span-3 w-full">
          <Select
            label="Job Type"
            value={selectedType}
            onChange={(e: any) => setSelectedType(e.target.value)}
            options={[
              { value: "All", label: "All Types" },
              { value: "Full-time", label: "Full-time" },
              { value: "Contract", label: "Contract" },
              { value: "Internship", label: "Internship" }
            ]}
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <Card className="py-16 text-center border-slate-200/80 bg-white shadow-sm p-8 max-w-lg mx-auto flex flex-col items-center gap-4">
          <Briefcase className="h-10 w-10 text-slate-300" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">No matching jobs found</h3>
            <p className="text-xs text-slate-450 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const isSaved = savedJobIds.includes(job.id);
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
                        <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">{job.title}</h3>
                        <p className="text-[11px] text-slate-450 font-semibold mt-0.5">{job.company}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleSaveToggle(e, job.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isSaved ? "bg-primary-50 text-primary-600" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      }`}
                    >
                      {isSaved ? <BookmarkCheck className="h-4.5 w-4.5" /> : <Bookmark className="h-4.5 w-4.5" />}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="primary" size="sm">{job.type}</Badge>
                    <Badge variant="neutral" size="sm" className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </Badge>
                    <Badge variant="secondary" size="sm" className="inline-flex items-center gap-1 font-bold">
                      <Sparkles className="h-3 w-3" /> {job.matchPercentage}% Match
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-1">
                    {job.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                  <span className="text-[10px] text-slate-400 font-semibold">{job.datePosted}</span>
                  <div className="flex gap-2">
                    <Button
                      variant={isApplied ? "ghost" : "primary"}
                      size="sm"
                      disabled={isApplied}
                      onClick={(e) => handleApplyClick(e, job.id)}
                    >
                      {isApplied ? "Applied" : "Quick Apply"}
                    </Button>
                  </div>
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
export default Jobs;
