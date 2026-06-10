import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Shirt, Utensils, Award, Sparkles, MapPin, BookOpen, Quote } from 'lucide-react';
import { festivalsList } from '../data/heritageData';
import { FestivalTradition } from '../types';

interface Props {
  darkMode: boolean;
}

export default function FestivalsShowcase({ darkMode }: Props) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeFest = festivalsList[selectedIdx];

  return (
    <section id="festivals" className={`py-20 sm:py-28 transition-colors duration-300 ${
      darkMode ? 'bg-dark-charcoal text-gray-100' : 'bg-heritage-cream text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 ${
              darkMode ? 'bg-heritage-gold/10 text-heritage-gold' : 'bg-heritage-terracotta/10 text-heritage-terracotta'
            }`}
          >
            FESTIVITIES & FOLKLORE
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Living Rituals & <span className="text-heritage-terracotta">Seasonal Celebrations</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            In ancestral cultures, memory is preserved dynamically through public theater, customized textiles, and seasonal culinary feasts. Browse our interactive ritual diary.
          </p>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-white/5 justify-center gap-6 sm:gap-12 mb-12">
          {festivalsList.map((fest, idx) => (
            <button
              key={fest.id}
              onClick={() => setSelectedIdx(idx)}
              className={`pb-4 px-2 sm:px-4 text-sm sm:text-base cursor-pointer font-display font-medium relative tracking-wide transition-all ${
                selectedIdx === idx
                  ? darkMode
                    ? 'text-heritage-gold font-bold'
                    : 'text-heritage-terracotta font-bold'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
            >
              {fest.name.split('(')[0].trim()}
              {selectedIdx === idx && (
                <motion.div
                  layoutId="fest-underline"
                  className={`absolute bottom-0 left-0 w-full h-0.5 ${
                    darkMode ? 'bg-heritage-gold' : 'bg-heritage-terracotta'
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Split Details & Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Side (Left column) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFest.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 sm:space-y-8"
              >
                <div>
                  <span className="text-xs font-mono text-heritage-terracotta tracking-widest uppercase flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeFest.region}
                  </span>
                  <h3 className="font-display font-bold text-2.5xl sm:text-4xl text-gray-900 dark:text-white mt-2">
                    {activeFest.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-sans mt-3">
                    {activeFest.description}
                  </p>
                </div>

                {/* Grid of Cultural Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Traditional Clothing */}
                  <div className="p-5 bento-grid-item">
                    <div className="flex items-center gap-2 mb-3 text-heritage-gold">
                      <Shirt className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Traditional Clothing</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6B5E55] dark:text-gray-300 font-sans leading-relaxed">
                      {activeFest.clothing}
                    </p>
                  </div>

                  {/* Traditional Food and Sweets */}
                  <div className="p-5 bento-grid-item">
                    <div className="flex items-center gap-2 mb-3 text-heritage-gold">
                      <Utensils className="w-4 h-4" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Regional Culinary Arts</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#6B5E55] dark:text-gray-300 font-sans leading-relaxed">
                      {activeFest.food}
                    </p>
                  </div>
                </div>

                {/* Local Customs Detail cards */}
                <div className="p-6 bento-grid-item">
                  <div className="flex items-center gap-2 mb-3 text-orange-500">
                    <Award className="w-4.5 h-4.5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Sacred Custom: {activeFest.customsName}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                    {activeFest.customsDesc}
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Photo Gallery Aspect (Right column) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFest.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-square bg-dark-charcoal max-h-[450px]"
              >
                <img
                  src={activeFest.imageUrl}
                  alt={activeFest.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Overlay Details */}
                <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-black/55 backdrop-blur-md border border-white/10 text-white">
                  <div className="flex items-center gap-2 mb-2 text-heritage-gold">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">STEVEN INTACT CHRONICLE</span>
                  </div>

                  <h4 className="font-display font-semibold text-sm sm:text-base mb-2">Preservation Highlight</h4>
                  <ul className="space-y-1.5 list-none pl-0">
                    {activeFest.highlights.map((h, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-gray-300 font-sans">
                        <span className="text-heritage-gold text-sm leading-none">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
