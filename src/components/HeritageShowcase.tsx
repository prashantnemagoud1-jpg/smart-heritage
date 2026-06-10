import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Landmark, Sparkles, Compass, CheckCircle } from 'lucide-react';
import { heritageSites } from '../data/heritageData';
import { HeritageSite } from '../types';

interface Props {
  darkMode: boolean;
}

export default function HeritageShowcase({ darkMode }: Props) {
  const [activeSiteId, setActiveSiteId] = useState<string>(heritageSites[0].id);
  const [filterRegion, setFilterRegion] = useState<string>('all');

  const selectedSite = heritageSites.find((s) => s.id === activeSiteId) || heritageSites[0];

  const regions = [
    { value: 'all', label: 'All Sights' },
    { value: 'India', label: 'India' },
    { value: 'Italy', label: 'Europe' },
    { value: 'Peru', label: 'Americas' },
    { value: 'Egypt', label: 'Middle East' },
    { value: 'Japan', label: 'Asia-Pacific' }
  ];

  const filteredSites = heritageSites.filter(
    (site) => filterRegion === 'all' || site.country === filterRegion
  );

  const [activeTab, setActiveTab] = useState<'history' | 'architecture' | 'culture'>('history');

  return (
    <section id="showcase" className={`py-20 sm:py-28 border-t transition-colors duration-300 ${
      darkMode ? 'bg-dark-surface border-white/5 text-gray-100' : 'bg-white border-heritage-clay/10 text-gray-900'
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
            GLOBAL TREASURY
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Centuries of Wonder, <span className="text-heritage-terracotta">Preserved in Pixels</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Click any monument below to activate its architectural scanner and delve into classical histories, coordinate references, and visitor tip cards.
          </p>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {regions.map((reg) => (
            <button
              key={reg.value}
              onClick={() => {
                setFilterRegion(reg.value);
                // Reset active site to the first available in the filtered list
                const available = heritageSites.find((s) => reg.value === 'all' || s.country === reg.value);
                if (available) setActiveSiteId(available.id);
              }}
              className={`px-4 py-2 cursor-pointer rounded-xl text-xs sm:text-sm font-medium transition-all ${
                filterRegion === reg.value
                  ? darkMode
                    ? 'bg-heritage-gold text-dark-charcoal font-bold shadow-md'
                    : 'bg-heritage-terracotta text-white font-bold shadow-md'
                  : darkMode
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                    : 'bg-heritage-clay/5 text-gray-700 hover:bg-heritage-clay/10'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Dynamic Bento Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Sites Grid Selection Rail (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-3 max-h-[300px] lg:max-h-[600px] overflow-y-auto pr-2">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pl-1 mb-2">Select Monument ({filteredSites.length})</h3>
            {filteredSites.map((site) => {
              const isActive = site.id === activeSiteId;
              return (
                <motion.button
                  key={site.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSiteId(site.id)}
                  className={`p-3.5 rounded-xl cursor-pointer border text-left transition-all flex items-center gap-4 shrink-0 ${
                    isActive
                      ? darkMode
                        ? 'bg-gradient-to-r from-heritage-gold/20 to-transparent border-heritage-gold'
                        : 'bg-gradient-to-r from-heritage-terracotta/10 to-transparent border-heritage-terracotta'
                      : darkMode
                        ? 'bg-white/5 border-white/5 hover:border-white/10'
                        : 'bg-heritage-clay/5 border-transparent hover:border-heritage-clay/10'
                  }`}
                >
                  <img
                    src={site.imageUrl}
                    alt={site.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="font-display font-semibold text-sm truncate">{site.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1 font-sans">
                      <MapPin className="w-3 h-3 text-heritage-terracotta" />
                      {site.region}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active Site Detailed Spotlight (Right) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSite.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bento-grid-item overflow-hidden flex flex-col justify-between h-full"
              >
                {/* Hero Image Section within Spotlight */}
                <div className="relative h-60 sm:h-72 w-full bg-black">
                  <img
                    src={selectedSite.imageUrl}
                    alt={selectedSite.name}
                    className="w-full h-full object-cover opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/90 via-transparent to-transparent" />
                  
                  {/* Badge details */}
                  <div className="absolute top-4 left-4 p-2 bg-black/55 rounded-lg border border-white/10 text-white font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-heritage-gold" />
                    <span>{selectedSite.epoch}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 sm:left-6">
                    <p className="font-mono text-xs text-heritage-gold uppercase tracking-widest">{selectedSite.country}</p>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1 flex items-center gap-2">
                      {selectedSite.name}
                      <span className="text-sm font-normal text-gray-300 font-sans tracking-normal opacity-85">({selectedSite.nativeName})</span>
                    </h3>
                  </div>
                </div>

                {/* Spotlights Tab details */}
                <div className="p-6 sm:p-8 flex-1">
                  {/* Tab bar switch */}
                  <div className="flex border-b border-gray-200 dark:border-white/5 mb-6">
                    {(['history', 'architecture', 'culture'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 px-4 text-xs sm:text-sm font-medium tracking-wide capitalize relative cursor-pointer ${
                          activeTab === tab
                            ? darkMode
                              ? 'text-heritage-gold font-semibold'
                              : 'text-heritage-terracotta font-semibold'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div
                            layoutId="accent-line"
                            className={`absolute bottom-0 left-0 w-full h-0.5 ${
                              darkMode ? 'bg-heritage-gold' : 'bg-heritage-terracotta'
                            }`}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="min-h-36">
                    {activeTab === 'history' && (
                      <div className="space-y-3">
                        <h4 className="font-display font-semibold text-base text-heritage-terracotta flex items-center gap-1.5">
                          <Landmark className="w-4 h-4" />
                          Historical Background
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                          {selectedSite.historicalBackground}
                        </p>
                      </div>
                    )}
                    {activeTab === 'architecture' && (
                      <div className="space-y-3">
                        <h4 className="font-display font-semibold text-base text-heritage-terracotta flex items-center gap-1.5">
                          <Compass className="w-4 h-4" />
                          Architectural Design & Engineering
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                          {selectedSite.architecturalSignificance}
                        </p>
                      </div>
                    )}
                    {activeTab === 'culture' && (
                      <div className="space-y-3">
                        <h4 className="font-display font-semibold text-base text-heritage-terracotta flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          Cultural Legacy & Stewardship
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                          {selectedSite.culturalImportance}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Visitor Highlights Bullet List */}
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
                    <h5 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">RECOMMENDED VISITOR HIGHLIGHTS</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedSite.visitorHighlights.map((hl, i) => (
                        <div key={i} className="flex gap-2.5 items-start">
                          <CheckCircle className="w-4 h-4 text-heritage-terracotta shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600 dark:text-gray-300 font-sans leading-snug">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spatial Coordinate footer */}
                <div className={`px-6 py-4 border-t flex items-center justify-between text-xs font-mono ${
                  darkMode ? 'bg-black/20 border-white/5 text-gray-400' : 'bg-heritage-clay/5 border-heritage-clay/10 text-gray-600'
                }`}>
                  <span className="truncate">REGION: {selectedSite.region}</span>
                  <span className="text-heritage-terracotta text-right">COORD: {selectedSite.coordinates.lat.toFixed(4)}°N, {selectedSite.coordinates.lng.toFixed(4)}°E</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
