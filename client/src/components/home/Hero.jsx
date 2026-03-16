import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <>
      <div className="min-h-screen pb-20 overflow-x-hidden font-poppins">
        {/* Navbar */}
        <nav className="relative z-50 flex items-center justify-between w-full py-6 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <Link to="/">
            <img src="/logo.svg" alt="Nexo Logo" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
            <a href="#" className="hover:text-green-600 transition">Home</a>
            <a href="#features" className="hover:text-green-600 transition">Features</a>
            <a href="#testimonials" className="hover:text-green-600 transition">Testimonials</a>
            <a href="#cta" className="hover:text-green-600 transition">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/app?state=login"
                  className="hidden md:block px-6 py-2.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/app?state=register"
                  className="hidden md:block px-6 py-2.5 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-green-100 text-white rounded-full transition-all font-semibold"
                >
                  Get started
                </Link>
              </>
            ) : (
              <Link to="/app" className="hidden md:block px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all font-semibold shadow-lg">
                Dashboard
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lucide lucide-menu">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu - KHRABI FIX: Logic and Colors improved */}
        <div
          className={`fixed inset-0 z-[100] bg-slate-900/95 flex flex-col items-center justify-center text-xl gap-8 md:hidden transition-all duration-500 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl">
            &times;
          </button>
          <a href="#" onClick={() => setMenuOpen(false)} className="text-white hover:text-green-400">Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-white hover:text-green-400">Features</a>
          <Link to="/app" onClick={() => setMenuOpen(false)} className="px-10 py-3 bg-green-600 text-white rounded-full font-bold">
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative flex flex-col items-center justify-center pt-20 px-4">
          <div className="absolute top-0 -z-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-green-400/20 blur-[120px] rounded-full"></div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt="User avatar"
                  className="size-10 rounded-full border-4 border-white shadow-sm"
                />
              ))}
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex text-green-500">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-star">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-600 tracking-tight">Trusted by 10,000+ career seekers</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold max-w-4xl text-center leading-[1.1] text-slate-900">
            Land your dream job with <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AI-Powered Resumes.
            </span>
          </h1>

          <p className="max-w-2xl text-center text-lg md:text-xl text-slate-600 mt-8 mb-10 leading-relaxed">
            Nexo helps you craft, optimize, and manage professional resumes in seconds. 
            Stop fighting with formatting, start winning interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link
              to="/app"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 py-4 font-bold text-lg shadow-xl shadow-green-200 flex items-center gap-2 transition-all hover:scale-105"
            >
              Get started for free
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="lucide lucide-arrow-right">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button className="flex items-center gap-3 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition rounded-full px-10 py-4 font-bold text-slate-700">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="mt-24 w-full flex flex-col items-center">
             <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
              Leading the way for professionals at
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {logos.map((logo, index) => (
                <img key={index} src={logo} alt="Partner Logo" className="h-6 md:h-7 w-auto" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}} />
    </>
  );
};

export default Hero;