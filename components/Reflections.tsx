
import React, { useState, useEffect } from 'react';
import { getInspiration } from '../services/geminiService';

const Reflections: React.FC = () => {
  const [reflection, setReflection] = useState<string>('Loading divine inspiration...');
  const [isLoading, setIsLoading] = useState(true);

  const fetchReflection = async () => {
    setIsLoading(true);
    const data = await getInspiration();
    setReflection(data || "To Allah we belong, and to Him is our return.");
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReflection();
  }, []);

  return (
    <section className="bg-green-900 py-16 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="pattern-hex" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M25 0 L50 15 L50 35 L25 50 L0 35 L0 15 Z" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)" />
        </svg>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="mb-6 inline-block p-3 bg-green-800 rounded-full">
          <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.243a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM16.464 16.464a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" />
          </svg>
        </div>
        <h2 className="serif text-3xl md:text-4xl mb-8">Daily Spiritual Reflection</h2>
        <div className={`transition-all duration-500 ${isLoading ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
           <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-10 whitespace-pre-wrap">
            "{reflection}"
          </p>
        </div>
        <button 
          onClick={fetchReflection}
          disabled={isLoading}
          className="px-6 py-2 bg-green-700 hover:bg-green-600 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Get Another Reflection'}
        </button>
      </div>
    </section>
  );
};

export default Reflections;
