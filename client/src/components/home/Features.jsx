import React from 'react'
import { Zap, Sparkles, ShieldCheck, Download } from 'lucide-react'
import Title from './Title';

const Features = () => {
    const [isHover, setIsHover] = React.useState(false);

    return (
        <div id="features" className='flex flex-col items-center my-20 scroll-mt-12 font-poppins'>
            <div className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full px-6 py-1.5 mb-4">
                <Zap width={14} className="fill-green-700" />
                <span>Modern Experience</span>
            </div>
            
            <Title 
                title="Build your dream resume" 
                description="Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and premium templates."
            />

            <div className="flex flex-col lg:flex-row items-center justify-center mt-10 lg:mt-0 w-full max-w-7xl px-4">
                {/* Visual Image Section */}
                <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <img 
                        className="max-w-xl w-full lg:-ml-20 drop-shadow-2xl" 
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" 
                        alt="Nexo Interface Preview" 
                    />
                </div>

                {/* Features List Section */}
                <div className="w-full lg:w-1/2 space-y-4 mt-10 lg:mt-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    
                    {/* Feature 1: AI Enhancement */}
                    <div className="flex items-center justify-center lg:justify-start group cursor-pointer">
                        <div className={`p-6 w-full max-w-md group-hover:bg-violet-50 border border-transparent group-hover:border-violet-200 flex gap-4 rounded-2xl transition-all duration-300 ${!isHover ? 'border-violet-200 bg-violet-50 shadow-sm' : ''}`}>
                            <Sparkles className="size-6 shrink-0 text-violet-600" />
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-slate-800">AI-Powered Content</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Instantly enhance your summaries and job descriptions with ATS-optimized AI suggestions.</p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Data Security */}
                    <div className="flex items-center justify-center lg:justify-start group cursor-pointer">
                        <div className="p-6 w-full max-w-md group-hover:bg-green-50 border border-transparent group-hover:border-green-200 flex gap-4 rounded-2xl transition-all duration-300">
                            <ShieldCheck className="size-6 shrink-0 text-green-600" />
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-slate-800">Privacy First</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Your data is encrypted and secure. Control who sees your resume with public or private settings.</p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Fast Export */}
                    <div className="flex items-center justify-center lg:justify-start group cursor-pointer">
                        <div className="p-6 w-full max-w-md group-hover:bg-orange-50 border border-transparent group-hover:border-orange-200 flex gap-4 rounded-2xl transition-all duration-300">
                            <Download className="size-6 shrink-0 text-orange-600" />
                            <div className="space-y-1">
                                <h3 className="text-base font-bold text-slate-800">Instant PDF Export</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Export professional, print-ready PDF resumes in one click, perfectly formatted every time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Style for Poppins - Recommended to put in index.css instead */}
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                .font-poppins { font-family: 'Poppins', sans-serif; }
            `}} />
        </div>
    );
};

export default Features;