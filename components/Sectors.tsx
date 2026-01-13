
import React from 'react';
import { SECTORS } from '../constants';

const Sectors: React.FC = () => {
  return (
    <section id="sectors" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="serif text-4xl md:text-5xl text-green-900 mb-4">Our Core Sectors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Through these four pillars, we strive to create a holistic ecosystem of faith, service, and knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SECTORS.map((sector) => (
            <div 
              key={sector.id} 
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-green-50 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-green-700 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  {sector.icon}
                </div>
                <div className="flex-1">
                  <h3 className="serif text-2xl text-green-900 mb-3">{sector.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {sector.description}
                  </p>
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-green-700 flex items-center gap-2">
                      <span className="w-4 h-px bg-green-700"></span>
                      Key Initiatives
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                      {sector.programs.map((program, idx) => (
                        <li key={idx} className="text-gray-600 flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
