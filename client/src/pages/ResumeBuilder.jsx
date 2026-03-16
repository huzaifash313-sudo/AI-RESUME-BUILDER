import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
  Save,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast'
import api from "../configs/api";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#16a34a", 
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = useCallback(async () => {
    try {
      const response = await api.get('/api/resumes/get/' + resumeId, { 
        headers: { Authorization: token } 
      });
      
      // KHRABI FIX: Response handling for unwrapped data
      const data = response.data?.resume || response.data;
      if (data) {
        setResumeData(data);
        document.title = `Editing: ${data.title || 'Resume'}`;
      }
    } catch (error) {
      toast.error("Failed to load resume data");
    }
  }, [resumeId, token]);

  useEffect(() => {
    if (token && resumeId) loadExistingResume();
  }, [loadExistingResume, token, resumeId]);

  const saveResume = async (passedData = null) => {
    const dataToSave = passedData || resumeData;
    
    try {
      setIsSaving(true);
      const updatedResumeData = JSON.parse(JSON.stringify(dataToSave));

      // Image property cleanup for FormData
      if (updatedResumeData.personal_info?.image && typeof updatedResumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      if (removeBackground) formData.append("removeBackground", "true");
      
      if (resumeData.personal_info?.image instanceof File) {
        formData.append("image", resumeData.personal_info.image);
      }

      // ✅ URL FIXED: Added /${resumeId} to match Backend PUT route
      const resp = await api.put(`/api/resumes/update/${resumeId}`, formData, { 
        headers: { 
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        } 
      });

      const serverData = resp?.data?.resume || resp?.data || dataToSave;
      setResumeData(serverData);
      return serverData;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      throw new Error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTrigger = () => {
    toast.promise(saveResume(), {
      loading: 'Syncing with Nexo Cloud...',
      success: 'Progress saved successfully!',
      error: (err) => `Save failed: ${err.message}`,
    });
  };

  const changeResumeVisibility = async () => {
    const previousStatus = resumeData.public;
    const newStatus = !previousStatus;
    
    setResumeData(prev => ({ ...prev, public: newStatus }));
    
    try {
      // ✅ URL FIXED: Matching Backend update route
      await api.put(`/api/resumes/update/${resumeId}`, {
        resumeData: { ...resumeData, public: newStatus }
      }, { headers: { Authorization: token } });
      
      toast.success(`Resume is now ${newStatus ? 'Public' : 'Private'}`);
    } catch (error) {
      setResumeData(prev => ({ ...prev, public: previousStatus }));
      toast.error("Visibility update failed");
    }
  };

  const handleShare = () => {
    const resumeUrl = `${window.location.origin}/view/${resumeId}`;
    if (navigator.share) {
      navigator.share({ title: resumeData.title, url: resumeUrl });
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success('Public link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins pb-20">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/app" className="group flex items-center gap-2 text-slate-400 hover:text-green-600 transition-all font-bold text-sm">
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-green-50 transition-colors">
            <ArrowLeftIcon size={16} />
          </div>
          Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Title</span>
             <span className="text-sm font-bold text-slate-700">{resumeData.title || "Untitled"}</span>
          </div>
          <button onClick={handleSaveTrigger} disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50">
            <Save size={14} /> {isSaving ? 'Saving...' : 'Save Progress'}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Editor Panel */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="w-full h-1.5 bg-slate-100 flex">
                <div 
                  className="h-full bg-green-500 transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                  style={{ width: `${((activeSectionIndex + 1) / sections.length) * 100}%` }}
                ></div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <TemplateSelector selectedTemplate={resumeData.template} onChange={(t) => setResumeData(prev => ({...prev, template: t}))} />
                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(c) => setResumeData(prev => ({...prev, accent_color: c}))} />
                  </div>
                  
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button 
                      onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeSectionIndex === 0}
                      className="p-2 hover:bg-white disabled:opacity-30 rounded-lg transition-all"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-[10px] font-black w-10 text-center text-slate-400">
                      {activeSectionIndex + 1} / {sections.length}
                    </span>
                    <button 
                      onClick={() => setActiveSectionIndex(prev => Math.min(sections.length - 1, prev + 1))}
                      disabled={activeSectionIndex === sections.length - 1}
                      className="p-2 hover:bg-white disabled:opacity-30 rounded-lg transition-all"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="min-h-[450px]">
                  {activeSection.id === 'personal' && <PersonalInfoForm data={resumeData.personal_info} onChange={(d) => setResumeData(p => ({...p, personal_info: d}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>}
                  {activeSection.id === 'summary' && <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(d) => setResumeData(p => ({...p, professional_summary: d}))} setResumeData={setResumeData} />}
                  {activeSection.id === 'experience' && <ExperienceForm data={resumeData.experience} onChange={(d) => setResumeData(p => ({...p, experience: d}))} />}
                  {activeSection.id === 'education' && <EducationForm data={resumeData.education} onChange={(d) => setResumeData(p => ({...p, education: d}))} />}
                  {activeSection.id === 'projects' && <ProjectForm data={resumeData.project} onChange={(d) => setResumeData(p => ({...p, project: d}))} />}
                  {activeSection.id === 'skills' && <SkillsForm data={resumeData.skills} onChange={(d) => setResumeData(p => ({...p, skills: d}))} />}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white/70 backdrop-blur-md p-3 rounded-[2rem] border border-white shadow-sm flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${isSaving ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {isSaving ? 'Cloud Syncing...' : 'Live Preview'}
                    </span>
                </div>
                
                <div className="flex items-center gap-2">
                    {resumeData.public && (
                        <button onClick={handleShare} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="Share Public Link">
                            <Share2Icon size={18} />
                        </button>
                    )}
                    <button onClick={changeResumeVisibility} className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${resumeData.public ? 'bg-violet-100 text-violet-600' : 'bg-slate-100 text-slate-500'}`}>
                        {resumeData.public ? <EyeIcon size={14}/> : <EyeOffIcon size={14}/>}
                        {resumeData.public ? 'Public' : 'Private'}
                    </button>
                    <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-700 shadow-lg transition-all">
                        <DownloadIcon size={14} /> Download PDF
                    </button>
                </div>
            </div>

            <div className="w-full overflow-x-auto lg:overflow-visible pb-10">
                <ResumePreview 
                  data={resumeData} 
                  template={resumeData.template} 
                  accentColor={resumeData.accent_color}
                  classes="shadow-2xl shadow-slate-300 border-none"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;