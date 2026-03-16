import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

    const renderTemplate = () => {
        const props = { data, accentColor };
        switch (template) {
            case "modern":
                return <ModernTemplate {...props} />
            case 'minimal':
                return <MinimalTemplate {...props} />
            case 'minimal-image':
                return <MinimalImageTemplate {...props} />
            default:
                return <ClassicTemplate {...props} />
        }
    }

    return (
        <div className='w-full bg-slate-200/50 min-h-screen py-10 px-4 flex justify-center overflow-y-auto'>
            <div 
                id='resume-preview' 
                className={`bg-white shadow-2xl origin-top transition-all duration-500 scale-[0.6] sm:scale-[0.8] md:scale-100 ${classes}`}
                style={{ 
                    width: '210mm', 
                    minHeight: '297mm',
                    aspectRatio: '1 / 1.414'
                }}
            >
                {renderTemplate()}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    nav, button, .no-print {
                        display: none !important;
                    }
                    #resume-preview {
                        display: block !important;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 210mm;
                        height: 297mm;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        transform: scale(1) !important;
                    }
                }
            `}} />
        </div>
    )
}

export default ResumePreview