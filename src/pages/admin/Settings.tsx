import React, { useState } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { toast } from "sonner";

export const SettingsPage: React.FC = () => {
  const [notify, setNotify] = useState(true);
  const [latency, setLatency] = useState("Medium");

  const handleWipe = () => {
    if (confirm("WARNING: This will wipe all stored resumes, applications, and logs from local storage. Proceed?")) {
      localStorage.clear();
      toast.success("Storage cache wiped. Reloading page...");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="max-w-xl flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">SYSTEM SETTINGS</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Console Configurations</h1>
        <p className="text-[10px] text-slate-400">Configure mock system values, toggle callbacks email, or clear cache.</p>
      </div>

      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-5 text-xs text-slate-655 font-medium">
        <div className="flex justify-between items-center py-2 border-b border-slate-50">
          <div>
            <h4 className="font-bold text-slate-800">Simulate Email Toggles</h4>
            <p className="text-[10px] text-slate-400">Dispatches simulated notification toasts on actions.</p>
          </div>
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => {
              setNotify(e.target.checked);
              toast.success("Notification setting updated!");
            }}
            className="h-4.5 w-4.5 rounded text-primary-655 cursor-pointer accent-primary-600"
          />
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-50">
          <div>
            <h4 className="font-bold text-slate-800">Simulate Network Delay</h4>
            <p className="text-[10px] text-slate-400">Set latency for analysis engines (Resume, Match quiz, Interview).</p>
          </div>
          <select
            value={latency}
            onChange={(e) => {
              setLatency(e.target.value);
              toast.success(`Network delay simulated at: ${e.target.value}`);
            }}
            className="p-2 border border-slate-200 bg-white rounded-xl text-xs focus:outline-none"
          >
            <option>Low (200ms)</option>
            <option>Medium (1000ms)</option>
            <option>High (2500ms)</option>
          </select>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-slate-50">
          <div>
            <h4 className="font-bold text-slate-800">Clear Storage Cache</h4>
            <p className="text-[10px] text-slate-400">Wipe all candidate profiles, active roadmaps, and mock databases.</p>
          </div>
          <Button variant="outline" className="text-red-500 hover:bg-red-50 border-red-200 hover:border-red-300" onClick={handleWipe}>
            Wipe DB Cache
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default SettingsPage;
