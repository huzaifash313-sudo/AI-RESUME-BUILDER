import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    // KHRABI FIX: Date parsing ko robust kiya taake browser inconsistencies se bacha ja sake
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
        <div className="max-w-4xl mx-auto p-12 bg-white text-slate-800 leading-relaxed shadow-sm min-h-[29.7cm]">
            {/* Header: Centered & Balanced */}
            <header className="text-center mb-10 pb-8 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-4xl font-extrabold mb-3 uppercase tracking-tight" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1.5">
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="truncate max-w-[150px]">{data.personal_info.linkedin.replace(/^https?:\/\/(www\.)?/, "")}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold mb-3 border-l-4 pl-3 uppercase tracking-wider" style={{ color: accentColor, borderLeftColor: accentColor }}>
                        Professional Summary
                    </h2>
                    <p className="text-slate-700 text-justify leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold mb-5 border-l-4 pl-3 uppercase tracking-wider" style={{ color: accentColor, borderLeftColor: accentColor }}>
                        Work Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="relative">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                                    <span className="text-sm font-bold text-slate-500 italic">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-md font-semibold mb-2" style={{ color: accentColor }}>{exp.company}</p>
                                {exp.description && (
                                    <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line pl-1">
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
                <section className="mb-8">
                    <h2 className="text-lg font-bold mb-5 border-l-4 pl-3 uppercase tracking-wider" style={{ color: accentColor, borderLeftColor: accentColor }}>
                        Key Projects
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="border-b border-slate-100 pb-3 last:border-0">
                                <h3 className="font-bold text-slate-800">{proj.name}</h3>
                                <p className="text-sm text-slate-600 mt-1">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-4 border-l-4 pl-3 uppercase tracking-wider" style={{ color: accentColor, borderLeftColor: accentColor }}>
                            Education
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                                    <p className="text-sm text-slate-600">{edu.institution}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1">
                                        {formatDate(edu.graduation_date)} {edu.gpa && `| GPA: ${edu.gpa}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-4 border-l-4 pl-3 uppercase tracking-wider" style={{ color: accentColor, borderLeftColor: accentColor }}>
                            Core Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default ClassicTemplate;