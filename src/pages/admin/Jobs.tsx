import React, { useState } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Modal } from "../../components/common/Modal";
import { Select } from "../../components/common/Select";
import { mockJobs, Job } from "../../data/jobs";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const AdminJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time" as Job["type"],
    experience: "Mid-level" as Job["experience"],
    salary: "",
    remote: "Remote" as Job["remote"],
    category: "Software Development",
    description: "",
    skills: ""
  });

  const handleOpenAdd = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      experience: "Mid-level",
      salary: "",
      remote: "Remote",
      category: "Software Development",
      description: "",
      skills: ""
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      remote: job.remote,
      category: job.category,
      description: job.description,
      skills: job.skills.join(", ")
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.company) return;

    if (editingJob) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === editingJob.id
            ? {
                ...j,
                title: jobForm.title,
                company: jobForm.company,
                location: jobForm.location,
                type: jobForm.type,
                experience: jobForm.experience,
                salary: jobForm.salary,
                remote: jobForm.remote,
                category: jobForm.category,
                description: jobForm.description,
                skills: jobForm.skills.split(",").map((s) => s.trim()).filter(Boolean)
              }
            : j
        )
      );
      toast.success("Job posting updated.");
    } else {
      const newJob: Job = {
        id: `job-${Math.random().toString(36).substr(2, 9)}`,
        title: jobForm.title,
        company: jobForm.company,
        logo: "bg-indigo-650 text-white",
        location: jobForm.location,
        type: jobForm.type,
        experience: jobForm.experience,
        salary: jobForm.salary,
        remote: jobForm.remote,
        category: jobForm.category,
        description: jobForm.description,
        skills: jobForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
        matchPercentage: 90,
        datePosted: "Today"
      };
      setJobs([newJob, ...jobs]);
      toast.success("Job posting created successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this job listing?")) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      toast.success("Job listing removed.");
    }
  };

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="primary">PARTNERSHIPS</Badge>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Manage Job Listings</h1>
          <p className="text-[10px] text-slate-400">Post new employment opportunities, audit qualifications, and delete outdated vacancies.</p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={handleOpenAdd}>
          Add Job Listing
        </Button>
      </div>

      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-6">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search role, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
        </div>

        <div className="overflow-x-auto border border-slate-150 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-455 uppercase tracking-wider">
                <th className="p-4">Title & Company</th>
                <th className="p-4">Location</th>
                <th className="p-4">Job Type</th>
                <th className="p-4">Salary Range</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-655 font-medium">
              {filtered.map((j) => (
                <tr key={j.id} className="hover:bg-slate-50/40">
                  <td className="p-4 font-bold text-slate-800">
                    <div className="flex flex-col">
                      <span>{j.title}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{j.company}</span>
                    </div>
                  </td>
                  <td className="p-4">{j.location}</td>
                  <td className="p-4">
                    <Badge variant="primary" size="sm">{j.type}</Badge>
                  </td>
                  <td className="p-4 text-slate-700 font-semibold">{j.salary}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleOpenEdit(j)} className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(j.id)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingJob ? "Edit Job" : "Add Job"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Job Role Title"
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              required
            />
            <Input
              label="Company"
              value={jobForm.company}
              onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location"
              value={jobForm.location}
              onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
            />
            <Input
              label="Salary Range"
              value={jobForm.salary}
              onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Type"
              value={jobForm.type}
              onChange={(e: any) => setJobForm({ ...jobForm, type: e.target.value })}
              options={[
                { value: "Full-time", label: "Full-time" },
                { value: "Contract", label: "Contract" },
                { value: "Internship", label: "Internship" }
              ]}
            />
            <Select
              label="Experience"
              value={jobForm.experience}
              onChange={(e: any) => setJobForm({ ...jobForm, experience: e.target.value })}
              options={[
                { value: "Entry-level", label: "Entry-level" },
                { value: "Mid-level", label: "Mid-level" },
                { value: "Senior-level", label: "Senior-level" }
              ]}
            />
            <Select
              label="Remote Option"
              value={jobForm.remote}
              onChange={(e: any) => setJobForm({ ...jobForm, remote: e.target.value })}
              options={[
                { value: "Remote", label: "Remote" },
                { value: "Hybrid", label: "Hybrid" },
                { value: "On-site", label: "On-site" }
              ]}
            />
          </div>
          <Input
            label="Required Skills (Comma separated)"
            value={jobForm.skills}
            onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Description Summary</label>
            <textarea
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              className="w-full h-24 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
            />
          </div>
          <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Job
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default AdminJobsPage;
