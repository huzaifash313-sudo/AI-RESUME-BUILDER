import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, Loader2, Printer, Share2 } from 'lucide-react'
import api from '../configs/api'
import toast from 'react-hot-toast'

const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadResume = async () => {
    try {
      // Public route call
      const { data } = await api.get(`/api/resumes/public/${resumeId}`)
      const resume = data?.resume || data;
      setResumeData(resume)
    } catch (err) {
      setError('This resume is private or no longer exists.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [resumeId])

  const handlePrint = () => {
    window.print();
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Public link copied to clipboard!");
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <Loader2 className="animate-spin size-12 text-green-600 mb-4" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Fetching Resume...</p>
      </div>
    )
  }

  if (error || !resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-6">
        <div className="size-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
            <XIcon size={40} />
        </div>
        <p className="text-center text-2xl text-slate-800 font-black tracking-tight max-w-md">{error}</p>
        <Link
          to="/"
          className="mt-8 bg-slate-900 text-white rounded-2xl px-10 py-4 font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          <ArrowLeftIcon className="size-5" /> Go to Home Page
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 min-h-screen font-poppins pb-20 selection:bg-green-100">
      {/* Top Floating Navbar - Hidden on Print */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 print:hidden">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/">
                <img src="/logo.svg" alt="Nexo Logo" className="h-8 w-auto" />
            </Link>
            
            <div className="flex items-center gap-3">
                <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                >
                    <Share2 size={16} /> Share Link
                </button>
                <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-2 text-xs font-bold bg-green-600 text-white rounded-full hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95"
                >
                    <Printer size={16} /> Download / Print
                </button>
            </div>
        </div>
      </nav>

      {/* Resume Container */}
      <div className="max-w-5xl mx-auto mt-10 px-4 print:mt-0 print:px-0">
        <div className="flex flex-col items-center">
            {/* KHRABI FIX: Humne classes pass ki hain taake Preview page par background overlap na ho */}
            <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                classes="!bg-transparent !p-0 !border-none !shadow-none"
            />
        </div>
      </div>
      
      {/* Branding for public viewers */}
      <div className="text-center mt-12 print:hidden">
        <p className="text-xs text-slate-400 font-medium">
            Generated with <span className="font-bold text-green-600">Nexo AI Resume Builder</span>
        </p>
      </div>
    </div>
  )
}

// Dummy placeholder to prevent import errors in this snippet
const XIcon = ({size}) => <span style={{fontSize: size}}>✕</span>;

export default Preview;