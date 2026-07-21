import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useProfileStore as useProfStore } from "../../store/profileStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Select } from "../../components/common/Select";
import { AnimatePresence, m } from "framer-motion";
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  GraduationCap,
  Sparkles,
  Heart,
  FileCheck,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export const Onboarding: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const { onboarding, setOnboarding } = useProfStore();
  
  const [step, setStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const navigate = useNavigate();

  // Local Form state initialized from store
  const [fullName, setFullName] = useState(onboarding?.fullName || user?.name || "");
  const [degree, setDegree] = useState(onboarding?.degree || "");
  const [college, setCollege] = useState(onboarding?.college || "");
  const [graduationYear, setGraduationYear] = useState(onboarding?.graduationYear || "2026");
  const [skills, setSkills] = useState<string[]>(onboarding?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(onboarding?.experienceLevel || 1);
  const [interests, setInterests] = useState<string[]>(onboarding?.interests || []);
  const [preferredWorkEnvironment, setPreferredWorkEnvironment] = useState(onboarding?.preferredWorkEnvironment || "Remote");
  
  // File upload state
  const [fileName, setFileName] = useState(onboarding?.resumeFileName || "");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    // Basic field validation
    if (step === 1 && !fullName.trim()) {
      toast.error("Please fill in your full name.");
      return;
    }
    if (step === 2 && (!degree.trim() || !college.trim())) {
      toast.error("Please specify your degree and college details.");
      return;
    }
    if (step === 3 && skills.length === 0) {
      toast.error("Please add at least one core skill.");
      return;
    }
    if (step === 4 && interests.length === 0) {
      toast.error("Please select at least one interest field.");
      return;
    }

    setSlideDirection("right");
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setSlideDirection("left");
    setStep((prev) => prev - 1);
  };

  // Skill Add
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) {
      toast.info("Skill already added.");
      return;
    }
    setSkills((prev) => [...prev, skillInput.trim()]);
    setSkillInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  // Interest toggle
  const handleInterestToggle = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // File Drop Simulation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      toast.error("Invalid format. Please upload a PDF, DOC, or DOCX resume.");
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success("Resume uploaded successfully!");
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleCompleteOnboarding = (startQuiz: boolean) => {
    // Save onboarding details to Zustand state profile store
    setOnboarding({
      fullName,
      degree,
      college,
      graduationYear,
      skills,
      experienceLevel,
      interests,
      preferredWorkEnvironment,
      resumeFileName: fileName,
      onboardingCompleted: true,
    });

    // Update global auth store name if altered
    updateProfile(fullName, user?.email || "");

    toast.success("Onboarding checklist successfully saved!");
    if (startQuiz) {
      navigate("/candidate/assessment");
    } else {
      navigate("/candidate/dashboard");
    }
  };

  // slide animations
  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    }),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      {/* Onboarding Header */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
            <Compass className="h-4.5 w-4.5" />
          </div>
          <span className="text-base font-bold text-slate-900">CareerAI Onboarding</span>
        </div>
        <Badge variant="primary">Step {step} of 6</Badge>
      </header>

      {/* Main Steps Form */}
      <main className="flex-1 max-w-xl w-full mx-auto flex items-center justify-center py-12">
        <div className="w-full relative overflow-hidden">
          <AnimatePresence custom={slideDirection} mode="wait">
            <m.div
              key={step}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col gap-6"
            >
              {/* Step 1: Personal Profile */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-primary-600">
                    <User className="h-5 w-5" />
                    <h2 className="text-base font-bold text-slate-800">Personal Details</h2>
                  </div>
                  <Input
                    label="Full Name"
                    id="fullName"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <Input
                    label="Current Job Title (e.g. Student, Frontend Developer)"
                    id="title"
                    placeholder="Frontend Engineer"
                  />
                </div>
              )}

              {/* Step 2: Academic background */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-primary-600">
                    <GraduationCap className="h-5 w-5" />
                    <h2 className="text-base font-bold text-slate-800">Academic Background</h2>
                  </div>
                  <Input
                    label="Degree (e.g. B.S. Computer Science)"
                    id="degree"
                    placeholder="B.S. Software Engineering"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    required
                  />
                  <Input
                    label="College / University"
                    id="college"
                    placeholder="Stanford University"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                  />
                  <Select
                    label="Graduation Year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    options={[
                      { value: "2024", label: "2024" },
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                      { value: "2027", label: "2027" },
                      { value: "2028", label: "2028" }
                    ]}
                  />
                </div>
              )}

              {/* Step 3: Skills checklist */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2.5 text-primary-600">
                    <Sparkles className="h-5 w-5" />
                    <h2 className="text-base font-bold text-slate-800">Core Skillsets</h2>
                  </div>
                  
                  <form onSubmit={handleAddSkill} className="flex gap-2">
                    <Input
                      placeholder="Type a skill (e.g. React, Python) and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                    <Button type="submit" variant="outline" className="mt-6 py-2.5">
                      Add
                    </Button>
                  </form>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2 min-h-16 p-3 bg-white border border-slate-200 rounded-xl">
                    {skills.length === 0 ? (
                      <span className="text-xs text-slate-400 self-center mx-auto">No skills added yet.</span>
                    ) : (
                      skills.map((skill) => (
                        <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                          {skill}
                          <button onClick={() => handleRemoveSkill(skill)} className="text-primary-400 hover:text-primary-700 font-bold">×</button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Experience Slider */}
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-xs font-semibold text-slate-700">Years of Experience: {experienceLevel}</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(Number(e.target.value))}
                      className="w-full accent-primary-650"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>0 (Student/Entry)</span>
                      <span>5 (Mid)</span>
                      <span>10+ (Senior)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Interests */}
              {step === 4 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-primary-600">
                    <Heart className="h-5 w-5" />
                    <h2 className="text-base font-bold text-slate-800">Job Interests & Preferences</h2>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700">Which fields interest you most?</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        "Software Development",
                        "Data and AI",
                        "UI/UX Design",
                        "Digital Marketing",
                        "Business Management",
                        "Finance"
                      ].map((item) => {
                        const isSel = interests.includes(item);
                        return (
                          <button
                            key={item}
                            onClick={() => handleInterestToggle(item)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                              isSel
                                ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-600"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Select
                    label="Preferred Work Environment"
                    value={preferredWorkEnvironment}
                    onChange={(e) => setPreferredWorkEnvironment(e.target.value)}
                    options={[
                      { value: "Remote", label: "Remote Work" },
                      { value: "Hybrid", label: "Hybrid Office" },
                      { value: "On-site", label: "On-site" }
                    ]}
                  />
                </div>
              )}

              {/* Step 5: Resume dropzone upload */}
              {step === 5 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-primary-600">
                    <FileCheck className="h-5 w-5" />
                    <h2 className="text-base font-bold text-slate-800">Resume Upload</h2>
                  </div>

                  <div className="relative border-2 border-dashed border-slate-200 hover:border-primary-500 bg-white p-8 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-primary-600 mb-3 animate-pulse" />
                    <p className="text-xs font-bold text-slate-700">Drop your resume file here, or click to browse</p>
                    <p className="text-[10px] text-slate-400 mt-1">Supports PDF, DOC, DOCX up to 5MB</p>
                  </div>

                  {fileName && (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileCheck className="h-5 w-5 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700 truncate">{fileName}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">
                        {isUploading ? `${uploadProgress}%` : "UPLOADED"}
                      </span>
                    </div>
                  )}

                  {isUploading && (
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setFileName("");
                      handleNext();
                    }}
                    className="text-xs font-semibold text-slate-450 hover:text-slate-750 self-end"
                  >
                    Skip & Upload Later
                  </button>
                </div>
              )}

              {/* Step 6: Summary & Quiz prompt */}
              {step === 6 && (
                <div className="flex flex-col gap-6 text-center items-center">
                  <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-base font-bold text-slate-800">Onboarding Checklist Complete!</h2>
                    <p className="text-xs text-slate-550 leading-relaxed text-balance">
                      Your career profile details have been successfully configured. Would you like to take our 5-minute Career Assessment quiz to generate matched recommendations, or skip directly to your candidate panel?
                    </p>
                  </div>

                  <div className="flex gap-4 w-full pt-4">
                    <Button variant="outline" className="flex-1 justify-center py-3" onClick={() => handleCompleteOnboarding(false)}>
                      Go to Dashboard
                    </Button>
                    <Button variant="primary" className="flex-1 justify-center py-3" rightIcon={<ArrowRight className="h-4.5 w-4.5" />} onClick={() => handleCompleteOnboarding(true)}>
                      Start Career Quiz
                    </Button>
                  </div>
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Onboarding Navigation Footer */}
      {step < 6 && (
        <footer className="max-w-xl w-full mx-auto border-t border-slate-200/60 pt-6 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Continue
          </Button>
        </footer>
      )}
    </div>
  );
};
export default Onboarding;
