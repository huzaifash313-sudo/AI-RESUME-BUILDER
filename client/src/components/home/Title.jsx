import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className='flex flex-col items-center text-center mt-8 mb-10 px-4'>
      {/* KHRABI FIX: Font weight aur tracking ko Nexo brand ke mutabiq kiya */}
      <h2 className='text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight'>
        {title}
      </h2>
      
      {/* KHRABI FIX: max-sm invalid class hatayi aur max-w-2xl ko center kiya */}
      {description && (
        <p className='mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed'>
          {description}
        </p>
      )}
    </div>
  )
}

export default Title