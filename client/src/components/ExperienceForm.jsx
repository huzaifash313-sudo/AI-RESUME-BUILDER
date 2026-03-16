import { Briefcase, Loader2, Plus, Sparkles, Trash2, Calendar, Building2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useSelector(state => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    if (window.confirm("Delete this experience entry?")) {
      const updated = data.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    
    // KHRABI FIX: Validation check taake khali fields par API call na ho
    if (!experience.position || !experience.company) {
        toast.error("Please enter Position and Company first");
        setGeneratingIndex(-1);
        return;
    }

    const prompt = `enhance this job description "${experience.description || 'General responsibilities'}" for the position of ${experience.position} at ${experience.company}. Make it professional, bulleted, and ATS-friendly.`;

    try {
      const response = await api.post('/api/ai/enhance-job-description', 
        { userContent: prompt }, 
        { headers: { Authorization: token } }
      );
      
      const enhanced = response.data?.enhancedContent || response.data;
      if (enhanced && typeof enhanced === 'string') {
        updateExperience(index, "description", enhanced);
        toast.success('AI Optimized!');
      }
    } catch (error) {
      toast.error('AI Enhancement failed. Please try again.');
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <Briefcase className="size-5 text-green-600" />
            Experience
          </h3>
          <p className="text-xs text-slate-500">Highlight your career journey</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="size-3.5" />
          Add Work
        </button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 text-center">
          <div className="p-4 bg-white rounded-full shadow-sm mb-3">
             <Briefcase className="size-8 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-400 px-10">No work experience added yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((experience, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-green-200 transition-all"
            >
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute -top-2 -right-2 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <Trash2 className="size-3.5" />
              </button>

              <div className="grid grid-cols-1 gap-5">
                {/* Position & Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Title</label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        placeholder="e.g. Google"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Start Date</label>
                    <input
                      type="month"
                      value={experience.start_date}
                      onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">End Date</label>
                    <input
                      type="month"
                      value={experience.end_date}
                      onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                      disabled={experience.is_current}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white disabled:opacity-50 transition-all"
                    />
                  </div>
                </div>

                {/* Current Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    checked={experience.is_current}
                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                    className="size-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-xs font-semibold text-slate-600">I currently work here</span>
                </label>

                {/* AI Enhanced Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
                    <button 
                      onClick={() => generateDescription(index)} 
                      disabled={generatingIndex === index}
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-all disabled:opacity-50 shadow-sm shadow-violet-100"
                    > 
                      {generatingIndex === index ? (
                        <Loader2 className="size-3 animate-spin"/>
                      ) : (
                        <Sparkles className="size-3" />
                      )}
                      MAGIC ENHANCE
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    value={experience.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    className="w-full text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl resize-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all leading-relaxed"
                    placeholder="Describe your achievements... (Tip: Click Magic Enhance to optimize)"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;