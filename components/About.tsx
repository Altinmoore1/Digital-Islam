
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider">
              Our Mission
            </div>
            <h2 className="serif text-4xl md:text-5xl text-green-900">Educate, Inspire, and Empower</h2>
            <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-green-700 pl-6">
              "Digital Islam exists to contribute meaningfully to community, national, and international development by promoting compassion, knowledge, and unity in line with Islamic values."
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We focus on authentic Islamic teachings, humanitarian support, and ethical digital engagement. Our work bridges tradition and technology, making Islamic knowledge accessible and relevant in today’s world.
            </p>
          </div>

          <div className="lg:w-1/2 bg-green-50 rounded-3xl p-8 md:p-12 shadow-inner border border-green-100">
            <h3 className="serif text-2xl text-green-800 mb-6">Who We Are</h3>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Digital Islam is a growing Islamic institution established to serve society through charity, education, entertainment, and youth leadership.
              </p>
              <p>
                Over the years, we have impacted thousands of lives across Sierra Leone through feeding programs, Islamic education, media outreach, and community-based initiatives.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div>
                  <div className="text-3xl font-bold text-green-700">20000+</div>
                  <div className="text-sm text-gray-500 font-medium">Lives Impacted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-700">200</div>
                  <div className="text-sm text-gray-500 font-medium">Communities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
