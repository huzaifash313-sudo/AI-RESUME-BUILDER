import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    // KHRABI FIX: Date formatting ko safe banaya taake invalid dates par crash na ho
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
        <div className="max-w-4xl mx-auto my-10 bg-white shadow-2xl min-h-[29.7cm] text-slate-800 font-sans">
            {/* Top Decorative Bar */}
            <div className="h-4 w-full" style={{ backgroundColor: accentColor }}></div>

            <div className="p-12">
                {/* Header Section - Modern Centered Layout */}
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-3 uppercase" style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-xl font-medium text-slate-500 mb-6 tracking-widest uppercase">
                        {data.personal_info?.profession || "Professional Title"}
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 text-sm font-medium text-slate-600">
                        {data.personal_info?.email && (
                            <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Mail className="size-4" style={{ color: accentColor }} />
                                <span>{data.personal_info.email}</span>
                            </a>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="size-4" style={{ color: accentColor }} />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="size-4" style={{ color: accentColor }} />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Linkedin className="size-4" style={{ color: accentColor }} />
                                <span>LinkedIn</span>
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Globe className="size-4" style={{ color: accentColor }} />
                                <span>Portfolio</span>
                            </a>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-10">
                    {/* Summary Section */}
                    {data.professional_summary && (
                        <section>
                            <h2 className="text-sm font-black tracking-[0.2em] mb-4 border-b pb-2 uppercase" style={{ color: accentColor, borderColor: `${accentColor}33` }}>
                                About Me
                            </h2>
                            <p className="text-slate-700 text-base leading-relaxed text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience Section */}
                    {data.experience && data.experience.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black tracking-[0.2em] mb-6 border-b pb-2 uppercase" style={{ color: accentColor, borderColor: `${accentColor}33` }}>
                                Work Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                                            <span className="text-sm font-bold text-slate-500 italic">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-md font-semibold mb-3" style={{ color: accentColor }}>{exp.company}</p>
                                        {exp.description && (
                                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line border-l-2 pl-4 ml-1">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects Section */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-sm font-black tracking-[0.2em] mb-6 border-b pb-2 uppercase" style={{ color: accentColor, borderColor: `${accentColor}33` }}>
                                Featured Projects
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.project.map((proj, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                                        <h3 className="font-bold text-slate-800 mb-1">{proj.name}</h3>
                                        <p className="text-sm text-slate-600 mb-2">{proj.description}</p>
                                        {proj.link && <a href={proj.link} className="text-xs font-bold underline" style={{ color: accentColor }}>View Project</a>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education & Skills Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Education */}
                        {data.education && data.education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-black tracking-[0.2em] mb-6 border-b pb-2 uppercase" style={{ color: accentColor, borderColor: `${accentColor}33` }}>
                                    Education
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                                            <p className="text-sm text-slate-600">{edu.institution}</p>
                                            <div className="flex justify-between text-xs font-bold text-slate-500 mt-1">
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
                                <h2 className="text-sm font-black tracking-[0.2em] mb-6 border-b pb-2 uppercase" style={{ color: accentColor, borderColor: `${accentColor}33` }}>
                                    Expertise
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1 text-xs font-bold rounded-full border transition-all"
                                            style={{ 
                                                borderColor: accentColor, 
                                                color: accentColor,
                                                backgroundColor: `${accentColor}10`
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
        </div>
    );
}

export default ClassicTemplate;