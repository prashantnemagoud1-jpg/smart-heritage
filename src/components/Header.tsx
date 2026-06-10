import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Menu, X, Sun, Moon, MapPin, Feather } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Languages', href: '#languages' },
    { name: 'Music', href: '#music' },
    { name: 'Festivals', href: '#festivals' },
    { name: 'Map & Tech', href: '#map-and-tech' },
    { name: 'AI Assistant', href: '#ai-assistant' },
    { name: 'Resources', href: '#resources' }
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-dark-surface/90 backdrop-blur-md shadow-lg border-b border-white/5'
            : 'bg-white/90 backdrop-blur-md shadow-md border-b border-heritage-clay/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`p-2 rounded-xl ${
                darkMode ? 'bg-heritage-gold/10 text-heritage-gold' : 'bg-heritage-terracotta/10 text-heritage-terracotta'
              }`}
            >
              <Compass className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>
            <div>
              <span className="font-display font-bold text-sm sm:text-base tracking-tight block">
                Smart Heritage
              </span>
              <span className={`text-[10px] font-mono tracking-wider block ${
                darkMode ? 'text-heritage-gold' : 'text-heritage-terracotta'
              }`}>
                TECHNOLOGY & EDUCATION
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-heritage-terracotta py-2 relative group`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-heritage-terracotta transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Dark Mode Toggle */}
            <motion.button
              id="theme-toggler-btn"
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full cursor-pointer transition-colors ${
                darkMode ? 'bg-white/10 text-heritage-gold hover:bg-white/15' : 'bg-heritage-clay/5 text-heritage-clay hover:bg-heritage-clay/10'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </nav>

          {/* Mobile Navigation controls */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Dark Mode button on mobile header directly */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full cursor-pointer ${
                darkMode ? 'text-heritage-gold hover:bg-white/10' : 'text-heritage-clay hover:bg-heritage-clay/5'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${
                darkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-heritage-clay/5'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${
              darkMode ? 'bg-dark-surface border-white/5' : 'bg-heritage-cream border-heritage-clay/5'
            }`}
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    darkMode
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-700 hover:bg-heritage-clay/5 hover:text-heritage-clay'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
