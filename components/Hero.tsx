import React from 'react';
import { useAppData } from '../context/DataContext';
import HeroCarousel from './HeroCarousel';

const Hero: React.FC = () => {
  const { data } = useAppData();

  // Use data from context, with fallbacks
  const title = data.hero.title || "Edutainment Through";
  const subtitle = data.hero.subtitle || "Divine Inspiration";
  const description = data.hero.description || "Digital Islam is a faith-based digital platform dedicated to educating, inspiring, and uplifting communities through Islamic knowledge, charity, and creative engagement. We promote social responsibility and spiritual growth.";

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left">
            <h1 className="serif text-4xl md:text-6xl text-primary leading-tight mb-6">
              {title} <br />
              <span className="text-secondary italic">{subtitle}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#donate"
                className="bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-sky-500 transition-all shadow-xl hover:shadow-sky-200/50 flex items-center gap-2"
              >
                <span>👉</span> Donate Now
              </a>
              <a
                href="#get-involved"
                className="bg-white border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-bold text-lg hover:bg-sky-50 transition-all shadow-lg flex items-center gap-2"
              >
                <span>🤲</span> Get Involved
              </a>
            </div>

            <div className="mt-12 flex items-center gap-4 justify-center lg:justify-start text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                Active in 100+ Communities
              </span>
              <span className="w-px h-4 bg-gray-300"></span>
              <span>Based in Sierra Leone</span>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl opacity-20 -z-10 translate-x-1/4"></div>
            <HeroCarousel items={data.heroCarousel} />

            {/* Decorative floaters */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-sky-100 hidden md:block animate-bounce z-20" style={{ animationDuration: '3s' }}>
              <p className="text-secondary font-bold text-sm">Feeding Families</p>
              <p className="text-xs text-gray-500">Ramadan Project 2024</p>
            </div>
            <div className="absolute -top-6 -right-6 bg-secondary text-white p-4 rounded-xl shadow-lg hidden md:block animate-bounce z-20" style={{ animationDuration: '4s' }}>
              <p className="font-bold text-sm">Empowering Youth</p>
              <p className="text-xs text-sky-100">100+ Ambassadors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
