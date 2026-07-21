import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Send, Bot, User, Trash2, Sparkles, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts
  const suggestions = [
    { label: "Skills match?", query: "Which career suits my current skills?" },
    { label: "Frontend guide?", query: "What should I learn to become a frontend developer?" },
    { label: "Optimize resume?", query: "How can I improve my resume ATS score?" },
    { label: "Interview prep?", query: "How should I prepare for a technical interview?" }
  ];

  // Load chat log from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("career_ai_assistant_chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      // Default greeting
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Hello! I am your AI Career Mentor. I can guide you in discovering matches, building ATS-compliant resumes, preparing for STAR interviews, or generating learning schedules. How can I help you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Math.random().toString(36).substr(2, 9)}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    localStorage.setItem("career_ai_assistant_chat", JSON.stringify(updated));
    setInput("");
    setIsTyping(true);

    // Simulate AI response evaluation delay
    setTimeout(() => {
      const responseText = getMockResponse(text);
      const botMsg: ChatMessage = {
        id: `msg-${Math.random().toString(36).substr(2, 9)}`,
        sender: "bot",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalMessages = [...updated, botMsg];
      setMessages(finalMessages);
      localStorage.setItem("career_ai_assistant_chat", JSON.stringify(finalMessages));
      setIsTyping(false);
    }, 1200);
  };

  const getMockResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes("resume") || q.includes("cv") || q.includes("ats")) {
      return "To optimize your resume ATS score, visit our Resume Analyzer. Copy your CV text, paste the target job description, and our engine will calculate matching skills. Integrate missing keywords directly in your experience descriptions to improve scores.";
    }
    if (q.includes("interview") || q.includes("mock") || q.includes("prepare")) {
      return "Preparation is key! Go to the Mock Interviews page, select your difficulty level, and start a timed console session. Practice explaining database indexes or LCP optimizations. Graded scorecards highlight areas to improve.";
    }
    if (q.includes("roadmap") || q.includes("learn") || q.includes("study") || q.includes("modules")) {
      return "A structured study schedule is crucial for career transitions. Once you set a goal in 'Career Matches', go to 'Learning Roadmap' to view beginner, intermediate, and advanced modules. Check off milestones daily.";
    }
    if (q.includes("react") || q.includes("frontend") || q.includes("typescript")) {
      return "Frontend Development matches candidates with strong layout styling preferences and interactive coding interests. Master HTML/CSS Flexbox, JavaScript event loop mechanisms, React state hooks, and TypeScript types.";
    }
    if (q.includes("skills") || q.includes("career")) {
      return "Complete our 5-minute Career Quiz in the sidebar. The calculation matches your work preferences and skills sliders against top roles (Software Developer, UI Designer, Product Manager) to display affinity percentages.";
    }

    return "That's a great question! You can use our sidebar modules to discover career matches, audit resume keywords against job specifications, practice graded mock interviews, or study curriculum schedules.";
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to delete your conversation history?")) {
      const reset: ChatMessage[] = [
        {
          id: "welcome",
          sender: "bot",
          text: "Hello! I am your AI Career Mentor. I can guide you in discovering matches, building ATS-compliant resumes, preparing for STAR interviews, or generating learning schedules. How can I help you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(reset);
      localStorage.setItem("career_ai_assistant_chat", JSON.stringify(reset));
      toast.success("Conversation history deleted.");
    }
  };

  return (
    <div className="py-8 flex flex-col gap-6 h-[calc(100vh-120px)] overflow-hidden">
      {/* Header toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5 shrink-0">
        <div className="flex items-center gap-2.5">
          <Badge variant="primary">AI MENTOR</Badge>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Career Assistant</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 hover:bg-red-50"
          leftIcon={<Trash2 className="h-4.5 w-4.5" />}
          onClick={handleClearHistory}
        >
          Clear Chat
        </Button>
      </div>

      {/* Main chat viewport */}
      <div className="grow bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden">
        {/* Messages list */}
        <div className="grow p-6 overflow-y-auto flex flex-col gap-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-[80%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                msg.sender === "user" ? "bg-slate-50 border-slate-200" : "bg-linear-to-tr from-primary-600 to-brand-500 border-transparent text-white"
              }`}>
                {msg.sender === "user" ? <User className="h-4 w-4 text-slate-600" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className="flex flex-col gap-1">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-primary-600 text-white rounded-br-none"
                    : "bg-slate-50 text-slate-800 border border-slate-200/60 rounded-bl-none text-balance"
                }`}>
                  {msg.text}
                </div>
                <span className={`text-[9px] text-slate-400 font-semibold px-1 ${
                  msg.sender === "user" ? "self-end" : "self-start"
                }`}>{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3.5 max-w-[80%] mr-auto items-center">
              <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary-600 to-brand-500 flex items-center justify-center text-white shrink-0">
                <Bot className="h-4 w-4 animate-bounce" />
              </div>
              <div className="flex gap-1.8 bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl rounded-bl-none items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-150" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce delay-300" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested prompts footer bar */}
        <div className="px-6 py-4.5 border-t border-slate-100 flex flex-col gap-3.5 bg-slate-50/50 shrink-0">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2.5">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.query)}
                  className="px-3.5 py-2 bg-white border border-slate-200/80 hover:bg-primary-50 hover:border-primary-400 text-slate-650 hover:text-primary-750 text-[10px] font-bold rounded-xl transition-all shadow-sm shadow-slate-100/30 inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                  {sug.label}
                </button>
              ))}
            </div>
          )}

          {/* Form input controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI Career Mentor a question..."
              className="grow px-4.5 py-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
              disabled={isTyping}
            />
            <Button type="submit" variant="primary" disabled={!input.trim() || isTyping} leftIcon={<Send className="h-4 w-4" />} />
          </form>
        </div>
      </div>
      
    </div>
  );
};
export default Assistant;
