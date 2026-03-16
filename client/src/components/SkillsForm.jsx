import { Plus, Sparkles, X, BrainCircuit } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    const trimmedSkill = newSkill.trim();
    
    // KHRABI FIX: Case-insensitive redundancy check lagaya hai
    if (trimmedSkill) {
      const isDuplicate = data.some(
        (skill) => skill.toLowerCase() === trimmedSkill.toLowerCase()
      );

      if (!isDuplicate) {
        onChange([...data, trimmedSkill]);
        setNewSkill("");
      } else {
        // Optional: Yahan aap toast notification bhi de sakte hain
        setNewSkill("");
      }
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className='space-y-6 font-poppins'>
      {/* Header */}
      <div className="pb-4 border-b border-slate-100">
        <h3 className='flex items-center gap-2 text-xl font-bold text-slate-800'>
          <BrainCircuit className='size-5 text-green-600' />
          Core Expertise
        </h3>
        <p className='text-xs text-slate-500 mt-1'>Add your technical and interpersonal skills</p>
      </div>

      {/* Input Group */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <div className='relative flex-1'>
          <input
            type="text"
            placeholder='e.g. React.js, UI/UX Design'
            className='w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all'
            onChange={(e) => setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress}
          />
        </div>

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className='flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-100'
        >
          <Plus className='size-4' /> Add
        </button>
      </div>

      {/* Skills Display Area */}
      <div className='min-h-[100px] p-4 bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-2xl'>
        {data.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {data.map((skill, index) => (
              <div 
                key={index} 
                className='group flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold shadow-sm hover:border-green-300 transition-all animate-in zoom-in duration-200'
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className='text-slate-400 hover:text-red-500 transition-colors'
                >
                  <X className='size-3' />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-6 text-gray-400'>
            <Sparkles className='size-8 mx-auto mb-2 opacity-20' />
            <p className='text-xs font-medium'>No skills listed yet.</p>
          </div>
        )}
      </div>

      {/* Professional Tip Card */}
      <div className='p-4 bg-green-50 rounded-xl border border-green-100/50 flex gap-3'>
        <div className='size-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm'>
            <Sparkles className='size-4 text-green-600' />
        </div>
        <p className='text-[11px] text-green-800 leading-relaxed'>
          <span className='font-black uppercase block mb-0.5'>Pro Tip</span>
          Aim for 8-12 skills. Mix hard skills like <span className='font-bold'>TypeScript</span> with soft skills like <span className='font-bold'>Agile Leadership</span> to pass ATS filters.
        </p>
      </div>
    </div>
  )
}

export default SkillsForm