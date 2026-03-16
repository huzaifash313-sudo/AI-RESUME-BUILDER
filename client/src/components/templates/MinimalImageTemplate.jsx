import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    // KHRABI FIX: Memory leak se bachne ke liye URL revoke karna zaroori hai
    useEffect(() => {
        let url = null;
        if (data.personal_info?.image) {
            if (typeof data.personal_info.image === 'object') {
                url = URL.createObjectURL(data.personal_info.image);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(data.personal_info.image);
            }
        }
        return () => {
            if (url) URL.revokeObjectURL(url);
        };
    }, [data.personal_info?.image]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg text-zinc-800 font-sans min-h-[29.7cm]">
            <div className="grid grid-cols-12 min-h-full">
                
                {/* Left Sidebar (1/3rd) */}
                <aside className="col-span-4 border-r border-zinc-100 bg-zinc-50/50 p-8 flex flex-col gap-8">
                    
                    {/* Profile Image Section */}
                    <div className="flex justify-center py-4">
                        {previewUrl ? (
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full blur-md opacity-20" style={{ backgroundColor: accentColor }}></div>
                                <img 
                                    src={previewUrl} 
                                    alt="Profile" 
                                    className="w-40 h-40 object-cover rounded-full border-4 relative z-10 shadow-sm" 
                                    style={{ borderColor: 'white' }}
                                />
                            </div>
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold">
                                NO PHOTO
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    <section>
                        <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase">Contact</h2>
                        <div className="space-y-4 text-sm font-medium">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={16} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={16} style={{ color: accentColor }} />
                                    <span className="break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education Section */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase">Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-zinc-800 text-xs uppercase leading-tight">{edu.degree}</p>
                                        <p className="text-zinc-600 text-xs mt-1">{edu.institution}</p>
                                        <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span key={index} className="px-2 py-1 bg-white border border-zinc-200 text-[11px] font-bold rounded shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content (2/3rd) */}
                <main className="col-span-8 p-12">
                    {/* Name Header */}
                    <header className="mb-12">
                        <h1 className="text-5xl font-black text-zinc-800 tracking-tight leading-none mb-4 uppercase">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <div className="h-1.5 w-20 mb-4" style={{ backgroundColor: accentColor }}></div>
                        <p className="uppercase text-zinc-500 font-bold text-sm tracking-[0.4em]">
                            {data?.personal_info?.profession || "Profession"}
                        </p>
                    </header>

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-12">
                            <h2 className="text-xs font-black tracking-[0.2em] mb-4 uppercase" style={{ color: accentColor }}>Profile</h2>
                            <p className="text-zinc-600 text-sm leading-relaxed text-justify">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-xs font-black tracking-[0.2em] mb-6 uppercase" style={{ color: accentColor }}>Experience</h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-zinc-800 text-base uppercase">{exp.position}</h3>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <div className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line border-l border-zinc-100 pl-4">
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
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] mb-6 uppercase" style={{ color: accentColor }}>Featured Projects</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {data.project.map((project, index) => (
                                    <div key={index} className="group border-l-2 pl-5 py-1 transition-colors hover:border-zinc-300" style={{ borderColor: `${accentColor}40` }}>
                                        <h3 className="text-sm font-bold text-zinc-800 mb-1 uppercase tracking-tight">{project.name}</h3>
                                        {project.description && (
                                            <p className="text-zinc-600 text-xs leading-relaxed">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}

export default MinimalImageTemplate;