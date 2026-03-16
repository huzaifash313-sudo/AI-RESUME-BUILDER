import { Plus, Trash2, FolderCode, Lightbulb } from "lucide-react";
import React from "react";

const ProjectForm = ({ data = [], onChange }) => {

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    // KHRABI FIX: User confirmation ke bagair delete karna data loss karwa sakta hai
    if (window.confirm("Are you sure you want to remove this project?")) {
      const updated = data.filter((_, i) => i !== index);
      onChange(updated);
    }
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <FolderCode className="size-5 text-green-600" />
            Projects
          </h3>
          <p className="text-xs text-slate-500 mt-1">Showcase your best work</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md shadow-green-100 transition-all active:scale-95"
        >
          <Plus className="size-3.5" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
             <Lightbulb className="size-8 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-400">No projects added yet</p>
          <button onClick={addProject} className="mt-2 text-xs font-bold text-green-600 hover:underline">Click here to start</button>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-green-200 transition-all"
            >
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute -top-2 -right-2 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <Trash2 className="size-3.5" />
              </button>

              <div className="flex flex-col gap-5">
                {/* Project Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="e.g. Nexo Social Media Platform"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                    Project Category
                  </label>
                  <input
                    type="text"
                    value={project.type}
                    onChange={(e) => updateProject(index, "type", e.target.value)}
                    placeholder="e.g. Full Stack Web Application"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    placeholder="Describe the problem you solved, technologies used, and the final outcome..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all leading-relaxed resize-none"
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

export default ProjectForm;