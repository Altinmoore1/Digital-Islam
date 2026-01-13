
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Sectors', href: '#sectors' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Get Involved', href: '#get-involved' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Digital Islam Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-primary font-bold text-lg tracking-tight leading-none">Digital Islam</span>
              <span className="text-xs text-secondary font-medium tracking-wide uppercase">Sierra Leone</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-secondary font-medium transition-colors text-sm lg:text-base"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#donate"
              className="bg-secondary text-white px-5 py-2 rounded-full font-semibold hover:bg-sky-500 transition-all shadow-md active:scale-95 text-sm lg:text-base"
            >
              Donate Now
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-secondary p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 animate-in slide-in-from-top duration-300">
          <div className="px-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-700 font-medium hover:bg-sky-50 hover:text-secondary rounded-md"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 mt-4 text-center bg-secondary text-white font-bold rounded-lg"
            >
              Donate Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
