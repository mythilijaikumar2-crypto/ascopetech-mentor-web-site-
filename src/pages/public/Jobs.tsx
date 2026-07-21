import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { useAuthStore } from "../../store/authStore";
import { useJobStore } from "../../store/jobStore";
import { mockJobs } from "../../data/jobs";
import { Search, MapPin, Briefcase, Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

export const Jobs: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { savedJobIds, saveJob, unsaveJob } = useJobStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();

  const handleSaveToggle = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Please log in to save and track job applications.");
      navigate("/login");
      return;
    }
    const isSaved = savedJobIds.includes(jobId);
    if (isSaved) {
      unsaveJob(jobId);
      toast.success("Job listing removed from saved bookmarks.");
    } else {
      saveJob(jobId);
      toast.success("Job listing saved! You can track it in your dashboard.");
    }
  };

  const filteredJobs = mockJobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || j.location.includes(selectedLocation);
    const matchesType = selectedType === "All" || j.type === selectedType;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-3">
          <Badge variant="primary" className="max-w-fit">JOB EXPLORER</Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore Open Job Opportunities
          </h1>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            Search, sort, filter, and discover matching developer and marketing roles in top tech companies.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm items-end">
          <div className="md:col-span-6 relative w-full">
            <Input
              type="text"
              label="Keywords"
              placeholder="Search title, company..."
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
              onChange={(e) => setSelectedLocation(e.target.value)}
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
              onChange={(e) => setSelectedType(e.target.value)}
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
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <Briefcase className="h-10 w-10 text-slate-350 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No job listings found</h3>
            <p className="text-xs text-slate-450 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
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
                          <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">
                            {job.title}
                          </h3>
                          <p className="text-[11px] text-slate-450 font-medium">{job.company}</p>
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
                      <Badge variant="success" size="sm">{job.salary}</Badge>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-1">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                    <span className="text-[10px] text-slate-400 font-semibold">{job.datePosted}</span>
                    <Button variant="ghost" size="sm" className="text-primary-600 font-bold">
                      View Details
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
export default Jobs;
