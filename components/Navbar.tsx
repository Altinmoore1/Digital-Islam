import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  // Update active section based on scroll (only on home page)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(''); // No active hero/section marking on subpages like /gallery (unless we map them)
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'sectors', 'gallery', 'get-involved', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Special case for Gallery Page Link
    if (target === 'gallery-page') {
      navigate('/gallery');
      return;
    }

    // If we want to go to a section
    if (location.pathname === '/') {
      // Smooth scroll if on home
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Optional: Update hash without jump
        // window.history.pushState(null, '', `#${target}`);
      }
    } else {
      // Navigate to home then scroll
      // We can pass state or just let the hash handle it, but hash logic needs to exist on Home load
      // Simple approach: standard anchor navigation works if we use full URL
      navigate(`/#${target}`);
      // Force scroll after navigation since React Router doesn't always handle hash scroll on transition effectively without extra logic
      // But let's try standard hash nav first.
      // Actually, cleaner to navigate to '/' and then scroll.
      // For now, let's use the standard href behavior but intercepted.
      // Revert: simpler to just use fully qualified links? Non-SPA feel though.

      // Let's manually navigate and try to scroll after tick
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Sectors', id: 'sectors' },
    { name: 'Gallery', id: 'gallery-page', isPage: true }, // Changed ID to distinguish from section if needed
    { name: 'Get Involved', id: 'get-involved' },
    { name: 'Contact', id: 'contact' },
  ];

  // Helper to determine if link is active
  const isLinkActive = (item: typeof navLinks[0]) => {
    if (item.isPage) {
      return location.pathname === '/gallery';
    }
    return location.pathname === '/' && activeSection === item.id;
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Digital Islam Logo" className="h-12 w-auto" />
            <div className="flex flex-col">
              <span className="text-primary font-bold text-lg tracking-tight leading-none">Digital Islam</span>
              <span className="text-xs text-secondary font-medium tracking-wide uppercase">Sierra Leone</span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.isPage ? '/gallery' : `/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`font-medium transition-colors text-sm lg:text-base cursor-pointer ${isLinkActive(link)
                  ? 'text-secondary font-bold'
                  : 'text-gray-600 hover:text-secondary'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#donate"
              // Just a simple anchor for now, logic likely in Get Involved
              onClick={(e) => handleNavClick(e, 'donate')}
              className="bg-secondary text-white px-5 py-2 rounded-full font-semibold hover:bg-sky-500 transition-all shadow-md active:scale-95 text-sm lg:text-base cursor-pointer"
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
                href={link.isPage ? '/gallery' : `/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`block px-3 py-2 font-medium rounded-md ${isLinkActive(link)
                  ? 'bg-sky-50 text-secondary'
                  : 'text-gray-700 hover:bg-sky-50 hover:text-secondary'
                  }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#donate"
              onClick={(e) => handleNavClick(e, 'donate')}
              className="block px-3 py-3 mt-4 text-center bg-secondary text-white font-bold rounded-lg cursor-pointer"
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
