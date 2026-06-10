import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, MapPin, Compass, ArrowRight, GitFork, Navigation, Sparkles, ShieldAlert } from 'lucide-react';
import { heritageSites } from '../data/heritageData';
import { HeritageSite } from '../types';

interface Props {
  darkMode: boolean;
}

export default function InteractiveMap({ darkMode }: Props) {
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(heritageSites[0]);
  const [routeStartId, setRouteStartId] = useState<string>(heritageSites[1].id); // default Hampi
  const [routeEndId, setRouteEndId] = useState<string>(heritageSites[0].id); // default Taj Mahal
  const [calculatedRoute, setCalculatedRoute] = useState<any | null>(null);

  const startSite = heritageSites.find((s) => s.id === routeStartId);
  const endSite = heritageSites.find((s) => s.id === routeEndId);

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startSite || !endSite) return;

    if (startSite.id === endSite.id) {
      setCalculatedRoute({
        error: 'Please choose two distinct heritage sights.'
      });
      return;
    }

    // Dynamic travel calculation matching high-quality mock data and real coordinates math
    const lat1 = startSite.coordinates.lat;
    const lng1 = startSite.coordinates.lng;
    const lat2 = endSite.coordinates.lat;
    const lng2 = endSite.coordinates.lng;

    // Haversine distance core formula
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = Math.round(R * c);

    // Formulate a beautiful, personalized route story
    let trailChannel = 'Modern Flight & Air Corridor';
    let historicContext = 'Connected by standard maritime commerce routes.';
    let steps: string[] = [];

    const startLower = startSite.id;
    const endLower = endSite.id;

    if (
      (startLower.includes('taj') && endLower.includes('hampi')) ||
      (startLower.includes('hampi') && endLower.includes('taj'))
    ) {
      trailChannel = 'Grand Trunk / Dakshina Path Route';
      historicContext = 'Historically aligned with the vast royal pathways linking Southern capitals to Agra, populated by massive dharamshalas and ancient stepwells built by Emperor Sher Shah Suri.';
      steps = [
        `Depart along the Central Deccan Plateau corridor`,
        `Pass ancient fortresses such as Daulatabad & Gwalior`,
        `Arrive at the Indo-Gangetic basin terminus`
      ];
    } else if (
      startLower.includes('taj') || startLower.includes('hampi') ||
      endLower.includes('taj') || endLower.includes('hampi')
    ) {
      trailChannel = 'Ancient Spice Route / Silk connection';
      historicContext = 'This routing connects the sub-continent ports (such as Calicut or Surat) directly with global caravan networks via the Arabian Sea and Persian Gulf channels.';
      steps = [
        `Transport goods from inland hubs to ancient tidal ports`,
        `Sea-transit crossing the Arabian Gulf`,
        `Desert caravan paths joining global capital terminals`
      ];
    } else {
      trailChannel = 'Maritime Transcontinental Network';
      historicContext = 'Connects two distinct hemispheres. Historically tracked by ancient Roman trading ships, Phoenician navigators, or classical Incan mountain messengers (Chasquis).';
      steps = [
        `Transnational air/sea navigation vectors`,
        `Regional coordinates matching classical coordinates`,
        `Climbing native trails and mountain ranges to the spot`
      ];
    }

    setCalculatedRoute({
      distance: distanceKm,
      trail: trailChannel,
      history: historicContext,
      steps: steps,
      error: null
    });
  };

  return (
    <section id="map-and-tech" className={`py-20 sm:py-28 border-t transition-colors duration-300 ${
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
            CARTOGRAPHY & NAVIGATION
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Interactive Coordinates & <span className="text-heritage-terracotta">Route Planner</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Plot cultural routes, calculate geographical gaps between ancient civilisations, and discover historical transit roads on our vector cartographic terminal.
          </p>
        </div>

        {/* Vector Map + Details Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Custom SVG Vector Map (Left Column - Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className={`p-6 rounded-3xl border flex-1 flex flex-col justify-between relative overflow-hidden ${
              darkMode ? 'bg-black/40 border-white/5' : 'bg-heritage-cream/40 border-heritage-clay/10'
            }`}>
              
              <div className="flex items-center justify-between z-10 mb-4">
                <div className="flex items-center gap-2">
                  <Compass className={`w-5 h-5 text-heritage-terracotta ${calculatedRoute ? 'animate-spin' : ''}`} />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">Spatial Coordinate Terminal</span>
                </div>
                {selectedSite && (
                  <span className="text-[10px] font-mono text-heritage-terracotta truncate">
                    Focused: {selectedSite.name} ({selectedSite.coordinates.lat.toFixed(2)}°N, {selectedSite.coordinates.lng.toFixed(2)}°E)
                  </span>
                )}
              </div>

              {/* Vector Graphic Core */}
              <div className="aspect-[16/10] w-full bg-slate-900/10 dark:bg-black/30 rounded-2xl border border-dashed border-gray-300 dark:border-white/5 relative flex items-center justify-center p-2 mb-6">
                
                {/* SVG background grid system simulating high tech coordinate map */}
                <svg className="absolute inset-0 w-full h-full text-slate-300 dark:text-white/[0.03]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Stylized custom world continents drawn minimalist as circles and connecting lines */}
                  {/* Americas */}
                  <path d="M 20 20 Q 35 45 30 75 Q 15 80 20 90 M 15 25 Q 30 40 25 55" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-15" />
                  {/* Afro-EurAsia-India */}
                  <path d="M 45 40 Q 55 25 68 35 Q 75 42 85 45 M 50 60 Q 60 45 66 54 Q 72 65 67 78 M 80 50 Q 82 58 78 65 Q 85 80 90 75" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-15" />
                  
                  {/* Route trajectory drawing */}
                  {calculatedRoute && startSite && endSite && (
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      d={`M ${(startSite.coordinates.x / 100) * 100}% ${(startSite.coordinates.y / 100) * 100}% Q ${((startSite.coordinates.x + endSite.coordinates.x) / 2 / 100) * 100}% ${((startSite.coordinates.y + endSite.coordinates.y - 15) / 100) * 100}% ${(endSite.coordinates.x / 100) * 100}% ${(endSite.coordinates.y / 100) * 100}%`}
                      fill="none"
                      stroke="#C05A3E"
                      strokeWidth="3"
                      strokeDasharray="6,4"
                      className="glow-terracotta"
                    />
                  )}
                </svg>

                {/* Glowing Coordinates coordinate points */}
                {heritageSites.map((site) => {
                  const isCurSelected = selectedSite?.id === site.id;
                  const isRouteTerminus = site.id === routeStartId || site.id === routeEndId;
                  
                  return (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSite(site)}
                      className="absolute group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                      style={{
                        left: `${site.coordinates.x}%`,
                        top: `${site.coordinates.y}%`
                      }}
                    >
                      <span className="relative flex h-5 w-5">
                        {/* High-visibility glowing ripple triggers */}
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isCurSelected 
                            ? 'bg-heritage-gold' 
                            : isRouteTerminus 
                              ? 'bg-heritage-terracotta' 
                              : 'bg-teal-500'
                        }`} />
                        <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white justify-center items-center shadow ${
                          isCurSelected 
                            ? 'bg-heritage-gold' 
                            : isRouteTerminus 
                              ? 'bg-heritage-terracotta' 
                              : 'bg-teal-600'
                        }`}>
                          <MapPin className="w-2.5 h-2.5 text-white" />
                        </span>
                      </span>

                      {/* Floating hover name tag */}
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-left px-2.5 py-1 rounded-lg bg-black/80 text-white font-mono text-[9px] font-medium uppercase tracking-widest whitespace-nowrap shadow-md z-30">
                        {site.name} ({site.country})
                      </span>
                    </button>
                  );
                })}

                {/* Legend indicator */}
                <div className="absolute bottom-3 left-4 p-2 bg-black/45 rounded border border-white/5 backdrop-blur text-[8px] font-mono text-gray-300 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-heritage-gold inline-block" />
                    <span>FOCUSED SITE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-heritage-terracotta inline-block" />
                    <span>ROUTE PIN</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-600 inline-block" />
                    <span>CULTURAL SPOT</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 text-center font-mono text-[9px] text-gray-400">
                  <span>SCALE: VECTOR MERCATOR REF</span>
                </div>
              </div>

              {/* Focused Spot Quick overview card */}
              <AnimatePresence mode="wait">
                {selectedSite && (
                  <motion.div
                    key={selectedSite.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-heritage-clay/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedSite.imageUrl}
                        alt={selectedSite.name}
                        className="w-14 h-14 object-cover rounded-lg shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-terracotta font-semibold">
                          {selectedSite.country} • {selectedSite.epoch}
                        </span>
                        <h4 className="font-display font-bold text-base mt-0.5">{selectedSite.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-sans line-clamp-1">{selectedSite.historicalBackground}</p>
                      </div>
                    </div>
                    <a
                      href="#showcase"
                      className="px-3.5 py-2 text-xs rounded bg-heritage-terracotta/10 text-heritage-terracotta font-mono font-medium shrink-0 hover:bg-heritage-terracotta hover:text-white transition-colors"
                    >
                      READ DOSSIER
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Route Planning Controls side (Right Column - Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className={`p-6 sm:p-8 rounded-3xl border h-full flex flex-col justify-between ${
              darkMode ? 'bg-dark-surface/50 border-white/5' : 'bg-heritage-cream/40 border-heritage-clay/10'
            }`}>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl mb-1 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-heritage-terracotta" />
                    Cultural Transit Planner
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                    Select two world monuments to trace their ancient trade highways, calculated geographic distance, and historical connections.
                  </p>
                </div>

                {/* Form controls */}
                <form onSubmit={handleCalculateRoute} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">STARTING COORDINATE</label>
                    <select
                      value={routeStartId}
                      onChange={(e) => setRouteStartId(e.target.value)}
                      className={`w-full p-3 rounded-xl text-sm font-sans border focus:ring-1 focus:ring-heritage-terracotta outline-none ${
                        darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                      }`}
                    >
                      {heritageSites.map((s) => (
                        <option key={s.id} value={s.id}>{s.name} ({s.country})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">DESTINATION CONTAINER</label>
                    <select
                      value={routeEndId}
                      onChange={(e) => setRouteEndId(e.target.value)}
                      className={`w-full p-3 rounded-xl text-sm font-sans border focus:ring-1 focus:ring-heritage-terracotta outline-none ${
                        darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                      }`}
                    >
                      {heritageSites.map((s) => (
                        <option key={s.id} value={s.id}>{s.name} ({s.country})</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 cursor-pointer rounded-xl font-mono text-xs font-bold tracking-widest text-center uppercase shadow-md transition-all ${
                      darkMode
                        ? 'bg-heritage-gold hover:bg-amber-400 text-dark-charcoal'
                        : 'bg-heritage-terracotta hover:bg-heritage-clay text-white'
                    }`}
                  >
                    CALCULATE HERITAGE PATHWAY
                  </button>
                </form>
              </div>

              {/* Calculated Outputs panel */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
                <AnimatePresence mode="wait">
                  {calculatedRoute ? (
                    calculatedRoute.error ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3.5 rounded-lg bg-red-500/15 text-red-500 text-xs flex items-start gap-2 font-sans"
                      >
                        <ShieldAlert className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                        <span>{calculatedRoute.error}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-gray-400">GEODESIC GAP:</span>
                          <span className="text-heritage-terracotta font-bold text-sm bg-heritage-terracotta/10 px-2.5 py-1 rounded">
                            {calculatedRoute.distance} Kilometres
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">CULTURAL TRANSIT ROUTE:</span>
                          <span className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
                            {calculatedRoute.trail}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">HISTORIC OVERVIEW:</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                            {calculatedRoute.history}
                          </p>
                        </div>

                        {/* Step outlines */}
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2">TRANSIT VECTORS:</span>
                          <div className="space-y-2">
                            {calculatedRoute.steps.map((step: string, i: number) => (
                              <div key={i} className="flex gap-2 items-center text-xs font-sans text-gray-600 dark:text-gray-300">
                                <span className="h-4 w-4 rounded-full bg-heritage-terracotta/10 text-heritage-terracotta font-mono text-[9px] flex items-center justify-center font-bold">
                                  {i + 1}
                                </span>
                                <span className="line-clamp-1">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    )
                  ) : (
                    <div className="text-center py-6 text-xs text-gray-400 italic font-sans flex flex-col items-center justify-center gap-2">
                      <GitFork className="w-8 h-8 text-gray-500 stroke-[1.5] animate-pulse" />
                      <span>Select sites above and plan your first trip!</span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
