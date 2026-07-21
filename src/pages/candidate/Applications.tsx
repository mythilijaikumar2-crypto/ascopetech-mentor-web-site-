import React, { useState } from "react";
import { useJobStore, JobApplication } from "../../store/jobStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Select } from "../../components/common/Select";
import { Send, Calendar, CheckSquare, Layers } from "lucide-react";
import { toast } from "sonner";

const COLUMNS: JobApplication["status"][] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
  "Selected"
];

export const Applications: React.FC = () => {
  const { applications, updateApplicationStatus } = useJobStore();
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [newStatus, setNewStatus] = useState<JobApplication["status"]>("Applied");

  const handleCardClick = (app: JobApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
  };

  const handleStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    updateApplicationStatus(selectedApp.id, newStatus);
    toast.success(`Application status updated to '${newStatus}'!`);
    setSelectedApp(null);
  };

  // Group applications by status column
  const getAppsByStatus = (col: JobApplication["status"]) => {
    return applications.filter((app) => app.status === col);
  };

  return (
    <div className="py-8 flex flex-col gap-8 h-[calc(100vh-120px)] overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 shrink-0">
        <Badge variant="primary">APPLICATION TRACKER</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">My Job Applications</h1>
        <p className="text-[10px] text-slate-405">Monitor review pipelines, update application status cards, and record recruiter callbacks.</p>
      </div>

      {applications.length === 0 ? (
        <Card className="py-16 text-center border-slate-200 bg-white shadow-sm p-8 max-w-lg mx-auto flex flex-col items-center gap-4 shrink-0">
          <Send className="h-10 w-10 text-slate-300" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">No applications submitted</h3>
            <p className="text-xs text-slate-450 mt-1">Browse recommended job postings and submit quick applications using your CV builder.</p>
          </div>
        </Card>
      ) : (
        /* Kanban columns viewport scroll horizontal */
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start select-none">
          {COLUMNS.map((col) => {
            const apps = getAppsByStatus(col);
            return (
              <div key={col} className="w-72 shrink-0 bg-slate-100/60 p-4.5 rounded-2xl border border-slate-200/50 flex flex-col gap-4 max-h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-750 tracking-wider uppercase">{col}</span>
                  <Badge variant="neutral" className="text-[9px] px-1.8 py-0">{apps.length}</Badge>
                </div>
                
                <div className="flex flex-col gap-3">
                  {apps.map((app) => (
                    <Card
                      key={app.id}
                      className="p-4 bg-white border-slate-250/70 hover:border-primary-500 cursor-pointer shadow-sm hover:shadow transition-all duration-300"
                      onClick={() => handleCardClick(app)}
                    >
                      <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">{app.jobTitle}</h4>
                      <p className="text-[10px] text-slate-450 font-semibold truncate mt-0.5">{app.company}</p>
                      
                      <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 mt-3 text-[9px] text-slate-400 font-semibold">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {app.appliedDate}
                        </span>
                        <span className="text-primary-650">Details</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details / Edit Status Modal */}
      <Modal isOpen={selectedApp !== null} onClose={() => setSelectedApp(null)} title="Application Timeline Details">
        {selectedApp && (
          <form onSubmit={handleStatusChange} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 leading-tight">{selectedApp.jobTitle}</h3>
              <p className="text-[10px] text-slate-450 font-semibold mt-0.5">{selectedApp.company}</p>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-655">
                <span className="font-semibold">Submitted Resume:</span>
                <span className="font-bold text-slate-800">{selectedApp.resumeTitle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-655">
                <span className="font-semibold">Application Date:</span>
                <span className="font-bold text-slate-800">{selectedApp.appliedDate}</span>
              </div>
            </div>

            {selectedApp.coverNote && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Cover Letter Note</label>
                <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-mono whitespace-pre-wrap">
                  {selectedApp.coverNote}
                </p>
              </div>
            )}

            <Select
              label="Update Status Column"
              value={newStatus}
              onChange={(e: any) => setNewStatus(e.target.value)}
              options={COLUMNS.map((col) => ({ value: col, label: col }))}
            />

            <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
              <Button variant="ghost" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update Status
              </Button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
export default Applications;
