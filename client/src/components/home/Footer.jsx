import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 mt-40">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 py-16 px-6 md:px-16 text-[13px] text-gray-500">
        
        {/* Left Side: Branding and Links */}
        <div className="flex flex-wrap items-start gap-12 md:gap-20 xl:gap-32">
          <div className="flex flex-col gap-4">
            <Link to="/">
              <img src="/logo.svg" alt="Nexo Logo" className='h-10 w-auto' />
            </Link>
            <p className="max-w-xs leading-relaxed">
              Empowering IT professionals with AI-driven resume tools to land their dream jobs.
            </p>
          </div>

          <div>
            <p className="text-slate-900 font-bold uppercase tracking-wider mb-4">Product</p>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-green-600 transition">Templates</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition">AI Enhancer</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition">Pricing</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition">Support</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-slate-900 font-bold uppercase tracking-wider mb-4">Company</p>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-green-600 transition">About Us</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition">Blogs</Link></li>
              <li>
                <Link to="/" className="hover:text-green-600 transition flex items-center gap-2">
                  Careers
                  <span className="text-[10px] text-white bg-green-600 rounded px-1.5 py-0.5">Hiring</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-slate-900 font-bold uppercase tracking-wider mb-4">Legal</p>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-green-600 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Right Side: Social and Copyright */}
        <div className="flex flex-col items-center lg:items-end gap-4 border-t lg:border-t-0 pt-8 lg:pt-0 border-slate-200">
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-green-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="hover:text-green-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="hover:text-green-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
            </a>
          </div>
          <p className="text-slate-400">© 2026 Nexo AI. All rights reserved.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        footer { font-family: 'Poppins', sans-serif; }
      `}} />
    </footer>
  )
}

export default Footer