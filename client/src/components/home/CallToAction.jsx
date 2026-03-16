import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div id="cta" className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-6 sm:px-16 mt-28'>
      <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-6 md:px-16 border-x border-dashed border-slate-200 py-16 sm:py-24 bg-white/50">
        <h2 className="text-2xl md:text-3xl font-bold max-w-md text-slate-900 leading-tight">
          Build a Professional Resume That Helps You Stand Out and Get Hired
        </h2>
        
        <Link 
          to="/app?state=register" 
          className="flex items-center gap-2 rounded-full py-4 px-10 bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 text-white font-semibold"
        >
          <span>Get Started Now</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5"
          >
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default CallToAction