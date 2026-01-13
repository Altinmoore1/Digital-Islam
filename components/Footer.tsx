
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                DI
              </div>
              <span className="text-green-900 font-bold text-xl uppercase tracking-tighter">Digital Islam</span>
            </div>
            <p className="text-gray-600 max-w-sm mb-6 leading-relaxed">
              Educating, inspiring, and uplifting communities through Islamic knowledge, charity, and creative engagement.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-green-900 font-bold uppercase text-xs tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Our Sectors', href: '#sectors' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Get Involved', href: '#get-involved' },
                { name: 'Contact Us', href: '#contact' }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 hover:text-green-700 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-green-900 font-bold uppercase text-xs tracking-widest mb-6">Support Us</h4>
            <ul className="space-y-4">
              <li><a href="#donate" className="text-gray-600 hover:text-green-700 transition-colors">Donate Now</a></li>
              <li><a href="#get-involved" className="text-gray-600 hover:text-green-700 transition-colors">Volunteer</a></li>
              <li><a href="#sectors" className="text-gray-600 hover:text-green-700 transition-colors">Our Projects</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Digital Islam Sierra Leone. All Rights Reserved.
            <br className="md:hidden" />
            <span className="hidden md:inline mx-2">|</span>
            Built for Divine Inspiration.
            <span className="hidden md:inline mx-2">|</span>
            <a href="/admin" className="text-gray-400 hover:text-green-700 transition-colors text-xs">Admin Access</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
