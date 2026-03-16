import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const MinimalImageTemplate = ({ data, accentColor }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    // KHRABI FIX: URL.createObjectURL ka memory leak bachane ke liye useEffect use kiya
    useEffect(() => {
        if (data.personal_info?.image && typeof data.personal_info.image === 'object') {
            const url = URL.createObjectURL(data.personal_info.image);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        } else if (typeof data.personal_info?.image === 'string') {
            setPreviewUrl(data.personal_info.image);
        }
    }, [data.personal_info?.image]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        try {
            const [year, month] = dateStr.split("-");
            return new Date(year, month - 1).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg text-zinc-800 font-sans min-h-[29.7cm]">
            <div className="grid grid-cols-12 min-h-screen">
                
                {/* Left Sidebar (1/3 of the layout) */}
                <aside className="col-span-4 border-r border-zinc-200 bg-zinc-50/50 p-8 flex flex-col gap-8">
                    
                    {/* Image Section */}
                    <div className="flex justify-center">
                        {previewUrl ? (
                            <div className="relative">
                                <div 
                                    className="absolute inset-0 rounded-full blur-sm opacity-20" 
                                    style={{ backgroundColor: accentColor }}
                                ></div>
                                <img 
                                    src={previewUrl} 
                                    alt="Profile" 
                                    className="w-40 h-40 object-cover rounded-full border-4 relative z-10 shadow-sm"
                                    style={{ borderColor: 'white' }} 
                                />
                            </div>
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400">
                                No Photo
                            </div>
                        )}
                    </div>

                    {/* Contact Section */}
                    <section>
                        <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase">
                            Contact
                        </h2>
                        <div className="space-y-4 text-sm">
                            {data.personal_info?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone size={16} style={{ color: accentColor }} />
                                    <span className="font-medium text-zinc-700">{data.personal_info.phone}</span>
                                </div>
                            )}
                            {data.personal_info?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail size={16} style={{ color: accentColor }} />
                                    <span className="font-medium text-zinc-700 break-all">{data.personal_info.email}</span>
                                </div>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-3">
                                    <MapPin size={16} style={{ color: accentColor }} />
                                    <span className="font-medium text-zinc-700">{data.personal_info.location}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Education Section */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase">
                                Education
                            </h2>
                            <div className="space-y-5">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="group">
                                        <p className="font-bold text-zinc-800 uppercase text-xs leading-tight mb-1">{edu.degree}</p>
                                        <p className="text-zinc-600 text-xs mb-1">{edu.institution}</p>
                                        <p className="text-[10px] font-bold tracking-wider text-zinc-400">
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
                            <h2 className="text-xs font-black tracking-[0.2em] text-zinc-400 mb-4 uppercase">
                                Expertise
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="text-[11px] font-bold px-2 py-1 bg-white border border-zinc-200 rounded"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </aside>

                {/* Main Content (2/3 of the layout) */}
                <main className="col-span-8 p-12">
                    {/* Name Header */}
                    <header className="mb-12">
                        <h1 className="text-5xl font-black text-zinc-800 tracking-tight leading-none mb-3">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        <div 
                            className="h-1 w-20 mb-4" 
                            style={{ backgroundColor: accentColor }}
                        ></div>
                        <p className="uppercase text-zinc-500 font-bold text-sm tracking-[0.3em]">
                            {data?.personal_info?.profession || "Profession"}
                        </p>
                    </header>

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-12">
                            <h2 className="text-xs font-black tracking-[0.2em] mb-4 uppercase" style={{ color: accentColor }}>
                                Profile
                            </h2>
                            <p className="text-zinc-600 leading-relaxed text-sm">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-xs font-black tracking-[0.2em] mb-6 uppercase" style={{ color: accentColor }}>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index} className="relative">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-zinc-800 text-base">{exp.position}</h3>
                                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section>
                            <h2 className="text-xs font-black tracking-[0.2em] mb-6 uppercase" style={{ color: accentColor }}>
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {data.project.map((project, index) => (
                                    <div key={index} className="border-l-2 pl-5 py-1" style={{ borderColor: `${accentColor}40` }}>
                                        <h3 className="text-sm font-bold text-zinc-800 mb-1">{project.name}</h3>
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