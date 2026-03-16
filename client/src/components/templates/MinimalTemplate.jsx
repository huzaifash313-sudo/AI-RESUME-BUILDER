import React from 'react';

const MinimalTemplate = ({ data, accentColor }) => {
    // KHRABI FIX: Date parsing ko robust kiya taake invalid strings par UI crash na ho
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-12 bg-white text-slate-900 font-sans min-h-[29.7cm] shadow-sm">
            {/* Header: Clean & Sophisticated */}
            <header className="mb-12 border-b pb-8 border-slate-100">
                <h1 className="text-5xl font-extralight mb-4 tracking-tighter text-slate-800 uppercase">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-sm font-bold uppercase tracking-[0.3em] mb-6" style={{ color: accentColor }}>
                    {data.personal_info?.profession || "Profession"}
                </p>

                <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">LinkedIn</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">Portfolio</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-12 grid grid-cols-4 gap-4">
                    <h2 className="col-span-1 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                        Profile
                    </h2>
                    <div className="col-span-3">
                        <p className="text-slate-600 leading-relaxed font-light text-base">
                            {data.professional_summary}
                        </p>
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-12 grid grid-cols-4 gap-4">
                    <h2 className="col-span-1 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                        Experience
                    </h2>

                    <div className="col-span-3 space-y-10">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="group">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-medium text-slate-800">{exp.position}</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-sm font-semibold mb-3 italic text-slate-500">{exp.company}</p>
                                {exp.description && (
                                    <div className="text-slate-600 leading-relaxed font-light text-sm border-l border-slate-100 pl-4 whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-12 grid grid-cols-4 gap-4">
                    <h2 className="col-span-1 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                        Projects
                    </h2>

                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="text-base font-semibold mb-2 text-slate-800 underline decoration-slate-200 underline-offset-4 tracking-tight">{proj.name}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-12 grid grid-cols-4 gap-4">
                    <h2 className="col-span-1 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                        Education
                    </h2>

                    <div className="col-span-3 space-y-6">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-slate-800 text-base">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-light">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[10px] mt-1 text-slate-400 font-bold uppercase">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="grid grid-cols-4 gap-4">
                    <h2 className="col-span-1 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                        Skills
                    </h2>

                    <div className="col-span-3 flex flex-wrap gap-y-2 gap-x-4">
                        {data.skills.map((skill, index) => (
                            <span key={index} className="text-xs font-medium text-slate-700">
                                {skill}{index !== data.skills.length - 1 && <span className="ml-4 text-slate-200">/</span>}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;