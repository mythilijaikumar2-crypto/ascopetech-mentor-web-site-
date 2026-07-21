import React, { useState } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      toast.success("Thank you! Your message has been sent successfully. We will get back to you shortly.");
    }, 1200);
  };

  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
          <Badge variant="primary" className="max-w-fit mx-auto">GET IN TOUCH</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Contact Support & Mentorship
          </h1>
          <p className="text-sm text-slate-505 leading-relaxed">
            Have questions about assessments, resume score parsing, or custom roadmaps? Drop us a line.
          </p>
        </div>

        {/* Layout Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Details card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="p-8 bg-linear-to-br from-slate-950 via-primary-950 to-brand-950 text-white flex flex-col gap-8 shadow-sm">
              <div>
                <h3 className="text-lg font-bold tracking-tight mb-2">Platform Details</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  CareerAI is a complete frontend demonstration dashboard. Contact message submissions are mock operations stored inside transient store records.
                </p>
              </div>

              <div className="flex flex-col gap-5 text-xs">
                <div className="flex items-center gap-3.5">
                  <Mail className="h-5 w-5 text-primary-400 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a href="mailto:support@ascopetech.in" className="hover:text-white transition-colors">support@ascopetech.in</a>
                    <a href="mailto:info@ascopetech.in" className="hover:text-white transition-colors">info@ascopetech.in</a>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <Phone className="h-5 w-5 text-primary-400 shrink-0" />
                  <span>+1 (555) 019-2834</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <MapPin className="h-5 w-5 text-primary-400 shrink-0" />
                  <span>San Francisco, CA (Demonstration Workspace)</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Card */}
          <Card className="lg:col-span-7 p-8 bg-white border-slate-100 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Work Email"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Input
                label="Subject"
                id="subject"
                placeholder="How can we help you?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 tracking-wide">
                  Message Details
                </label>
                <textarea
                  placeholder="Please elaborate on your feedback or issues..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-500"
                  required
                />
              </div>
              <Button type="submit" variant="primary" isLoading={isSubmitting} leftIcon={<Send className="h-4 w-4" />} className="max-w-fit mt-2">
                Send Message
              </Button>
            </form>
          </Card>

        </div>

      </div>
    </div>
  );
};
export default Contact;
