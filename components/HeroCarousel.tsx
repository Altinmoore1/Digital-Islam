import React, { useState, useEffect } from 'react';
import { CarouselItem } from '../types';

interface HeroCarouselProps {
    items: CarouselItem[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-advance if there are multiple items
    useEffect(() => {
        if (items.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [items.length]);

    if (!items || items.length === 0) {
        return (
            <div className="w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
                <p>No carousel items available.</p>
            </div>
        );
    }

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % items.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white group">
            {/* Slides */}
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {item.mediaType === 'video' ? (
                        <video
                            src={item.mediaUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={item.mediaUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white transform transition-transform duration-500 translate-y-0">
                        <h3 className="text-2xl font-bold mb-2 animate-fade-in-up">{item.title}</h3>
                        <p className="text-sm font-medium opacity-90 line-clamp-2 md:line-clamp-none animate-fade-in-up delay-100">
                            {item.detail}
                        </p>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            {items.length > 1 && (
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-secondary w-8' : 'bg-white/50 hover:bg-white'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Arrow Controls (Visible on Hover) */}
            {items.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default HeroCarousel;
