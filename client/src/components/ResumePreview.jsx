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
        <div className='w-full bg-slate-200/50 min-h-screen py-10 px-4 flex justify-center overflow-y-auto print:p-0 print:bg-white print:min-h-0 print:block'>
            <div 
                id='resume-preview' 
                className={`bg-white shadow-2xl origin-top transition-all duration-500 scale-[0.6] sm:scale-[0.8] md:scale-100 ${classes} print:transform-none print:scale-100`}
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
                        margin: 0 !important;
                        padding: 0 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* Parent wrapper fix */
                    div.w-full.bg-slate-200\\/50 {
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                        min-height: 0 !important;
                        display: block !important;
                        overflow: visible !important;
                    }
                    nav, button, .no-print, .print\\:hidden {
                        display: none !important;
                    }
                    #resume-preview {
                        display: block !important;
                        position: relative !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        margin: 0 auto !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        transform: none !important;
                        border: none !important;
                        page-break-after: avoid;
                        page-break-before: avoid;
                    }
                    /* Ensure no extra page is created */
                    html, body {
                        height: 297mm;
                        overflow: hidden;
                    }
                }
            `}} />
        </div>
    )
}

export default ResumePreview