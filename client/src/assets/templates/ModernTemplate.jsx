import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
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

    // KHRABI FIX: URL parsing ko safe banaya taake invalid URLs par crash na ho
    const cleanUrl = (url) => {
        if (!url) return "";
        return url.replace(/^https?:\/\/(www\.)?/, "");
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg text-slate-800 font-sans min-h-[29.7cm]">
            {/* Header: High Impact */}
            <header className="p-10 text-white flex flex-col md:flex-row justify-between items-center gap-6" style={{ backgroundColor: accentColor }}>
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-black tracking-tighter mb-2 uppercase">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-lg font-medium opacity-90 tracking-[0.2em] uppercase">
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-y-2 text-sm font-medium">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-3">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-3">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-3">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    <div className="flex gap-4 mt-2">
                        {data.personal_info?.linkedin && (
                            <a target="_blank" rel="noreferrer" href={data.personal_info.linkedin} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                                <Linkedin className="size-4" />
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a target="_blank" rel="noreferrer" href={data.personal_info.website} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                                <Globe className="size-4" />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className="p-10">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: accentColor }}>
                                Professional Profile
                            </h2>
                            <div className="h-[1px] w-full bg-slate-100"></div>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base italic border-l-4 pl-6" style={{ borderColor: accentColor }}>
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: accentColor }}>
                                Career History
                            </h2>
                            <div className="h-[1px] w-full bg-slate-100"></div>
                        </div>

                        <div className="space-y-10">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="group relative">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{exp.position}</h3>
                                        <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-md font-bold mb-4 uppercase tracking-widest text-sm" style={{ color: accentColor }}>{exp.company}</p>
                                    {exp.description && (
                                        <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
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
                    <section className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: accentColor }}>
                                Key Projects
                            </h2>
                            <div className="h-[1px] w-full bg-slate-100"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.project.map((p, index) => (
                                <div key={index} className="p-6 rounded-xl border border-slate-100 bg-slate-50/50">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">{p.name}</h3>
                                    <p className="text-slate-600 text-xs leading-relaxed">{p.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: accentColor }}>
                                    Education
                                </h2>
                                <div className="h-[1px] w-full bg-slate-100"></div>
                            </div>
                            <div className="space-y-6">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-sm font-medium mt-1" style={{ color: accentColor }}>{edu.institution}</p>
                                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mt-2">
                                            <span>{formatDate(edu.graduation_date)}</span>
                                            {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: accentColor }}>
                                    Core Expertise
                                </h2>
                                <div className="h-[1px] w-full bg-slate-100"></div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 text-[11px] font-bold rounded-lg transition-all border"
                                        style={{ 
                                            backgroundColor: `${accentColor}10`, 
                                            color: accentColor,
                                            borderColor: `${accentColor}20`
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModernTemplate;