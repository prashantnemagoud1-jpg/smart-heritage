import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutAndProblem from './components/AboutAndProblem';
import HeritageShowcase from './components/HeritageShowcase';
import LanguageExplorer from './components/LanguageExplorer';
import TraditionalMusic from './components/TraditionalMusic';
import FestivalsShowcase from './components/FestivalsShowcase';
import InteractiveMap from './components/InteractiveMap';
import SmartTech from './components/SmartTech';
import AIPresenter from './components/AIPresenter';
import EducationalResources from './components/EducationalResources';
import ContactAndImpact from './components/ContactAndImpact';
import { Sparkles, Heart, Landmark, ShieldCheck } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 w-full overflow-x-hidden ${
      darkMode ? 'bg-dark-charcoal text-gray-100 antialiased' : 'bg-heritage-cream text-gray-900'
    }`}>
      
      {/* 1. Transparent Floating Navigation Header bar (Section 5) */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 2. Captivating Fullscreen Hero Carousel (Section 1) */}
      <Hero darkMode={darkMode} />

      {/* 3. Concept Overview, Problem, and Strategic Solution Cards (Section 2, 3, 4) */}
      <AboutAndProblem darkMode={darkMode} />

      {/* 4. bento grid Architectural Monument Showcases (Section 6) */}
      <HeritageShowcase darkMode={darkMode} />

      {/* 5. Classical Dialect Pronunciation Explorer with browser TTS (Section 13) */}
      <LanguageExplorer darkMode={darkMode} />

      {/* 6. Web Audio API Procedural Ancient Folk Synthesizer Deck (Section 7) */}
      <TraditionalMusic darkMode={darkMode} />

      {/* 7. Living Ritual Diaries and Cuisine Custom Highlights (Section 8) */}
      <FestivalsShowcase darkMode={darkMode} />

      {/* 8. SVG Geographic Coordinate and Ancient route Path Calculator (Section 10) */}
      <InteractiveMap darkMode={darkMode} />

      {/* 9. Smart Tech Overlays and AR Scanning / VR 360° Panning Simulators (Section 9 & 11) */}
      <SmartTech darkMode={darkMode} />

      {/* 10. Server-Linked live Gemini Curatings Chatbot and Itinerary Planner (Section 12) */}
      <AIPresenter darkMode={darkMode} />

      {/* 11. Preservation Reading articles and Trivia assessment Quiz (Section 13) */}
      <EducationalResources darkMode={darkMode} />

      {/* 12. measurable statistics and Connect feedback Form portals (Section 14 & 15) */}
      <ContactAndImpact darkMode={darkMode} />

      {/* 13. Deeply polished cultural footer */}
      <footer className={`py-12 border-t text-center transition-colors duration-300 ${
        darkMode ? 'bg-dark-surface border-white/5 text-gray-400' : 'bg-heritage-cream border-heritage-clay/10 text-gray-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-center gap-2 text-heritage-terracotta">
            <Landmark className="w-6 h-6" />
            <span className="font-display font-semibold tracking-wider uppercase text-xs">SMART HERITAGE & TOURISM PORTAL</span>
          </div>

          <p className="text-xs sm:text-sm font-sans tracking-wide max-w-xl mx-auto">
            Supporting dynamic global tourism with cutting-edge preservation tools, unified AI, and interactive coordinate maps. Preserving our past to inspire our future.
          </p>

          <div className="flex justify-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded bg-heritage-terracotta/10 text-heritage-terracotta text-[10px] font-mono font-medium uppercase">
              Vite 6 React Framework
            </span>
            <span className="px-2.5 py-0.5 rounded bg-heritage-gold/10 text-heritage-gold text-[10px] font-mono font-medium uppercase">
              Procedural Web Audio Synthesizer
            </span>
            <span className="px-2.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-mono font-medium uppercase">
              Gemini Tourist Chatbot
            </span>
          </div>

          {/* Copyright signature lines */}
          <div className="pt-6 border-t border-gray-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono">
            <span>© 2026 Smart Tourism and Heritage Technology. All rights reserved.</span>
            <span className="flex items-center gap-1 mt-3 sm:mt-0">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> & <Sparkles className="w-3.5 h-3.5 text-heritage-gold animate-pulse" /> for Cultural Stewardship
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
