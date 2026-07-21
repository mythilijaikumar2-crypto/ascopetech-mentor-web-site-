import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useResumeStore, Resume, ResumeExperience, ResumeEducation, ResumeProject } from "../../store/resumeStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Printer,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { toast } from "sonner";

export const ResumeEdit: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { resumes, updateResume } = useResumeStore();
  const navigate = useNavigate();

  const [resume, setResume] = useState<Resume | null>(null);

  // Selected Template
  const [template, setTemplate] = useState<"classic" | "modern" | "creative">("classic");
  const [title, setTitle] = useState("");
  
  // Section collapsibles
  const [expandedSection, setExpandedSection] = useState<string>("personal");

  // Resume Data States
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: ""
  });
  const [objective, setObjective] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  
  // Lists
  const [experience, setExperience] = useState<ResumeExperience[]>([]);
  const [education, setEducation] = useState<ResumeEducation[]>([]);
  const [projects, setProjects] = useState<ResumeProject[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");

  // Load existing resume details on mount
  useEffect(() => {
    const original = resumes.find((r) => r.id === resumeId);
    if (original) {
      setResume(original);
      setTitle(original.title);
      setTemplate(original.template);
      setPersonalInfo(original.personalInfo);
      setObjective(original.objective);
      setSkills(original.skills);
      setExperience(original.experience);
      setEducation(original.education);
      setProjects(original.projects);
      setCertifications(original.certifications);
    }
  }, [resumeId, resumes]);

  if (!resume) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Resume not found</h2>
        <Link to="/candidate/resumes" className="text-primary-600 hover:underline">
          Back to Resumes
        </Link>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  // Add items
  const handleAddExp = () => {
    const newExp: ResumeExperience = {
      id: `exp-${Math.random().toString(36).substr(2, 9)}`,
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setExperience((prev) => [...prev, newExp]);
  };

  const handleUpdateExp = (id: string, fields: Partial<ResumeExperience>) => {
    setExperience((prev) => prev.map((exp) => (exp.id === id ? { ...exp, ...fields } : exp)));
  };

  const handleRemoveExp = (id: string) => {
    setExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleAddEdu = () => {
    const newEdu: ResumeEducation = {
      id: `edu-${Math.random().toString(36).substr(2, 9)}`,
      school: "",
      degree: "",
      field: "",
      graduationYear: ""
    };
    setEducation((prev) => [...prev, newEdu]);
  };

  const handleUpdateEdu = (id: string, fields: Partial<ResumeEducation>) => {
    setEducation((prev) => prev.map((edu) => (edu.id === id ? { ...edu, ...fields } : edu)));
  };

  const handleRemoveEdu = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleAddProject = () => {
    const newProj: ResumeProject = {
      id: `proj-${Math.random().toString(36).substr(2, 9)}`,
      title: "",
      description: "",
      link: ""
    };
    setProjects((prev) => [...prev, newProj]);
  };

  const handleUpdateProj = (id: string, fields: Partial<ResumeProject>) => {
    setProjects((prev) => prev.map((proj) => (proj.id === id ? { ...proj, ...fields } : proj)));
  };

  const handleRemoveProj = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) return;
    setSkills((prev) => [...prev, skillInput.trim()]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  // Add Certification
  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    if (certifications.includes(certInput.trim())) return;
    setCertifications((prev) => [...prev, certInput.trim()]);
    setCertInput("");
  };

  const handleRemoveCert = (cert: string) => {
    setCertifications((prev) => prev.filter((c) => c !== cert));
  };

  // Submit and Save
  const handleSave = () => {
    if (!personalInfo.name || !personalInfo.email) {
      toast.error("Please fill in your name and email in the Personal Details section.");
      setExpandedSection("personal");
      return;
    }

    updateResume(resume.id, {
      title,
      template,
      personalInfo,
      objective,
      experience,
      education,
      skills,
      certifications,
      projects
    });
    toast.success("Resume changes saved successfully!");
    navigate("/candidate/resumes");
  };

  return (
    <div className="py-8 flex flex-col gap-6 min-h-screen">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-5 no-print">
        <div className="flex items-center gap-3">
          <Link to="/candidate/resumes" className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-655 rounded-xl transition-all">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Edit Resume</h1>
            <p className="text-[10px] text-slate-400">Modifying CV details in live layout mode.</p>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Select
            options={[
              { value: "classic", label: "Classic Layout" },
              { value: "modern", label: "Modern Layout" },
              { value: "creative", label: "Creative Layout" }
            ]}
            value={template}
            onChange={(e: any) => setTemplate(e.target.value)}
            className="w-40"
          />
          <Button variant="outline" leftIcon={<Printer className="h-4.5 w-4.5" />} onClick={() => window.print()}>
            Print / PDF
          </Button>
          <Button variant="primary" leftIcon={<Save className="h-4.5 w-4.5" />} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Accordion Forms */}
        <div className="lg:col-span-6 flex flex-col gap-4 no-print">
          <Input
            label="Resume Document Title"
            id="docTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 1. Personal Details */}
          <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <button
              onClick={() => toggleSection("personal")}
              className="w-full flex items-center justify-between font-bold text-slate-800 text-xs tracking-tight"
            >
              <span>1. PERSONAL DETAILS</span>
              {expandedSection === "personal" ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
            </button>
            
            {expandedSection === "personal" && (
              <div className="flex flex-col gap-4.5 pt-3 border-t border-slate-50">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email Address"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                  <Input
                    label="Location (City, State)"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="LinkedIn Profile URL"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                  />
                  <Input
                    label="Personal Website URL"
                    value={personalInfo.website}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                  />
                </div>
              </div>
            )}
          </Card>

          {/* 2. Objective */}
          <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <button
              onClick={() => toggleSection("objective")}
              className="w-full flex items-center justify-between font-bold text-slate-800 text-xs tracking-tight"
            >
              <span>2. PROFESSIONAL OBJECTIVE</span>
              {expandedSection === "objective" ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
            </button>

            {expandedSection === "objective" && (
              <div className="flex flex-col gap-1.5 pt-3 border-t border-slate-50">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Objective Summary</label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="w-full h-24 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                />
              </div>
            )}
          </Card>

          {/* 3. Experience */}
          <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <button
              onClick={() => toggleSection("experience")}
              className="w-full flex items-center justify-between font-bold text-slate-800 text-xs tracking-tight"
            >
              <span>3. WORK EXPERIENCE</span>
              {expandedSection === "experience" ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
            </button>

            {expandedSection === "experience" && (
              <div className="flex flex-col gap-6 pt-3 border-t border-slate-50">
                {experience.map((exp, idx) => (
                  <div key={exp.id} className="flex flex-col gap-4 p-4 border border-slate-100 bg-slate-50/50 rounded-xl relative">
                    <button
                      onClick={() => handleRemoveExp(exp.id)}
                      className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-3.8 w-3.8" />
                    </button>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Position {idx + 1}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Company"
                        value={exp.company}
                        onChange={(e) => handleUpdateExp(exp.id, { company: e.target.value })}
                      />
                      <Input
                        label="Role Title"
                        value={exp.role}
                        onChange={(e) => handleUpdateExp(exp.id, { role: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateExp(exp.id, { startDate: e.target.value })}
                      />
                      <Input
                        label="End Date"
                        value={exp.endDate}
                        onChange={(e) => handleUpdateExp(exp.id, { endDate: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Key Achievements</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleUpdateExp(exp.id, { description: e.target.value })}
                        className="w-full h-20 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />} className="justify-center py-2" onClick={handleAddExp}>
                  Add Work Experience
                </Button>
              </div>
            )}
          </Card>

          {/* 4. Education */}
          <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <button
              onClick={() => toggleSection("education")}
              className="w-full flex items-center justify-between font-bold text-slate-800 text-xs tracking-tight"
            >
              <span>4. ACADEMIC EDUCATION</span>
              {expandedSection === "education" ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
            </button>

            {expandedSection === "education" && (
              <div className="flex flex-col gap-6 pt-3 border-t border-slate-50">
                {education.map((edu, idx) => (
                  <div key={edu.id} className="flex flex-col gap-4 p-4 border border-slate-100 bg-slate-50/50 rounded-xl relative">
                    <button
                      onClick={() => handleRemoveEdu(edu.id)}
                      className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-3.8 w-3.8" />
                    </button>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Education {idx + 1}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="School"
                        value={edu.school}
                        onChange={(e) => handleUpdateEdu(edu.id, { school: e.target.value })}
                      />
                      <Input
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEdu(edu.id, { degree: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Field"
                        value={edu.field}
                        onChange={(e) => handleUpdateEdu(edu.id, { field: e.target.value })}
                      />
                      <Input
                        label="Graduation Year"
                        value={edu.graduationYear}
                        onChange={(e) => handleUpdateEdu(edu.id, { graduationYear: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />} className="justify-center py-2" onClick={handleAddEdu}>
                  Add Academic Education
                </Button>
              </div>
            )}
          </Card>

          {/* 5. Skills */}
          <Card className="p-5 border-slate-200 bg-white shadow-sm flex flex-col gap-4">
            <button
              onClick={() => toggleSection("skills")}
              className="w-full flex items-center justify-between font-bold text-slate-800 text-xs tracking-tight"
            >
              <span>5. CORE SKILLS</span>
              {expandedSection === "skills" ? <ChevronUp className="h-4.5 w-4.5" /> : <ChevronDown className="h-4.5 w-4.5" />}
            </button>

            {expandedSection === "skills" && (
              <div className="flex flex-col gap-4 pt-3 border-t border-slate-50">
                <form onSubmit={handleAddSkill} className="flex gap-2">
                  <Input
                    placeholder="Enter skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <Button type="submit" variant="outline" className="mt-6 py-2.5">
                    Add
                  </Button>
                </form>
                <div className="flex flex-wrap gap-2 min-h-12 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  {skills.length === 0 ? (
                    <span className="text-xs text-slate-400 self-center mx-auto">No skills added.</span>
                  ) : (
                    skills.map((skill) => (
                      <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-250 text-slate-700 text-xs font-semibold rounded-full shadow-sm">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-slate-400 hover:text-slate-700 font-bold">×</button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Side Sticky Preview */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto bg-white border border-slate-200 p-8 rounded-2xl shadow-lg print-area">
          <div className="flex justify-between items-center mb-6 no-print">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Live Document Preview</span>
            <Badge variant="primary" className="capitalize">{template} template</Badge>
          </div>

          <div className="text-slate-900 text-xs">
            {template === "classic" && (
              <div className="flex flex-col gap-5 font-serif">
                <div className="text-center flex flex-col gap-1 border-b-2 border-slate-800 pb-4">
                  <h2 className="text-xl font-bold uppercase tracking-wide">{personalInfo.name || "YOUR NAME"}</h2>
                  <p className="text-[10px] text-slate-500 font-sans">
                    {personalInfo.email || "email@domain.com"} | {personalInfo.phone || "Phone"} | {personalInfo.location || "Location"}
                  </p>
                  <p className="text-[9px] text-slate-450 font-sans">
                    {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`} {personalInfo.website && `| Website: ${personalInfo.website}`}
                  </p>
                </div>
                {objective && (
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1">Professional Objective</h3>
                    <p className="leading-relaxed text-slate-650">{objective}</p>
                  </div>
                )}
                {experience.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1">Professional Experience</h3>
                    {experience.map((exp) => (
                      <div key={exp.id} className="flex flex-col gap-0.8">
                        <div className="flex justify-between items-start font-sans">
                          <strong className="text-slate-800">{exp.role}</strong>
                          <span className="text-[10px] text-slate-500">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-[10px] font-semibold text-slate-600 font-sans">{exp.company}</p>
                        <p className="text-[10px] leading-relaxed text-slate-500 mt-1 whitespace-pre-line">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider border-b border-slate-200 pb-1">Academic Background</h3>
                    {education.map((edu) => (
                      <div key={edu.id} className="flex flex-col gap-0.5 font-sans">
                        <div className="flex justify-between items-start">
                          <strong className="text-slate-800">{edu.degree} in {edu.field}</strong>
                          <span className="text-[10px] text-slate-500">{edu.graduationYear}</span>
                        </div>
                        <p className="text-[10px] text-slate-500">{edu.school}</p>
                      </div>
                    ))}
                  </div>
                )}
                {skills.length > 0 && (
                  <div className="flex flex-col gap-1.5 font-sans">
                    <h3 className="text-xs font-serif font-bold uppercase tracking-wider border-b border-slate-200 pb-1">Core Competencies</h3>
                    <p className="leading-relaxed text-slate-700 font-semibold">{skills.join(", ")}</p>
                  </div>
                )}
              </div>
            )}

            {template === "modern" && (
              <div className="flex flex-col gap-6 font-sans">
                <div className="flex justify-between items-end border-l-4 border-primary-600 pl-4 py-1">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">{personalInfo.name || "YOUR NAME"}</h2>
                    <p className="text-[10px] text-slate-500 font-medium">{personalInfo.location}</p>
                  </div>
                  <div className="text-right text-[10px] text-slate-500 flex flex-col gap-0.5">
                    <span>{personalInfo.email}</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                </div>
                {objective && (
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[11px] font-bold text-primary-655 uppercase tracking-wider border-b border-slate-100 pb-1.5">Summary</h3>
                    <p className="leading-relaxed text-slate-605">{objective}</p>
                  </div>
                )}
                {experience.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[11px] font-bold text-primary-655 uppercase tracking-wider border-b border-slate-100 pb-1.5">Experience</h3>
                    {experience.map((exp) => (
                      <div key={exp.id} className="flex gap-4">
                        <span className="text-[9px] font-bold text-slate-400 shrink-0 w-20 text-right mt-0.5">{exp.startDate} - {exp.endDate}</span>
                        <div>
                          <strong className="text-slate-850">{exp.role}</strong>
                          <p className="text-[10px] text-slate-500 font-semibold">{exp.company}</p>
                          <p className="text-[10px] text-slate-505 leading-relaxed mt-1 whitespace-pre-line">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-[11px] font-bold text-primary-655 uppercase tracking-wider border-b border-slate-100 pb-1.5">Education</h3>
                    {education.map((edu) => (
                      <div key={edu.id} className="flex gap-4">
                        <span className="text-[9px] font-bold text-slate-400 shrink-0 w-20 text-right mt-0.5">{edu.graduationYear}</span>
                        <div>
                          <strong className="text-slate-800">{edu.degree} in {edu.field}</strong>
                          <p className="text-[10px] text-slate-550">{edu.school}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {skills.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[11px] font-bold text-primary-655 uppercase tracking-wider border-b border-slate-100 pb-1.5">Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s) => (
                        <span key={s} className="px-2.5 py-0.8 bg-slate-50 border border-slate-200/50 rounded-lg text-[9px] font-semibold text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {template === "creative" && (
              <div className="grid grid-cols-12 gap-6 font-sans">
                <div className="col-span-4 bg-slate-900 text-slate-350 p-4 rounded-xl flex flex-col gap-5">
                  <div className="flex flex-col gap-1 text-white border-b border-slate-850 pb-3">
                    <h2 className="text-sm font-bold uppercase tracking-tight">{personalInfo.name || "YOUR NAME"}</h2>
                  </div>
                  <div className="flex flex-col gap-3.5 text-[10px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Email</span>
                      <span className="truncate">{personalInfo.email}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Phone</span>
                      <span>{personalInfo.phone}</span>
                    </div>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-col gap-2 border-t border-slate-850 pt-3.5">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-slate-800 text-[9px] text-slate-300 rounded font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-8 flex flex-col gap-5">
                  {objective && (
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">About Me</h3>
                      <p className="leading-relaxed text-slate-600 text-[11px]">{objective}</p>
                    </div>
                  )}
                  {experience.length > 0 && (
                    <div className="flex flex-col gap-3.5">
                      <h3 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">Experience</h3>
                      {experience.map((exp) => (
                        <div key={exp.id} className="flex flex-col gap-0.5">
                          <div className="flex justify-between items-start">
                            <strong className="text-slate-800 text-[11px]">{exp.role}</strong>
                            <span className="text-[9px] text-slate-450">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <p className="text-[10px] font-semibold text-slate-500">{exp.company}</p>
                          <p className="text-[10px] text-slate-500 leading-relaxed mt-1 whitespace-pre-line">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumeEdit;
