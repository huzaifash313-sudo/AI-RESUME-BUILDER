import React, { useEffect, useState } from 'react'
import { 
  FilePenLineIcon, 
  LoaderCircleIcon, 
  PencilIcon, 
  PlusIcon, 
  TrashIcon, 
  UploadCloud, 
  UploadCloudIcon, 
  XIcon,
  LayoutDashboard
} from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from "../configs/api.js"
import pdfToText from 'react-pdftotext'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)
  const colors = ["#9333ea", "#2563eb", "#d97706", "#db2777", "#16a34a"]

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    if (!token) return
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes || [])
    } catch (error) {
      toast.error(error?.message || "Failed to load resumes")
    }
  }

  const createResume = async (event) => {
    event.preventDefault()
    if (!title.trim()) return
    try {
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      closeModals()
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.message || "Error creating resume")
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    if (!resume) return toast.error('Please select a PDF file')
    
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      closeModals()
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error("AI parsing failed. Try a cleaner PDF.")
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async (event) => {
    event.preventDefault()
    try {
      await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title } }, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(r => r._id === editResumeId ? { ...r, title } : r))
      closeModals()
      toast.success("Title updated")
    } catch (error) {
      toast.error("Update failed")
    }
  }

  const deleteResume = async (resumeId) => {
    if (window.confirm('This action cannot be undone. Delete?')) {
      try {
        await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(r => r._id !== resumeId))
        toast.success("Deleted")
      } catch (error) {
        toast.error("Delete failed")
      }
    }
  }

  const closeModals = () => {
    setShowCreateResume(false)
    setShowUploadResume(false)
    setEditResumeId('')
    setTitle('')
    setResume(null)
  }

  useEffect(() => {
    loadAllResumes()
  }, [token])

  return (
    <div className='max-w-7xl mx-auto px-6 py-10 font-poppins'>
      {/* Welcome Header */}
      <header className='mb-10 flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-black text-slate-900 tracking-tight'>
            Hello, <span className='text-green-600'>{user?.name?.split(' ')[0] || "Huzaifa"}!</span>
          </h1>
          <p className='text-slate-500 text-sm font-medium'>You have {allResumes.length} resumes ready to optimize.</p>
        </div>
        <LayoutDashboard className='size-8 text-slate-200 hidden md:block' />
      </header>

      {/* Action Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
        
        {/* Create Card */}
        <button onClick={() => setShowCreateResume(true)} className='h-52 flex flex-col items-center justify-center rounded-3xl gap-3 border-2 border-dashed border-slate-200 bg-slate-50/50 group hover:border-green-500 hover:bg-green-50/30 transition-all duration-300'>
          <div className='p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform'>
            <PlusIcon className="size-8 text-green-600"/>
          </div>
          <span className='text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-green-700'>New Blank</span>
        </button>

        {/* Upload Card */}
        <button onClick={() => setShowUploadResume(true)} className='h-52 flex flex-col items-center justify-center rounded-3xl gap-3 border-2 border-dashed border-slate-200 bg-slate-50/50 group hover:border-violet-500 hover:bg-violet-50/30 transition-all duration-300'>
          <div className='p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform'>
            <UploadCloudIcon className="size-8 text-violet-600"/>
          </div>
          <span className='text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-violet-700'>AI Upload</span>
        </button>

        {/* Existing Resumes */}
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length]
          return (
            <div key={resume._id} className='relative h-52 group'>
               <button 
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className='w-full h-full flex flex-col items-center justify-center rounded-3xl gap-3 border-2 border-white bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
              >
                <div className='p-4 rounded-2xl' style={{ backgroundColor: `${baseColor}15` }}>
                  <FilePenLineIcon className='size-8' style={{ color: baseColor }} />
                </div>
                <div className='text-center px-4'>
                  <p className='text-sm font-bold text-slate-800 line-clamp-1'>{resume.title}</p>
                  <p className='text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1'>
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </button>

              {/* Action Floating Buttons */}
              <div className='absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <button onClick={() => deleteResume(resume._id)} className='p-2 bg-white/90 backdrop-blur text-red-500 rounded-xl shadow-md hover:bg-red-50 transition-colors'>
                  <TrashIcon className='size-4'/>
                </button>
                <button onClick={() => {setEditResumeId(resume._id); setTitle(resume.title)}} className='p-2 bg-white/90 backdrop-blur text-slate-600 rounded-xl shadow-md hover:bg-slate-50 transition-colors'>
                  <PencilIcon className='size-4'/>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Reusable Modal Component Logic for Create/Upload/Edit */}
      {(showCreateResume || showUploadResume || editResumeId) && (
        <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4 animate-in fade-in duration-300'>
          <div className='relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden'>
            <div className='absolute -top-10 -right-10 size-40 bg-green-50 rounded-full blur-3xl'></div>
            
            <header className='relative mb-6'>
              <h2 className='text-2xl font-black text-slate-900'>
                {showUploadResume ? "AI Resume Import" : editResumeId ? "Rename Resume" : "Start New Resume"}
              </h2>
              <button onClick={closeModals} className='absolute -top-2 -right-2 p-2 hover:bg-slate-100 rounded-full transition-colors'>
                <XIcon className='size-5 text-slate-400' />
              </button>
            </header>

            <form onSubmit={showUploadResume ? uploadResume : editResumeId ? editTitle : createResume} className='relative space-y-4'>
              <div className='space-y-1'>
                <label className='text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1'>Resume Title</label>
                <input 
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type='text' 
                  placeholder='e.g. MERN Stack Developer' 
                  className='w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all'
                  required
                />
              </div>

              {showUploadResume && (
                <label className='block'>
                   <input type="file" accept='.pdf' hidden onChange={(e) => setResume(e.target.files[0])}/>
                   <div className='border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-violet-50 hover:border-violet-200 transition-all cursor-pointer'>
                      {resume ? (
                        <p className='text-violet-600 font-bold text-sm'>{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className='size-10 text-slate-300' />
                          <p className='text-xs font-bold text-slate-400'>Drop your PDF here</p>
                        </>
                      )}
                   </div>
                </label>
              )}

              <button 
                disabled={isLoading}
                className={`w-full py-4 text-white rounded-2xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${showUploadResume ? 'bg-violet-600 shadow-violet-200' : 'bg-green-600 shadow-green-200'}`}
              >
                {isLoading ? <LoaderCircleIcon className='animate-spin size-5' /> : <PlusIcon className='size-5'/>}
                {isLoading ? 'Processing PDF...' : showUploadResume ? 'Magic Upload' : 'Create Resume'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard