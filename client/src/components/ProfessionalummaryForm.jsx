import { Loader2, Sparkles, Quote } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../configs/api'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
    const { token } = useSelector(state => state.auth)
    const [isGenerating, setIsGenerating] = useState(false)

    const generateSummary = async () => {
        // KHRABI FIX: Empty data check taake faltu API calls na hon
        if (!data || data.trim().length < 10) {
            return toast.error("Please write at least a small draft first so AI can enhance it!")
        }

        try {
            setIsGenerating(true)
            const prompt = `enhance my professional summary "${data}". Make it professional, high-impact, and keep it under 4-5 sentences.`;
            
            const response = await api.post('/api/ai/enhance-pro-sum', 
                { userContent: prompt }, 
                { headers: { Authorization: token } }
            )

            // KHRABI FIX: Wrapped content handling
            const enhanced = response.data?.enhancedContent || response.data;
            
            if (enhanced) {
                setResumeData(prev => ({ ...prev, professional_summary: enhanced }))
                toast.success("Summary enhanced by AI!")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "AI Enhancement failed")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className='space-y-6 font-poppins'>
            {/* Header Section */}
            <div className='flex items-center justify-between pb-4 border-b border-slate-100'> 
                <div>
                    <h3 className='flex items-center gap-2 text-xl font-bold text-slate-800'>
                        <Quote className='size-5 text-green-600 rotate-180' />
                        Professional Summary
                    </h3>
                    <p className='text-xs text-slate-500 mt-1'>Introduce yourself to the recruiters</p>
                </div>
                
                <button 
                    disabled={isGenerating} 
                    onClick={generateSummary} 
                    className='flex items-center gap-2 px-4 py-2 text-xs font-bold bg-violet-600 text-white rounded-full hover:bg-violet-700 shadow-md shadow-violet-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isGenerating ? (
                        <Loader2 className='size-3.5 animate-spin'/>
                    ) : (
                        <Sparkles className='size-3.5 fill-white/20'/>
                    )}
                    {isGenerating ? "OPTIMIZING..." : "MAGIC ENHANCE"}
                </button>
            </div>

            <div className='relative group'>
                {/* Visual Accent */}
                <div className='absolute -left-2 top-4 bottom-4 w-1 bg-slate-100 group-focus-within:bg-green-500 transition-colors rounded-full'></div>
                
                <textarea 
                    value={data || ""} 
                    onChange={(e) => onChange(e.target.value)} 
                    rows={8} 
                    className='w-full p-4 pl-6 text-sm bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all leading-relaxed text-slate-700' 
                    placeholder='Describe your career highlights... (Tip: Write a basic draft and click Magic Enhance)'
                />

                <div className='mt-4 p-4 bg-green-50 rounded-xl border border-green-100/50'>
                    <p className='text-[11px] text-green-700 leading-relaxed'>
                        <span className='font-black uppercase mr-2'>Expert Tip:</span> 
                        Focus on 3-4 sentences that highlight your biggest achievements and most relevant skills. 
                        AI works best when you provide context like years of experience or key technologies.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm;