import React from 'react'

const Loader = () => {
  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]'>
        {/* Outer Spinner */}
        <div className='relative flex items-center justify-center'>
            <div className='size-14 border-4 border-slate-100 border-t-green-600 rounded-full animate-spin'></div>
            
            {/* Nexo Mini Logo or Dot inside */}
            <div className='absolute size-2 bg-green-600 rounded-full animate-pulse'></div>
        </div>
        
        {/* Optional text for better UX */}
        <p className='mt-4 text-xs font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse'>
            Optimizing...
        </p>
    </div>
  )
}

export default Loader