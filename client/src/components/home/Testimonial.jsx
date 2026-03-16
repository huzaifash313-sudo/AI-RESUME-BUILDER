import React from 'react'
import Title from './Title'
import { BookUserIcon } from 'lucide-react'

const Testimonial = () => {
    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@briar_dev',
            text: "Nexo's AI suggestions helped me rewrite my boring summary into something that actually gets noticed!"
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@avery_it',
            text: "The resume templates are so clean. I landed 3 interviews within a week of using the Modern template."
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordan_stack',
            text: "Finally, a resume builder that doesn't mess up the formatting when I export to PDF. Highly recommended!"
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Sophia Brown',
            handle: '@sophia_codes',
            text: "The AI parsing feature is magic. It extracted everything from my old LinkedIn profile perfectly."
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-6 rounded-2xl mx-4 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 w-80 flex-shrink-0 bg-white group">
            <div className="flex gap-3 items-center">
                <img
                    className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    src={card.image}
                    alt={`${card.name} testimonial`}
                />
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-bold text-slate-800 leading-tight">{card.name}</p>
                        <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{card.handle}</span>
                </div>
            </div>
            <p className="text-[13px] leading-relaxed py-4 text-slate-600 italic">
                "{card.text}"
            </p>
        </div>
    );

    return (
        <section className="py-20 bg-slate-50/50">
            {/* Section Title */}
            <div id="testimonials" className="flex flex-col items-center mb-10 scroll-mt-24 px-4">
                <div className="flex items-center gap-2 text-sm font-bold text-green-700 bg-green-100 rounded-full px-5 py-1.5 mb-4">
                    <BookUserIcon className="w-4 h-4"/>
                    <span className="uppercase tracking-widest">Testimonials</span>
                </div>
                <Title
                    title="Success stories from users"
                    description="Join thousands of professionals who have accelerated their careers using Nexo's intelligent resume tools."
                />
            </div>

            {/* Marquee Rows */}
            <div className="flex flex-col gap-2 overflow-hidden py-10">
                {[0, 1].map((i) => (
                    <div key={i} className="marquee-row w-full flex relative group">
                        <div className={`marquee-inner flex py-2 ${i === 1 ? 'marquee-reverse' : ''} hover:[animation-play-state:paused]`}>
                            {[...cardsData, ...cardsData, ...cardsData].map((card, index) => (
                                <CreateCard key={index} card={card} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marqueeScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }

                .marquee-inner {
                    display: flex;
                    width: max-content;
                    animation: marqueeScroll 40s linear infinite;
                }

                .marquee-reverse {
                    animation-direction: reverse;
                }

                /* Fading masks for the sides */
                #testimonials-container {
                    position: relative;
                }
                .marquee-row::before, .marquee-row::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    width: 150px;
                    height: 100%;
                    z-index: 2;
                    pointer-events: none;
                }
                .marquee-row::before {
                    left: 0;
                    background: linear-gradient(to right, rgb(248 250 252), transparent);
                }
                .marquee-row::after {
                    right: 0;
                    background: linear-gradient(to left, rgb(248 250 252), transparent);
                }
            `}} />
        </section>
    )
}

export default Testimonial;