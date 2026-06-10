import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Landmark, Sparkles, Globe } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80',
    site: 'Taj Mahal',
    location: 'Agra, India',
    period: 'Mughal Dynasty'
  },
  {
    url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=80',
    site: 'The Colosseum',
    location: 'Rome, Italy',
    period: 'Roman Empire'
  },
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80',
    site: 'Golden Pavilion',
    location: 'Kyoto, Japan',
    period: 'Imperial Era'
  }
];

export default function Hero({ darkMode }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black select-none">
      {/* Background Image Carousel with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.65, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slideImages[current].url})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal via-transparent to-black/70 z-10" />
      </div>

      {/* Main Content Card positioned gracefully */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12 sm:mt-16">
        {/* Little badge item */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-heritage-gold mb-6 sm:mb-8 text-xs sm:text-sm font-mono"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>AI & INTERACTIVE HERITAGE INITIATIVE</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none mb-6"
        >
          Smart Tourism <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-heritage-gold via-orange-400 to-heritage-terracotta">
            & Heritage Technology
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-300 font-sans text-base sm:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 font-light tracking-wide lg:leading-relaxed"
        >
          "Preserving the Past, Enhancing the Future." <br className="hidden sm:inline" />
          Bridge historical wonder with digital sensory systems—artificial intelligence, immersive portals, and spatial acoustics.
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-heritage-terracotta to-heritage-clay hover:from-heritage-clay hover:to-heritage-clay text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore Heritage</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#virtual-tour"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white backdrop-blur-md font-medium transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 text-heritage-gold fill-heritage-gold" />
            <span>Virtual Tour Portal</span>
          </a>
        </motion.div>
      </div>

      {/* Floating Active Monument Display at Bottom-Right */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-3 px-4 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white font-sans text-xs">
        <Landmark className="w-5 h-5 text-heritage-gold" />
        <div className="text-left">
          <p className="font-mono text-gray-400 capitalize text-[10px] tracking-wider leading-none">CURRENT ARCHIVE</p>
          <p className="font-bold font-display text-white mt-1">{slideImages[current].site}</p>
          <p className="text-gray-300 flex items-center gap-1 mt-0.5">
            <Globe className="w-3 h-3 text-orange-400" /> {slideImages[current].location} • {slideImages[current].period}
          </p>
        </div>
      </div>
    </section>
  );
}
