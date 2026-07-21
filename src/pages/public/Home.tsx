import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IntroductionAnimation } from "../../components/animations/IntroductionAnimation";
import heroVideo from "../../assets/hero_1ascopetech.mp4";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { m, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Compass,
  Sparkles,
  TrendingUp,
  Target,
  FileText,
  MessageSquare,
  Map,
  Briefcase,
  ArrowRight,
  Plus,
  Minus,
  Star,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Bot
} from "lucide-react";
import { mockCareers } from "../../data/careers";
import { mockJobs } from "../../data/jobs";

// Component for viewport counter animations
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 1.5,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);

  return (
    <m.span
      whileInView={{
        opacity: 1,
        transition: {
          duration: 0.1,
          onComplete: () => {
            let start = 0;
            const stepTime = Math.abs(Math.floor((duration * 1000) / end));
            const timer = setInterval(() => {
              start += 1;
              setCount(start);
              if (start >= end) {
                clearInterval(timer);
              }
            }, stepTime);
          },
        },
      }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {count}
      {suffix}
    </m.span>
  );
};

export const Home: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Mouse positions for interactive 3D perspective hero illustration
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery-smooth spring values for natural rotations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate normalized coordinates (-0.5 to 0.5) from grid center
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Chat Preview State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "user", text: "What skills should I learn for Frontend Development?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Resume Preview State
  const [resumeAtsScore, setResumeAtsScore] = useState(45);

  // Interview Preview State
  const [interviewSubmitted, setInterviewSubmitted] = useState(false);
  const [interviewAnswer, setInterviewAnswer] = useState("");
  const [interviewScore, setInterviewScore] = useState(0);

  // Roadmap Preview State
  const [activeRoadmapStep, setActiveRoadmapStep] = useState(0);

  // FAQ Accordion State
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Check sessionStorage on mount to bypass intro if played
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("career_ai_intro_played");
    if (hasPlayed === "true") {
      setIntroComplete(true);
    }
  }, []);

  // Run mock chatbot sequence when visible
  const triggerChatBotResponse = () => {
    if (chatMessages.length > 1) return; // run once
    setIsTyping(true);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Excellent career choice! You should focus on mastering HTML5, CSS3, JavaScript, TypeScript, and modern libraries like React. Additionally, learning responsive design grids, Tailwind CSS, and Framer Motion for interactive states will set you apart from other candidates."
        }
      ]);
      setIsTyping(false);
    }, 1800);
  };

  // Run resume analyzer score progress when section is in view
  const triggerResumeScoreAnim = () => {
    setResumeAtsScore(45);
    setTimeout(() => setResumeAtsScore(82), 600);
  };

  // Evaluate Mock Interview preview answer
  const handleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewAnswer.trim()) return;
    setInterviewSubmitted(true);
    setTimeout(() => {
      setInterviewScore(85);
    }, 1000);
  };

  const faqItems = [
    {
      q: "How does the AI Career Assessment work?",
      a: "The career assessment presents situational work preferences, tech level options, and skills sliders. Our rule-based AI simulation checks these inputs against current job requirements and matches you with the paths where you show the highest affinity."
    },
    {
      q: "Can I download my resume as a PDF?",
      a: "Yes! Our Resume Builder includes three professional layout templates. You can customize details, preview the formatting, and use the print preview engine to save your resume cleanly as an ATS-friendly PDF directly in your browser."
    },
    {
      q: "Are the mock interviews industry-specific?",
      a: "Absolutely. You can select your target career (e.g. Frontend Engineer, Product Manager), set difficulty, and our trainer will generate matching technical or behavioral question sets, grade your answers, and display detailed improvements."
    },
    {
      q: "Does this platform connect to a database?",
      a: "This is a high-fidelity frontend prototype built to demonstrate production layouts, interactive features, animations, and state transitions. All user inputs, resumes, and interview records are stored locally in your browser's localStorage."
    }
  ];

  if (!introComplete) {
    return <IntroductionAnimation onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <div className="w-full relative overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-slate-950">
        {/* Full-Visibility Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-20 opacity-80"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero left text content */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6 p-6 md:p-8 rounded-3xl bg-slate-950/70 backdrop-blur-md border border-white/20 shadow-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-950/80 border border-primary-700/80 max-w-fit shadow-xs">
              <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" />
              <span className="text-[11px] font-extrabold text-primary-200 uppercase tracking-wider">
                AI Career Guidance & Mentorship
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-md tracking-tight leading-tight text-balance">
              Build the Right Career with{" "}
              <span className="bg-gradient-to-r from-primary-400 via-indigo-300 to-brand-400 bg-clip-text text-transparent drop-shadow-xs">
                AI-Powered Guidance
              </span>
            </h1>

            <p className="text-base md:text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
              Discover suitable career paths, create an ATS-friendly resume, practice mock interviews, develop job-ready skills, and explore opportunities personalized for your goals.
            </p>

            <div className="flex flex-wrap items-center gap-4.5 mt-2">
              <Link to="/onboarding">
                <Button variant="primary" size="lg" className="shadow-lg shadow-primary-500/30 text-sm font-bold px-6" rightIcon={<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline" size="lg" className="text-sm font-bold px-6 border-slate-700 text-slate-200 hover:bg-slate-800" rightIcon={<ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />}>
                  Explore Features
                </Button>
              </Link>
            </div>

            {/* Small Trust indicators */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-800">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-xs text-white bg-indigo-600 shadow-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-extrabold text-white">Trusted by 10,000+ candidates</p>
                <p className="text-xs text-slate-300 font-medium">Accelerating career transitions daily</p>
              </div>
            </div>
          </m.div>

          {/* Hero right: Featured HD Video Player Showcase Card */}
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative group"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500 to-brand-500 opacity-40 blur-lg group-hover:opacity-75 transition duration-500" />
            <div className="relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
              {/* Header bar */}
              <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-bold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary-400" /> Ascope Tech Platform Tour
                </span>
                <Badge variant="primary" className="text-[9px]">HD VIDEO</Badge>
              </div>

              {/* Main Video Player Container */}
              <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>

              {/* Video Footer info */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-primary-950 text-primary-400 flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">AI Mentor & Guidance Platform</h4>
                    <p className="text-[10px] text-slate-400">Watch full walkthrough video</p>
                  </div>
                </div>
                <Badge variant="success" className="text-[9px]">LIVE PREVIEW</Badge>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* 2. Platform Statistics */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {[
            { value: 12, label: "Career Paths Covered", suffix: "+" },
            { value: 85, label: "Average Resume Score", suffix: "%" },
            { value: 450, label: "Mock Interviews Done", suffix: "k" },
            { value: 92, label: "Roadmap Success Rate", suffix: "%" },
            { value: 15, label: "Job Recommendations", suffix: "k+" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4.5 mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              One platform for your entire career transition
            </h2>
            <p className="text-sm text-slate-505 leading-relaxed">
              We provide all the professional utilities a candidate needs to discover, prepare, study, and apply for roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "AI Career Guidance",
                description: "Complete scenario interests quizzes and get detailed match reports for multiple career fields.",
                color: "bg-indigo-50 text-indigo-600"
              },
              {
                icon: FileText,
                title: "Resume Builder",
                description: "Construct interactive professional CVs using classic, modern, and creative layout structures.",
                color: "bg-violet-50 text-violet-600"
              },
              {
                icon: FileText,
                title: "Resume Analyzer",
                description: "Verify your keyword matching index and scan resume layout blocks directly against targeted job specifications.",
                color: "bg-emerald-50 text-emerald-600"
              },
              {
                icon: MessageSquare,
                title: "Mock Interviews",
                description: "Engage in timed chat simulations with prompt evaluations, scoring metrics, and model responses.",
                color: "bg-amber-50 text-amber-600"
              },
              {
                icon: Map,
                title: "Personalized Roadmap",
                description: "Study structured learning roadmaps with checked milestones, lesson plans, and quiz assessments.",
                color: "bg-rose-50 text-rose-600"
              },
              {
                icon: Briefcase,
                title: "Job Recommendations",
                description: "Explore job boards tailored to your profile scores, save listings, and track application steps in Kanbans.",
                color: "bg-cyan-50 text-cyan-600"
              }
            ].map((feature, idx) => (
              <Card key={idx} variant="interactive" className="p-8 flex flex-col gap-5">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="h-5.5 w-5.5" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-slate-800">{feature.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
                <Link to="/onboarding" className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 hover:translate-x-1 transition-all">
                  Get Started <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Previews Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-20">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Experience the core platform in action
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed text-balance">
              Test previews of our primary tools directly. Real-time inputs and interactive state shifts.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {/* Preview A: AI Chat Bot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-5">
                <Badge variant="primary" className="max-w-fit">CHAT PREVIEW</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                  Meet your virtual AI Career Mentor
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed">
                  Get recommendations on the best languages, frameworks, and techniques to build. Clicking the preview button will generate an instant answer.
                </p>
                <Button variant="primary" className="max-w-fit" onClick={triggerChatBotResponse}>
                  Try Career Assistant
                </Button>
              </div>
              <div className="lg:col-span-7" onMouseEnter={triggerChatBotResponse}>
                <div className="w-full bg-slate-950 rounded-2xl shadow-xl p-5 border border-slate-900 flex flex-col gap-4 min-h-[250px] justify-between">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary-600 to-brand-500 flex items-center justify-center">
                        <Bot className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">CareerAI Mentor</p>
                        <p className="text-[9px] text-emerald-400">Online & ready</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-3.5 my-3 overflow-y-auto max-h-48 scrollbar-thin">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                      >
                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-primary-600 text-white rounded-br-none"
                              : "bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 items-center bg-slate-900 border border-slate-850 p-3 rounded-2xl max-w-fit mr-auto">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-450 animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-450 animate-bounce delay-150" />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-450 animate-bounce delay-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview B: Resume Analyzer score dial */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 lg:order-2 flex flex-col gap-5">
                <Badge variant="success" className="max-w-fit">ATS SCORER</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                  ATS Score Analysis Engine
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed">
                  Our system parses CV structures, verifies layout grids, and scores contents. Hover or click to animate the ATS dial calculation.
                </p>
                <Button variant="secondary" className="max-w-fit" onClick={triggerResumeScoreAnim}>
                  Recalculate Score
                </Button>
              </div>
              <div className="lg:col-span-7 lg:order-1" onMouseEnter={triggerResumeScoreAnim}>
                <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-around gap-6">
                  {/* Gauge */}
                  <div className="relative h-36 w-36 flex items-center justify-center">
                    <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                      <m.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#4f46e5"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={251.2}
                        animate={{ strokeDashoffset: 251.2 - (251.2 * resumeAtsScore) / 100 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="text-center z-10">
                      <span className="text-3xl font-extrabold text-slate-850">{resumeAtsScore}%</span>
                      <p className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase">ATS SCORE</p>
                    </div>
                  </div>
                  {/* Suggestion box */}
                  <div className="flex-1 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-slate-800">ATS Optimization Suggestions</h4>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-white border border-slate-100 p-3 rounded-xl">
                      <div className="h-5 w-5 bg-amber-50 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-600 shrink-0">
                        !
                      </div>
                      <p className="leading-relaxed">Add certifications like Certified React Developer or AWS Cloud Practitioner to pass layout queries.</p>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-white border border-slate-100 p-3 rounded-xl">
                      <div className="h-5 w-5 bg-emerald-50 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-600 shrink-0">
                        ✓
                      </div>
                      <p className="leading-relaxed">Action verbs used in experience descriptions successfully pass keyword matching checks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview C: Mock Interview Console */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-5">
                <Badge variant="warning" className="max-w-fit">INTERVIEW PREP</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                  Interactive Mock Interview Trainer
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed">
                  Submit answers to standard technical questions and get evaluated in real-time. Type a sample response below to test it.
                </p>
              </div>
              <div className="lg:col-span-7">
                <Card className="p-6 border-slate-200 bg-slate-50/50 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-bold text-slate-400">QUESTION 1 OF 3 (FRONTEND DEVELOPER)</span>
                    <span className="text-[10px] font-bold text-red-500">01:45 SECS LEFT</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">
                    What is the benefit of virtual DOM reconciliation in React?
                  </h4>
                  {!interviewSubmitted ? (
                    <form onSubmit={handleInterviewSubmit} className="flex flex-col gap-3">
                      <textarea
                        value={interviewAnswer}
                        onChange={(e) => setInterviewAnswer(e.target.value)}
                        placeholder="Write your explanation here..."
                        className="w-full h-24 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                        required
                      />
                      <Button type="submit" variant="primary" className="max-w-fit self-end">
                        Submit Answer
                      </Button>
                    </form>
                  ) : (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4.5 bg-white border border-slate-100 p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">AI Score Evaluation:</span>
                        <span className="text-sm font-extrabold text-indigo-600">
                          {interviewScore > 0 ? `${interviewScore}/100` : "Calculating..."}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {interviewScore > 0
                          ? "Good explanation of VDOM. You hits core keywords: batch updates, virtual diffing. Consider adding browser reflow/repaint optimizations to secure a perfect score."
                          : "Evaluating response matching metrics..."}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="max-w-fit self-end"
                        onClick={() => {
                          setInterviewSubmitted(false);
                          setInterviewAnswer("");
                          setInterviewScore(0);
                        }}
                      >
                        Try Another Answer
                      </Button>
                    </m.div>
                  )}
                </Card>
              </div>
            </div>

            {/* Preview D: Learning Roadmap Path */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 lg:order-2 flex flex-col gap-5">
                <Badge variant="primary" className="max-w-fit">STUDY ROADMAP</Badge>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                  Visual milestone study tracker
                </h3>
                <p className="text-xs text-slate-550 leading-relaxed">
                  Track weekly task completions, check details off, and watch roadmap progress bars animate in real-time.
                </p>
              </div>
              <div className="lg:col-span-7 lg:order-1">
                <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                    <div>
                      <h4 className="text-xs font-bold text-slate-850">Frontend Developer Roadmap</h4>
                      <p className="text-[10px] text-slate-400">Calculated duration: 24 weeks</p>
                    </div>
                    <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600" style={{ width: `${(activeRoadmapStep + 1) * 33}%` }} />
                    </div>
                  </div>

                  <div className="relative pl-6 flex flex-col gap-6">
                    {/* Connecting line */}
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100 z-0" />
                    
                    {[
                      { title: "HTML5 & CSS3 Responsive Grids", duration: "Week 1 - 4", desc: "Learn semantic markup, grid structures, and layouts." },
                      { title: "JavaScript Core Algorithms", duration: "Week 5 - 10", desc: "Master functions, event loops, DOM, and API fetching." },
                      { title: "React State & Frame Animations", duration: "Week 11 - 18", desc: "Adopt React components, custom hooks, and Framer Motion." }
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className={`relative z-10 flex gap-4 cursor-pointer p-3 rounded-xl transition-all ${
                          activeRoadmapStep === idx ? "bg-primary-50/40 border border-primary-100/30" : ""
                        }`}
                        onClick={() => setActiveRoadmapStep(idx)}
                      >
                        <div
                          className={`h-5.5 w-5.5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            idx <= activeRoadmapStep ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="text-xs font-bold text-slate-800">{step.title}</h5>
                            <span className="text-[9px] font-semibold text-slate-400">{step.duration}</span>
                          </div>
                          {activeRoadmapStep === idx && (
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed animate-fade-up">
                              {step.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Career Path Categories */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex flex-col gap-3 max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore standard career pathways
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Click a category below to explore demand trends, salaries, and key required skills.
              </p>
            </div>
            <Link to="/careers">
              <Button variant="outline" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                View All Careers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCareers.map((career) => (
              <Card
                key={career.id}
                variant="interactive"
                className="p-6 cursor-pointer flex flex-col justify-between min-h-[220px]"
                onClick={() => navigate(`/careers/${career.id}`)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={career.demand === "High" ? "success" : "warning"} className="text-[8px]">
                      {career.demand} Demand
                    </Badge>
                    <span className="text-[10px] font-semibold text-emerald-600">{career.growthRate}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-800 tracking-tight mb-2">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-450 line-clamp-3 leading-relaxed mb-4">
                    {career.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  <div>
                    <p className="text-[9px] font-semibold text-slate-400">AVG SALARY</p>
                    <p className="text-xs font-extrabold text-slate-700">{career.salaryRange.avg}</p>
                  </div>
                  <span className="h-7 w-7 rounded-lg bg-slate-50 group-hover:bg-primary-50 flex items-center justify-center text-slate-450 hover:text-primary-600 transition-colors">
                    →
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Testimonial slider */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4 mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Approved by active professionals
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Read how candidates navigated coding quizzes, mock assessments, and interview prep to transition successfully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "UI/UX Designer",
                text: "The roadmap calculated my missing skill gaps and let me check milestones off week-by-week. It completely removed the stress of not knowing what topic to study next.",
                rating: 5,
                img: "SJ"
              },
              {
                name: "David Chen",
                role: "Data Scientist",
                text: "I uploaded my resume and matched it directly with my target description. The suggestions for missing keywords raised my ATS match score by 20 points! Highly recommended.",
                rating: 5,
                img: "DC"
              },
              {
                name: "Marcus Vance",
                role: "Frontend Engineer",
                text: "Practice interviews are extremely realistic. The graded timer forced me to explain components concisely, and the model answers helped me refine my technical definitions.",
                rating: 5,
                img: "MV"
              }
            ].map((t, idx) => (
              <Card key={idx} variant="default" className="p-8 border-slate-200/80 flex flex-col gap-5 relative">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  \"{t.text}\"
                </p>
                <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-slate-100">
                  <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                    {t.img}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <Card
                  key={idx}
                  variant="default"
                  className="overflow-hidden border-slate-200/60 transition-colors"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-sm font-bold text-slate-800 tracking-tight">{item.q}</span>
                    <span className="text-slate-400 shrink-0 ml-4">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                          {item.a}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-24 bg-linear-to-br from-slate-950 via-primary-950 to-brand-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-primary-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-brand-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-6 z-10 relative">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Take control of your professional growth
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl leading-relaxed">
            Create your account today and unlock matching career tracks, automated resume analytics, study schedules, and mock graded quizzes.
          </p>
          <Link to="/onboarding" className="mt-4">
            <Button variant="primary" size="lg" className="bg-white text-slate-950 hover:bg-slate-100 shadow-xl" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
