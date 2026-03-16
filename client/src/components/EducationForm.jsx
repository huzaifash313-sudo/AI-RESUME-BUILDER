import { GraduationCap, Plus, Trash2, Calendar, School } from "lucide-react";
import React from "react";

const EducationForm = ({ data = [], onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    // KHRABI FIX: User confirmation ke bagair delete karna risky hai
    if (window.confirm("Are you sure you want to remove this education entry?")) {
      const updated = data.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <GraduationCap className="size-5 text-green-600" />
            Education
          </h3>
          <p className="text-xs text-slate-500">Add your academic background</p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="size-3.5" />
          Add New
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
             <School className="size-8 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-400">No education entries yet</p>
          <button onClick={addEducation} className="mt-2 text-xs font-bold text-green-600 hover:underline">Click here to add</button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div
              key={index}
              className="group relative p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-green-200 transition-all"
            >
              {/* Delete Button - Positioned Top Right */}
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute -top-2 -right-2 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>

              <div className="grid grid-cols-1 gap-4">
                {/* Institution Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Institution</label>
                  <input
                    type="text"
                    value={education.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="e.g. Stanford University"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Degree */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Degree</label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  {/* Field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Field</label>
                    <input
                      type="text"
                      value={education.field}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {/* Date */}
                   <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Graduation Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                      <input
                        type="month"
                        value={education.graduation_date}
                        onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  {/* GPA */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">GPA (Optional)</label>
                    <input
                      type="text"
                      value={education.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      placeholder="e.g. 3.8/4.0"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;