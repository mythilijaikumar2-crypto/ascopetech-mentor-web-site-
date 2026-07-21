import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { mockCareers, careerCategories } from "../../data/careers";
import { Target, Search, ArrowRight } from "lucide-react";

export const Careers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredCareers = mockCareers.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-3">
          <Badge variant="primary" className="max-w-fit">CAREER PATHS</Badge>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Explore Professional Career Paths
          </h1>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            Discover salaries, job market growth indices, required skill profiles, and detailed descriptions of major roles in software and business.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-full md:w-80 relative">
            <Input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-3.5 py-1.8 text-xs font-semibold rounded-full border transition-all ${
                selectedCategory === "All"
                  ? "bg-primary-600 border-primary-600 text-white"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Categories
            </button>
            {careerCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.8 text-xs font-semibold rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Careers Grid */}
        {filteredCareers.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <Target className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No career paths found</h3>
            <p className="text-xs text-slate-450 mt-1">Try adjusting your search keywords or categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCareers.map((career) => (
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
                  <h3 className="text-base font-bold text-slate-850 tracking-tight mb-2">
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
                  <Button variant="ghost" size="sm" className="p-2 text-primary-600 group-hover:text-primary-700" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
export default Careers;
