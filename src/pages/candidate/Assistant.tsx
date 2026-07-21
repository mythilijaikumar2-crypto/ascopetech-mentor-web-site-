import React, { useState, useEffect, useRef } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { AiThinkingAnimation } from "../../components/animations/AiThinkingAnimation";
import { StreamingText } from "../../components/animations/StreamingText";
import { AiService } from "../../services/api/aiService";
import { Send, Bot, User, Trash2, Sparkles, Copy, Check, Paperclip, Mic, StopCircle } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<boolean>(false);

  // Suggested Prompts
  const suggestions = [
    { label: "Frontend Skills", query: "What technical skills are mandatory for a Mid-Level Frontend Engineer?" },
    { label: "ATS Resume Tips", query: "How do I optimize my resume layout to pass ATS scanning algorithms?" },
    { label: "STAR Interview Guide", query: "Give me an example of answering behavioral questions using the STAR technique." },
    { label: "Study Roadmap", query: "Generate a 4-week study plan for mastering React 18 & TypeScript." }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("career_ai_assistant_chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "Hello! I am your AI Career Mentor. I can guide you in discovering career matches, optimizing ATS resumes, preparing for STAR technical interviews, or generating custom learning roadmaps. What would you like to focus on today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsGenerating(true);
    abortRef.current = false;

    // Add empty streaming bot message
    const botId = `msg-${Date.now()}-bot`;
    const botMsg: ChatMessage = {
      id: botId,
      sender: "bot",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true
    };

    setMessages((prev) => [...prev, botMsg]);

    try {
      await AiService.streamChatResponse(text, (token) => {
        if (abortRef.current) return;
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, text: m.text + token } : m))
        );
      });
    } catch {
      // Fallback
    } finally {
      setIsGenerating(false);
      setMessages((prev) => {
        const finalMsgs = prev.map((m) => (m.id === botId ? { ...m, isStreaming: false } : m));
        localStorage.setItem("career_ai_assistant_chat", JSON.stringify(finalMsgs));
        return finalMsgs;
      });
    }
  };

  const handleStopGeneration = () => {
    abortRef.current = true;
    setIsGenerating(false);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm("Delete conversation history?")) {
      const reset: ChatMessage[] = [
        {
          id: "welcome",
          sender: "bot",
          text: "Hello! I am your AI Career Mentor. I can guide you in discovering career matches, optimizing ATS resumes, preparing for STAR technical interviews, or generating custom learning roadmaps. What would you like to focus on today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
      setMessages(reset);
      localStorage.setItem("career_ai_assistant_chat", JSON.stringify(reset));
    }
  };

  return (
    <div className="py-6 flex flex-col gap-6 h-[calc(100vh-100px)] overflow-hidden">
      {/* Header toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="text-[10px]">AI ENGINE ACTIVE</Badge>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              AI Career Mentor Chat
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">24/7 intelligent advice for interview prep, resume optimization, and learning paths.</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs"
          leftIcon={<Trash2 className="h-4 w-4" />}
          onClick={handleClearHistory}
        >
          Clear History
        </Button>
      </div>

      {/* Main chat viewport */}
      <div className="grow bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs flex flex-col justify-between overflow-hidden">
        {/* Messages list */}
        <div className="grow p-6 overflow-y-auto flex flex-col gap-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div className={`h-8 w-8 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs ${
                msg.sender === "user"
                  ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  : "bg-linear-to-tr from-primary-600 to-brand-500 border-transparent text-white"
              }`}>
                {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className="flex flex-col gap-1 group">
                <div className={`p-4 rounded-3xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-primary-600 text-white rounded-br-none"
                    : "bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800 rounded-bl-none text-balance"
                }`}>
                  {msg.text || (msg.isStreaming ? <AiThinkingAnimation size="sm" label="Generating response..." /> : "")}
                </div>

                <div className={`flex items-center gap-2 px-1 ${msg.sender === "user" ? "self-end" : "self-start"}`}>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">{msg.timestamp}</span>
                  {msg.sender === "bot" && msg.text && (
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity p-1"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="mr-auto flex gap-3.5 items-center">
              <AiThinkingAnimation size="sm" label="AI processing query..." />
              <Button
                variant="outline"
                size="sm"
                onClick={handleStopGeneration}
                leftIcon={<StopCircle className="h-3.5 w-3.5 text-rose-500" />}
                className="text-[10px] py-1"
              >
                Stop
              </Button>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested prompts footer bar */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3.5 bg-slate-50/50 dark:bg-slate-950/40 shrink-0">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.query)}
                  className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-primary-50 dark:hover:bg-primary-950/40 hover:border-primary-400 text-slate-700 dark:text-slate-300 text-[11px] font-bold rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5"
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
            className="flex gap-2.5 items-center"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI Career Mentor a question..."
                className="w-full px-4.5 py-3 pr-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl text-xs focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors"
                disabled={isGenerating}
              />
              <div className="absolute right-3 top-2.5 flex items-center gap-1 text-slate-400">
                <button type="button" className="p-1 hover:text-slate-600 dark:hover:text-slate-200" title="Attach file (placeholder)">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button type="button" className="p-1 hover:text-slate-600 dark:hover:text-slate-200" title="Voice input (placeholder)">
                  <Mic className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || isGenerating}
              leftIcon={<Send className="h-4 w-4" />}
              className="rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
