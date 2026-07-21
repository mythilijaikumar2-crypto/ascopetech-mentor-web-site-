import React, { useEffect, useState } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { Modal } from "../../components/common/Modal";
import { Job } from "../../data/jobs";
import { useJobs, useCareers } from "../../hooks";
import {
  Users,
  Target,
  FileText,
  Briefcase,
  Search,
  Plus,
  Edit,
  Trash2,
  Download,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { toast } from "sonner";

export const AdminDashboard: React.FC = () => {
  const { jobs: initialJobs } = useJobs();
  const { careers } = useCareers();
  const [activeTab, setActiveTab] = useState<"jobs" | "candidates" | "users">("jobs");
  
  // Jobs Database Mock State for CRUD
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchJob, setSearchJob] = useState("");

  useEffect(() => {
    if (initialJobs.length > 0) {
      setJobs(initialJobs);
    }
  }, [initialJobs]);
  
  // Job modal state
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
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

  // Mock candidates database
  const candidates = [
    { name: "Alex Mercer", email: "candidate@careerai.com", goal: "Frontend Developer", status: "Active", progress: "85%", score: 82 },
    { name: "Sarah Jenkins", email: "sarah@gmail.com", goal: "UI/UX Designer", status: "Active", progress: "92%", score: 88 },
    { name: "David Chen", email: "chen.d@outlook.com", goal: "Data Scientist", status: "Review", progress: "70%", score: 75 },
    { name: "Emily Watson", email: "emily@gmail.com", goal: "Product Manager", status: "Inactive", progress: "40%", score: 68 }
  ];

  // Recharts analytics data
  const analyticsData = [
    { name: "Jan", Signups: 45, Applications: 80, Matches: 120 },
    { name: "Feb", Signups: 60, Applications: 95, Matches: 140 },
    { name: "Mar", Signups: 85, Applications: 130, Matches: 190 },
    { name: "Apr", Signups: 120, Applications: 175, Matches: 240 },
    { name: "May", Signups: 150, Applications: 220, Matches: 310 }
  ];

  const handleOpenAddJob = () => {
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
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job: Job) => {
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
    setIsJobModalOpen(true);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.company) return;

    if (editingJob) {
      // Update operation
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
      toast.success("Job posting updated successfully!");
    } else {
      // Create operation
      const newJob: Job = {
        id: `job-${Math.random().toString(36).substr(2, 9)}`,
        title: jobForm.title,
        company: jobForm.company,
        logo: "bg-indigo-600 text-white",
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
      toast.success("New job listing successfully posted!");
    }
    setIsJobModalOpen(false);
  };

  const handleJobDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this job listing?")) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      toast.success("Job posting removed.");
    }
  };

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(searchJob.toLowerCase()) ||
    j.company.toLowerCase().includes(searchJob.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Admin stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Candidates", value: "3,480", change: "+12% this month", icon: Users, color: "text-indigo-600 bg-indigo-50" },
          { label: "AI Matches Built", value: "12,940", change: "98.5% precision", icon: Target, color: "text-violet-600 bg-violet-50" },
          { label: "Resumes Audited", value: "5,820", change: "+180 today", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
          { label: "Active Listings", value: jobs.length, change: "partner postings", icon: Briefcase, color: "text-amber-600 bg-amber-50" }
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-slate-200/80 bg-white shadow-sm flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <span className="text-lg font-extrabold text-slate-900 leading-tight">{stat.value}</span>
              <span className="text-[10px] text-slate-400 font-medium">{stat.change}</span>
            </div>
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics chart */}
      <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Platform Growth Metrics</h3>
            <p className="text-[10px] text-slate-405">Monitor signup rates, resume comparisons, and match counts.</p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />} onClick={() => toast.success("Exported simulated growth statistics CSV!")}>
            Export CSV
          </Button>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Signups" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Applications" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Matches" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Database tabbed console */}
      <div className="flex flex-col gap-6">
        <div className="flex border-b border-slate-200 gap-6">
          {(["jobs", "candidates", "users"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3.5 text-xs font-bold uppercase tracking-wider transition-all relative ${
                activeTab === tab ? "text-primary-600" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab} database
              {activeTab === tab && (
                <div className="absolute bottom-0 inset-x-0 h-0.8 bg-primary-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content: Jobs CRUD */}
        {activeTab === "jobs" && (
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="w-full sm:w-80 relative">
                <Input
                  placeholder="Search jobs, company..."
                  value={searchJob}
                  onChange={(e) => setSearchJob(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              </div>
              <Button
                variant="primary"
                leftIcon={<Plus className="h-4.5 w-4.5" />}
                onClick={handleOpenAddJob}
              >
                Add New Job listing
              </Button>
            </div>

            <div className="overflow-x-auto border border-slate-150 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    <th className="p-4">Title & Company</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Job Type</th>
                    <th className="p-4">Salary</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-655 font-medium">
                  {filteredJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col gap-0.5">
                          <strong className="text-slate-800 font-bold">{j.title}</strong>
                          <span className="text-[10px] text-slate-400">{j.company}</span>
                        </div>
                      </td>
                      <td className="p-4">{j.location}</td>
                      <td className="p-4">
                        <Badge variant="primary" size="sm">{j.type}</Badge>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{j.salary}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditJob(j)}
                            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleJobDelete(j.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg"
                          >
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
        )}

        {/* Tab content: Candidates list */}
        {activeTab === "candidates" && (
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-6 animate-fade-up">
            <div className="overflow-x-auto border border-slate-150 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    <th className="p-4">Candidate Details</th>
                    <th className="p-4">Selected Goal</th>
                    <th className="p-4">Onboarding Progress</th>
                    <th className="p-4">Assessment Match</th>
                    <th className="p-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-655 font-medium">
                  {candidates.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col gap-0.5">
                          <strong className="text-slate-800 font-bold">{c.name}</strong>
                          <span className="text-[10px] text-slate-400">{c.email}</span>
                        </div>
                      </td>
                      <td className="p-4">{c.goal}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: c.progress }} />
                          </div>
                          <span>{c.progress}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{c.score}% Match</td>
                      <td className="p-4 text-right">
                        <Badge variant={c.status === "Active" ? "success" : c.status === "Review" ? "warning" : "neutral"} size="sm">
                          {c.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Tab content: Users list */}
        {activeTab === "users" && (
          <Card className="p-6 border-slate-200/80 bg-white shadow-sm flex flex-col gap-6 animate-fade-up">
            <div className="overflow-x-auto border border-slate-150 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-450 uppercase tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">System Role</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-655 font-medium">
                  {[
                    { name: "Alex Mercer", email: "candidate@careerai.com", role: "candidate" },
                    { name: "System Admin", email: "admin@careerai.com", role: "admin" }
                  ].map((usr, i) => (
                    <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{usr.name}</td>
                      <td className="p-4">{usr.email}</td>
                      <td className="p-4">
                        <Badge variant={usr.role === "admin" ? "danger" : "primary"} size="sm">{usr.role}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="text-red-500" disabled={usr.role === "admin"}>
                          Delete Account
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Add/Edit Job Modal */}
      <Modal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        title={editingJob ? "Edit Job Posting" : "Create Job Posting"}
        size="xl"
      >
        <form onSubmit={handleJobSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Role Title"
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              required
            />
            <Input
              label="Company Name"
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
              placeholder="e.g. Austin, TX"
            />
            <Input
              label="Salary Range"
              value={jobForm.salary}
              onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
              placeholder="e.g. $100k - $120k"
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
            placeholder="e.g. React, TypeScript, Git"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Description Summary</label>
            <textarea
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              placeholder="Detail job requirements, experience, responsibilities..."
              className="w-full h-24 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
            <Button variant="ghost" onClick={() => setIsJobModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingJob ? "Save Details" : "Create Posting"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
export default AdminDashboard;
