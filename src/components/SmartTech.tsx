import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Eye, Tv, Languages, Smartphone, QrCode, Scan, X, Compass, ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';
import { smartTechnologies } from '../data/heritageData';

interface Props {
  darkMode: boolean;
}

export default function SmartTech({ darkMode }: Props) {
  const [activeSimulation, setActiveSimulation] = useState<'ar' | 'vr' | 'qr' | null>(null);

  // VR 360 Panorama drag logic simulation
  const [panX, setPanX] = useState<number>(50); // offset range 0 - 100 representing panorama position
  const [zoom, setZoom] = useState<number>(1); // zoom multiplier 1 to 1.8
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startPan = useRef<number>(50);

  // Panoramic visual backdrops
  const vrBackdrops = [
    { title: 'Machu Picchu Citadel (Andes Mountains)', url: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1500&q=80' },
    { title: 'Taj Mahal Pool (Agra, India)', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1500&q=80' },
    { title: 'Ancient Roman Forum (Rome)', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1500&q=80' }
  ];
  const [activeVrItem, setActiveVrItem] = useState<number>(0);

  // AR Scanner mouse trace simulation
  const [arMousePos, setArMousePos] = useState({ x: 150, y: 150 });
  const arContainerRef = useRef<HTMLDivElement>(null);

  const handleArMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!arContainerRef.current) return;
    const rect = arContainerRef.current.getBoundingClientRect();
    setArMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // VR drag events
  const handleVrMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startPan.current = panX;
  };

  const handleVrMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    // Panning offset is reversed so dragging matches panoramic expectation
    const nextPan = startPan.current - (dx / 6);
    setPanX(Math.max(10, Math.min(90, nextPan)));
  };

  const handleVrMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // QR scanner simulation states
  const [qrPlaqueSite, setQrPlaqueSite] = useState<string>('taj');
  const [isQrScanned, setIsQrScanned] = useState<boolean>(false);

  const getIcon = (id: string) => {
    switch (id) {
      case 'tech-ai': return <Cpu className="w-5 h-5 text-heritage-terracotta" />;
      case 'tech-ar': return <Scan className="w-5 h-5 text-orange-500" />;
      case 'tech-vr': return <Tv className="w-5 h-5 text-yellow-500" />;
      case 'tech-ml': return <Languages className="w-5 h-5 text-teal-500" />;
      case 'tech-maps': return <Compass className="w-5 h-5 text-purple-500" />;
      default: return <QrCode className="w-5 h-5 text-pink-500" />;
    }
  };

  const getSimTriggerLabel = (id: string) => {
    if (id === 'tech-ar') return 'Launch AR Simulator';
    if (id === 'tech-vr') return 'Launch 360° VR View';
    if (id === 'tech-qr') return 'Simulate QR Code Scan';
    return null;
  };

  const triggerSimulation = (id: string) => {
    if (id === 'tech-ar') {
      setActiveSimulation('ar');
    } else if (id === 'tech-vr') {
      setActiveSimulation('vr');
      setPanX(50);
      setZoom(1.1);
    } else if (id === 'tech-qr') {
      setActiveSimulation('qr');
      setIsQrScanned(false);
    }
  };

  return (
    <section id="tech-section" className={`py-20 sm:py-28 transition-colors duration-300 ${
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
            SMART INFRASTRUCTURE
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Sensory Ports & <span className="text-heritage-terracotta">Interlocking Technologies</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            We overlay ancient monuments with interactive data conduits. Click "Launch Simulator" on any qualifying technology card below to test its virtual counterpart.
          </p>
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {smartTechnologies.map((tech) => {
            const triggerLabel = getSimTriggerLabel(tech.id);
            return (
              <motion.div
                key={tech.id}
                className="p-6 sm:p-8 bento-grid-item flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{tech.category}</span>
                    <div className="p-2 bg-heritage-terracotta/10 rounded-lg text-heritage-terracotta">
                      {getIcon(tech.id)}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg mb-1 leading-snug">{tech.name}</h3>
                  <span className="text-xs text-heritage-terracotta font-mono block mb-3">{tech.subtitle}</span>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-4">
                    {tech.description}
                  </p>

                  <div className="p-3 bg-heritage-clay/5 dark:bg-white/[0.02] rounded-xl border border-dotted border-gray-300 dark:border-white/5 text-xs font-sans mb-6">
                    <span className="font-mono text-[9px] text-gray-400 block mb-1">REAL-WORLD IMPLEMENTATION:</span>
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{tech.useCase}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/5">
                  <span className="text-[10px] font-mono text-gray-400">IMPACT: {tech.impact}</span>
                  {triggerLabel && (
                    <button
                      onClick={() => triggerSimulation(tech.id)}
                      className="px-3.5 py-1.5 cursor-pointer rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-heritage-terracotta/10 text-heritage-terracotta hover:bg-heritage-terracotta hover:text-white transition-all shadow-sm"
                    >
                      {triggerLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Simulations viewport Modals */}
        <AnimatePresence>
          {activeSimulation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className={`w-full max-w-4xl rounded-3xl overflow-hidden border border-white/20 select-none relative ${
                  darkMode ? 'bg-dark-surface' : 'bg-white'
                }`}
              >
                
                {/* Header controls bar */}
                <div className="p-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between bg-black/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-heritage-gold" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-heritage-terracotta">
                      {activeSimulation === 'ar' && 'STATIONARY AR SCANNER SIMULATOR v1.0'}
                      {activeSimulation === 'vr' && '360° HERITAGE PANORAMA PROJECTION'}
                      {activeSimulation === 'qr' && 'ECO-PLAQUE QR CODE ARCHIVAL DECODING'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveSimulation(null);
                      setIsQrScanned(false);
                    }}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white/5 trigger-close cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Simulation 1: AR camera Scanner Simulator details */}
                {activeSimulation === 'ar' && (
                  <div
                    ref={arContainerRef}
                    onMouseMove={handleArMouseMove}
                    className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden cursor-crosshair p-4 flex flex-col justify-between"
                  >
                    {/* Retro background image of Hampi ruins */}
                    <img
                      src="https://images.unsplash.com/photo-1600100397990-24b321a32a13?auto=format&fit=crop&w=1200&q=80"
                      alt="AR background"
                      className="absolute inset-0 w-full h-full object-cover opacity-65"
                    />

                    {/* Green bounding wireframes on background of ruined stones */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {/* Architectural outline wireframe drawn over ruins */}
                      <polygon points="200,320 400,120 600,120 800,320" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pulse" />
                      <line x1="400" y1="120" x2="400" y2="320" stroke="#22c55e" strokeWidth="1" opacity="0.3" />
                      <line x1="600" y1="120" x2="600" y2="320" stroke="#22c55e" strokeWidth="1" opacity="0.3" />
                      
                      {/* Glowing focus grid */}
                      <rect x="350" y="80" width="300" height="260" fill="none" stroke="#eab308" strokeWidth="2" className="glow-gold" />
                    </svg>

                    {/* Camera view boundary coordinates */}
                    <div className="absolute top-4 left-4 font-mono text-[9px] text-green-400 space-y-1">
                      <div>REC MON: LIVE ACTIVE CAMERA</div>
                      <div>FPS: 60 / ISO-400 • F/2.8</div>
                      <div>MARKER TRACK STATUS: LOCKED</div>
                    </div>

                    <div className="absolute top-4 right-4 font-mono text-[9px] text-green-400 text-right">
                      <div>DEPTH COORD: Z-12.8m</div>
                      <div>COMPASS: 228.4° SW</div>
                    </div>

                    {/* Center crosshair mouse coordinate bounding tracer */}
                    <div
                      className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                      style={{ left: arMousePos.x, top: arMousePos.y }}
                    >
                      <div className="w-14 h-14 border border-dashed border-green-400 rounded-full animate-spin-slow flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <span className="absolute left-9 bottom-1 text-[9px] font-mono text-green-400 whitespace-nowrap bg-black/60 p-1 rounded border border-green-500/20">
                        ANALYZE: X:{Math.round(arMousePos.x)} Y:{Math.round(arMousePos.y)}
                      </span>
                    </div>

                    {/* Bottom Scanning info bars */}
                    <div className="z-15 p-4 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-white max-w-sm mt-auto">
                      <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono mb-1">
                        <Scan className="w-3.5 h-3.5 animate-pulse" />
                        <span>COMPUTER VISION SURFACE MATCHED:</span>
                      </div>
                      <h4 className="font-display font-bold text-sm">Vijayanagara Vittala Sanctuary Wing</h4>
                      <p className="text-[10px] text-gray-300 font-sans leading-normal mt-1">
                        Architectural profile matched with 15th-century Sanskrit stone templates. Structural load calculation: 94.2% safe. Faded Relief restored dynamically on client device screen.
                      </p>
                    </div>

                    <div className="absolute bottom-4 right-4 text-xs font-mono text-green-400 pointer-events-none">
                      MOVE CURSOR OVER VIEWPORT TO SCAN TEMPLE
                    </div>
                  </div>
                )}

                {/* Simulation 2: VR 360 Panorama drag Simulator details */}
                {activeSimulation === 'vr' && (
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden flex flex-col justify-between">
                    
                    {/* Immersive Panoramic backdrop image responding to drag state offset */}
                    <div
                      onMouseDown={handleVrMouseDown}
                      onMouseMove={handleVrMouseMove}
                      onMouseUp={handleVrMouseUpOrLeave}
                      onMouseLeave={handleVrMouseUpOrLeave}
                      className="absolute inset-0 w-full h-full bg-cover transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing"
                      style={{
                        backgroundImage: `url(${vrBackdrops[activeVrItem].url})`,
                        backgroundPosition: `${panX}% 50%`,
                        transform: `scale(${zoom})`
                      }}
                    />

                    {/* VR overlay dials */}
                    <div className="absolute top-4 left-4 z-10 text-white font-mono text-[9px] bg-black/55 backdrop-blur border border-white/10 rounded-lg p-2.5">
                      <div className="font-bold text-heritage-gold">ACTIVE CHRONOS-PORTAL</div>
                      <div className="mt-1 uppercase">{vrBackdrops[activeVrItem].title}</div>
                      <div className="text-gray-300">Panning Offset: {Math.round(panX)}% (Drag mouse left/right)</div>
                    </div>

                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <button
                        onClick={() => setZoom(Math.min(1.8, zoom + 0.15))}
                        className="p-2 rounded bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setZoom(Math.max(1.0, zoom - 0.15))}
                        className="p-2 rounded bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setPanX(50);
                          setZoom(1.1);
                        }}
                        className="p-2 rounded bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                        title="Reset View"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Site backdrop selector inside simulator directly */}
                    <div className="absolute bottom-4 left-4 z-10 bg-black/65 backdrop-blur border border-white/10 rounded-xl p-3 text-white max-w-sm flex items-center gap-3">
                      <div className="text-left font-sans text-xs">
                        <span className="text-[10px] text-gray-400 font-mono tracking-wide uppercase">TELEPORT MONUMENT</span>
                        <div className="flex gap-1.5 mt-1">
                          {vrBackdrops.map((item, id) => (
                            <button
                              key={id}
                              onClick={() => {
                                setActiveVrItem(id);
                                setPanX(50);
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                                id === activeVrItem ? 'bg-heritage-terracotta text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                              }`}
                            >
                              PORTAL {id + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 pointer-events-none font-mono text-[9px] text-white/80 bg-black/45 p-1 rounded shadow flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-heritage-gold" />
                      DRAG MOUSE OVER THE CITADEL TO LOOK AROUND
                    </div>

                  </div>
                )}

                {/* Simulation 3: QR plaque scanning simulator */}
                {activeSimulation === 'qr' && (
                  <div className="p-8 flex flex-col md:flex-row items-center gap-8 justify-around min-h-80 bg-slate-900/5 dark:bg-black/25">
                    
                    {/* Left: scanner mock plaque */}
                    <div className={`p-6 rounded-2xl border text-center max-w-xs ${
                      darkMode ? 'bg-dark-surface border-white/10' : 'bg-white border-heritage-clay/10'
                    }`}>
                      <div className="mx-auto w-40 h-40 bg-black p-4 rounded-xl flex items-center justify-center relative overflow-hidden mb-4 shadow">
                        <QrCode className="w-full h-full text-white" />
                        
                        {/* Red scanner tracer line moving over Qr code */}
                        <div className="absolute inset-x-0 h-0.5 bg-red-500 shadow shadow-red-500/50 animate-bounce" />
                      </div>

                      <span className="text-xs font-mono text-heritage-terracotta tracking-wider uppercase block mb-1">STATIONARY SITE MARKS</span>
                      <h4 className="font-display font-bold text-sm">Select Eco-Plaque Site:</h4>
                      <div className="flex justify-center gap-1.5 mt-2">
                        {['taj', 'hampi'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setQrPlaqueSite(item);
                              setIsQrScanned(false);
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase cursor-pointer ${
                              qrPlaqueSite === item ? 'bg-heritage-terracotta text-white' : 'bg-heritage-clay/5 hover:bg-heritage-clay/10 text-gray-600'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Scan core trigger and readout */}
                    <div className="max-w-md w-full bg-black/40 dark:bg-black/70 rounded-2xl p-6 text-white border border-white/10 min-h-60 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <QrCode className="w-4 h-4 text-heritage-gold" />
                          <span className="font-mono text-[9px] tracking-widest text-gray-300 uppercase">SCANNER ENGINE TERMINAL</span>
                        </div>

                        {!isQrScanned ? (
                          <div className="text-center py-6">
                            <p className="text-xs text-gray-300 font-sans mb-4">Press trigger below to simulate scanning our physical eco-marker plaque located near site fences.</p>
                            <button
                              onClick={() => setIsQrScanned(true)}
                              className="px-6 py-3 bg-heritage-terracotta hover:bg-heritage-clay text-white font-mono rounded-xl text-xs font-bold tracking-widest cursor-pointer"
                            >
                              INITIALIZE QR CAMERA STREAM
                            </button>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center gap-1 text-green-400 font-mono text-xs">
                              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                              <span>QR DECODING SUCCESSFUL!</span>
                            </div>

                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">
                              {qrPlaqueSite === 'taj' ? 'TAJ MAHAL PLATFORM DOSSIER #Q982' : 'HAMPI MONOLITH DOSSIER #Q221'}
                            </span>

                            <p className="text-xs text-gray-300 font-sans leading-relaxed">
                              {qrPlaqueSite === 'taj'
                                ? 'Marmorean records confirmed that the white Makrana marble blocks were transported from 300 kilometres away using a 15-mile mud inclined plane on teakwood wagons powered by 1,000 royal elephants.'
                                : 'The Stone Chariot is not actually carved of a single stone. It was constructed using meticulously calibrated granite joints masked by fine ornamental stucco work, allowing it to move on functional stone axles.'
                              }
                            </p>

                            <div className="pt-2 flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-heritage-gold/20 text-heritage-gold font-mono text-[9px] uppercase">CLASS ARCHIVES LOADED</span>
                              <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-mono text-[9px] uppercase">AUDIO PLAYBACK ACTIVE</span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="text-[9px] font-mono text-gray-400 border-t border-white/5 pt-4 text-center">
                        STATUS: READY • SCAN DETECT FREQUENCY 1.5ms
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
