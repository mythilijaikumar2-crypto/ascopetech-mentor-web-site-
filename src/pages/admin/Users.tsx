import React, { useState } from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Modal } from "../../components/common/Modal";
import { Select } from "../../components/common/Select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "candidate" | "admin";
  status: "Active" | "Suspended";
  dateCreated: string;
}

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([
    { id: "usr-1", name: "Alex Mercer", email: "candidate@careerai.com", role: "candidate", status: "Active", dateCreated: "2026-06-10" },
    { id: "usr-2", name: "System Admin", email: "admin@careerai.com", role: "admin", status: "Active", dateCreated: "2026-05-01" },
    { id: "usr-3", name: "Sarah Jenkins", email: "sarah@gmail.com", role: "candidate", status: "Active", dateCreated: "2026-07-02" },
    { id: "usr-4", name: "David Chen", email: "chen.d@outlook.com", role: "candidate", status: "Suspended", dateCreated: "2026-07-11" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "candidate" as "candidate" | "admin",
    status: "Active" as "Active" | "Suspended"
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setUserForm({ name: "", email: "", role: "candidate", status: "Active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: UserRecord) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) return;

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...userForm } : u
        )
      );
      toast.success("User updated.");
    } else {
      const newUser: UserRecord = {
        id: `usr-${Math.random().toString(36).substr(2, 9)}`,
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        status: userForm.status,
        dateCreated: new Date().toLocaleDateString()
      };
      setUsers([newUser, ...users]);
      toast.success("User added successfully!");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted.");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <Badge variant="primary">ADMINISTRATION</Badge>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">User Accounts</h1>
          <p className="text-[10px] text-slate-400">View registration logs, modify authorization levels, and suspend user accounts.</p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />} onClick={handleOpenAdd}>
          Add User Account
        </Button>
      </div>

      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col gap-6">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
        </div>

        <div className="overflow-x-auto border border-slate-150 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-150 text-[10px] font-bold text-slate-455 uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-655 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/40">
                  <td className="p-4 font-bold text-slate-800">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <Badge variant={u.role === "admin" ? "danger" : "primary"} size="sm">{u.role}</Badge>
                  </td>
                  <td className="p-4">{u.dateCreated}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button onClick={() => handleOpenEdit(u)} className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id)} className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg">
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

      {/* Edit modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingUser ? "Edit User" : "Add User"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="System Role"
              value={userForm.role}
              onChange={(e: any) => setUserForm({ ...userForm, role: e.target.value })}
              options={[
                { value: "candidate", label: "Candidate" },
                { value: "admin", label: "Admin Console" }
              ]}
            />
            <Select
              label="Account Status"
              value={userForm.status}
              onChange={(e: any) => setUserForm({ ...userForm, status: e.target.value })}
              options={[
                { value: "Active", label: "Active" },
                { value: "Suspended", label: "Suspended" }
              ]}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default UsersPage;
