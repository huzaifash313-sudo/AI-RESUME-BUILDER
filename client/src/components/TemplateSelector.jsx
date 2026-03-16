import { Check, Layout, Sparkles } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)

  // KHRABI FIX: Click outside hone par dropdown band hona chahiye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const templates = [
    {
      id: "classic",
      name: "Classic Professional",
      preview: "A traditional, high-authority format preferred by Fortune 500 recruiters."
    },
    {
      id: "modern",
      name: "Modern Sidebar",
      preview: "Sleek, creative design with a dynamic sidebar and bold accents."
    },
    {
      id: "minimal-image",
      name: "Minimalist Photo",
      preview: "Clean, personality-driven layout featuring a professional profile photo."
    },
    {
      id: "minimal",
      name: "Ultra Minimal",
      preview: "Strictly focus on your expertise with a distraction-free whitespace layout."
    },
  ]

  return (
    <div className='relative font-poppins' ref={selectorRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all px-4 py-2.5 rounded-full active:scale-95'
      >
        <Layout size={16} className="text-green-600" /> 
        <span className='max-sm:hidden'>Choose Template</span>
      </button>

      {isOpen && (
        <div className='absolute top-full right-0 md:left-0 w-72 md:w-80 p-4 mt-3 z-[110] bg-white rounded-2xl border border-slate-100 shadow-2xl animate-in fade-in zoom-in duration-200'>
          <p className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-1'>
            Available Layouts
          </p>
          
          <div className='space-y-3'>
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id)
                  setIsOpen(false)
                }}
                className={`group relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? "border-green-500 bg-green-50/50 shadow-inner"
                    : "border-slate-100 hover:border-green-200 hover:bg-slate-50"
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className='absolute -top-2 -right-2'>
                    <div className='size-6 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-200 ring-2 ring-white'>
                      <Check className='size-3.5 text-white stroke-[3]' />
                    </div>
                  </div>
                )}
                
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <h4 className={`text-sm font-bold transition-colors ${
                      selectedTemplate === template.id ? "text-green-800" : "text-slate-700"
                    }`}>
                      {template.name}
                    </h4>
                    {template.id === 'modern' && (
                        <span className='text-[8px] bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded font-black uppercase'>New</span>
                    )}
                  </div>
                  <p className='text-[11px] text-slate-500 leading-relaxed italic'>
                    {template.preview}
                  </p>
                </div>

                {/* Subtle Hover Decor */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all ${
                    selectedTemplate === template.id ? 'bg-green-600' : 'bg-transparent group-hover:bg-green-300'
                }`}></div>
              </div>
            ))}
          </div>

          <div className='mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2'>
            <Sparkles className='size-3 text-violet-500 shrink-0' />
            <p className='text-[10px] text-slate-500 font-medium'>Templates are ATS-optimized by default.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector