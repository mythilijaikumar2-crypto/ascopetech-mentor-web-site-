import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResumeStore, Resume } from "../../store/resumeStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Input } from "../../components/common/Input";
import { FileText, Copy, Trash2, Edit, Plus, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Resumes: React.FC = () => {
  const { resumes, deleteResume, duplicateResume, updateResume } = useResumeStore();
  const [renameId, setRenameId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  const handleDuplicate = (id: string) => {
    duplicateResume(id);
    toast.success("Resume duplicated successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      deleteResume(id);
      toast.success("Resume deleted.");
    }
  };

  const handleRenameClick = (resume: Resume) => {
    setRenameId(resume.id);
    setNewName(resume.title);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renameId || !newName.trim()) return;
    updateResume(renameId, { title: newName.trim() });
    setRenameId(null);
    toast.success("Resume renamed.");
  };

  return (
    <div className="py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <Badge variant="primary">RESUME MANAGER</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            My Saved Resumes
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            Manage your CV profiles, review ATS compatibility scores, and update templates.
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => navigate("/candidate/resumes/create")}
        >
          Create New Resume
        </Button>
      </div>

      {/* Resumes Grid */}
      {resumes.length === 0 ? (
        <Card className="py-16 text-center border-slate-200/80 bg-white shadow-sm p-8 max-w-lg mx-auto flex flex-col items-center gap-4">
          <FileText className="h-10 w-10 text-slate-300" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">No resumes built yet</h3>
            <p className="text-xs text-slate-450 mt-1">Click the button below to initialize your first professional CV.</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => navigate("/candidate/resumes/create")}>
            Build My First CV
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumes.map((res) => (
            <Card
              key={res.id}
              className="p-6 border-slate-200/85 bg-white shadow-sm flex flex-col justify-between min-h-[220px] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="neutral" className="capitalize text-[8px]">{res.template} Template</Badge>
                  <span className="text-[10px] font-extrabold text-primary-650 bg-primary-50 px-2 py-0.5 rounded-full">
                    ATS: {res.score}%
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-850 truncate">{res.title}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Modified: {res.updatedAt}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleDuplicate(res.id)}
                    className="p-2 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="h-3.8 w-3.8" />
                  </button>
                  <button
                    onClick={() => handleRenameClick(res)}
                    className="p-2 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors"
                    title="Rename"
                  >
                    <Edit className="h-3.8 w-3.8" />
                  </button>
                  <button
                    onClick={() => handleDelete(res.id)}
                    className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.8 w-3.8" />
                  </button>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Edit className="h-3.5 w-3.5" />}
                  onClick={() => navigate(`/candidate/resumes/${res.id}/edit`)}
                >
                  Edit CV
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Rename Modal */}
      <Modal isOpen={renameId !== null} onClose={() => setRenameId(null)} title="Rename Resume">
        <form onSubmit={handleRenameSubmit} className="flex flex-col gap-4">
          <Input
            label="New Resume Title"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            autoFocus
          />
          <div className="flex justify-end gap-3 mt-4 border-t border-slate-50 pt-4">
            <Button variant="ghost" onClick={() => setRenameId(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default Resumes;
