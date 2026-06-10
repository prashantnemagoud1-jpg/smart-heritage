import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Square, Volume2, Globe, Sparkles, Feather, HelpCircle, Mic } from 'lucide-react';
import { traditionalSongs } from '../data/heritageData';
import { TraditionalSong } from '../types';

interface Props {
  darkMode: boolean;
}

export default function TraditionalMusic({ darkMode }: Props) {
  const [activeSongId, setActiveSongId] = useState<string>(traditionalSongs[0].id);
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const activeSong = traditionalSongs.find((s) => s.id === activeSongId) || traditionalSongs[0];

  // Synthesizer Web Audio API Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<any[]>([]);
  const intervalsRef = useRef<any[]>([]);
  const visualizerIntervalRef = useRef<any>(null);

  // Equalizer visual state
  const [eqHeights, setEqHeights] = useState<number[]>([15, 10, 25, 18, 12, 30, 20, 10, 15, 22]);

  // Clean up nodes and schedules on unmount or transition
  useEffect(() => {
    return () => {
      stopSynthesis();
    };
  }, []);

  const stopSynthesis = () => {
    // Cancel all schedules and timers
    intervalsRef.current.forEach((id) => clearInterval(id));
    intervalsRef.current = [];
    
    if (visualizerIntervalRef.current) {
      clearInterval(visualizerIntervalRef.current);
      visualizerIntervalRef.current = null;
    }

    // Stop and disconnect all audio nodes
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {
        // Already stopped or cannot call
      }
    });
    activeNodesRef.current = [];

    // Close Context
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    setPlayingSongId(null);
    setEqHeights([15, 10, 25, 18, 12, 30, 20, 10, 15, 22]);
  };

  const startSynthesis = (song: TraditionalSong) => {
    // 1. Stop old outputs first
    stopSynthesis();

    try {
      // 2. Initialize web audio context (sampleRate 44100 matching browser expectations)
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      setPlayingSongId(song.id);

      // Start beautiful audio visualizer equalizer loop
      visualizerIntervalRef.current = setInterval(() => {
        setEqHeights(() =>
          Array.from({ length: 12 }, () => Math.floor(Math.random() * 45) + 10)
        );
      }, 100);

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.12, ctx.currentTime); // keep overall audio subtle and non-piercing
      mainGain.connect(ctx.destination);

      // Simple reverberation simulation (comb-filter model)
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.4;
      const delayGain = ctx.createGain();
      delayGain.gain.value = 0.35;
      mainGain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(mainGain);

      const baseFrequency = song.synthConfig.baseFreq;
      const scaleIntervals = song.synthConfig.scale;
      const style = song.synthConfig.style;
      const tempoMs = (60 / song.synthConfig.tempo) * 1000;

      // STYLE 1: Sitar Morning Plucks (Plucked acoustic style)
      if (style === 'sitar') {
        // Continuous organic base drone (tambura simulation) on base D3/C3
        const droneOsc = ctx.createOscillator();
        const droneGain = ctx.createGain();
        droneOsc.type = 'triangle';
        droneOsc.frequency.setValueAtTime(baseFrequency, ctx.currentTime);
        droneGain.gain.setValueAtTime(0.04, ctx.currentTime);
        droneOsc.connect(droneGain);
        droneGain.connect(mainGain);
        droneOsc.start();
        activeNodesRef.current.push(droneOsc);

        // Slow secondary octave harmonic drone
        const droneOsc2 = ctx.createOscillator();
        const droneGain2 = ctx.createGain();
        droneOsc2.type = 'sawtooth';
        droneOsc2.frequency.setValueAtTime(baseFrequency * 1.5, ctx.currentTime); // perfect fifth drone
        droneGain2.gain.setValueAtTime(0.015, ctx.currentTime);
        droneOsc2.connect(droneGain2);
        droneGain2.connect(mainGain);
        droneOsc2.start();
        activeNodesRef.current.push(droneOsc2);

        let noteIndex = 0;
        const playSitarStep = () => {
          if (ctx.state === 'closed') return;
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();

          osc.type = 'triangle'; // rich sitar chime harmonics can be simulated nicely with filtered triangle
          // Select note from active Bhairavi morning scale
          const ratio = scaleIntervals[noteIndex % scaleIntervals.length];
          const freq = baseFrequency * ratio;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Custom pluck envelope: instantaneous strike, slow wooden decay
          pGain.gain.setValueAtTime(0.2, ctx.currentTime);
          pGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc.connect(pGain);
          pGain.connect(mainGain);

          osc.start();
          osc.stop(ctx.currentTime + 1.5);
          activeNodesRef.current.push(osc);

          noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % scaleIntervals.length;
        };

        playSitarStep(); // start first pluck
        const intervalId = setInterval(playSitarStep, tempoMs);
        intervalsRef.current.push(intervalId);
      } 

      // STYLE 2: Shakuhachi Zen bamboo flute (Wind breathy model)
      else if (style === 'flute') {
        let noteIdx = 0;
        const playFluteStep = () => {
          if (ctx.state === 'closed') return;
          const osc = ctx.createOscillator();
          const fGain = ctx.createGain();

          osc.type = 'sine'; // pure breath sound
          const ratio = scaleIntervals[noteIdx % scaleIntervals.length];
          const targetFreq = baseFrequency * ratio;

          // Slow swell breath envelope
          fGain.gain.setValueAtTime(0.001, ctx.currentTime);
          fGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.6);
          fGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);

          osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);
          
          // Organic tremolo (vibrato simulating authentic bamboo wind displacement)
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(6.5, ctx.currentTime); // 6.5 Hz flutter
          lfoGain.gain.setValueAtTime(3.5, ctx.currentTime); // frequency swing depth
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);

          osc.connect(fGain);
          fGain.connect(mainGain);

          lfo.start();
          osc.start();
          lfo.stop(ctx.currentTime + 2.5);
          osc.stop(ctx.currentTime + 2.5);

          activeNodesRef.current.push(osc);
          activeNodesRef.current.push(lfo);

          noteIdx = (noteIdx + 1) % scaleIntervals.length;
        };

        playFluteStep();
        const intervalId = setInterval(playFluteStep, tempoMs * 2);
        intervalsRef.current.push(intervalId);
      }

      // STYLE 3: Andean vessel/pan flute quena chime
      else if (style === 'vessel' || style === 'drone') {
        // Drone chord system
        const baseDrone = ctx.createOscillator();
        const bdGain = ctx.createGain();
        baseDrone.type = 'sine';
        baseDrone.frequency.value = baseFrequency / 2; // sub octave warm drone
        bdGain.gain.value = 0.05;
        baseDrone.connect(bdGain);
        bdGain.connect(mainGain);
        baseDrone.start();
        activeNodesRef.current.push(baseDrone);

        let countIdx = 0;
        const playAndeanStep = () => {
          if (ctx.state === 'closed') return;
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const localGain = ctx.createGain();

          osc1.type = 'triangle';
          osc2.type = 'sine';

          const ratio1 = scaleIntervals[countIdx % scaleIntervals.length];
          const ratio2 = scaleIntervals[(countIdx + 2) % scaleIntervals.length];

          // Two harmonizing tubes playing in thirds
          osc1.frequency.setValueAtTime(baseFrequency * ratio1, ctx.currentTime);
          osc2.frequency.setValueAtTime(baseFrequency * ratio2 * 0.5, ctx.currentTime);

          localGain.gain.setValueAtTime(0.001, ctx.currentTime);
          localGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3);
          localGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

          osc1.connect(localGain);
          osc2.connect(localGain);
          localGain.connect(mainGain);

          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 1.8);
          osc2.stop(ctx.currentTime + 1.8);

          activeNodesRef.current.push(osc1);
          activeNodesRef.current.push(osc2);

          countIdx = (countIdx + 1) % scaleIntervals.length;
        };

        playAndeanStep();
        const intervalId = setInterval(playAndeanStep, tempoMs * 1.5);
        intervalsRef.current.push(intervalId);
      }

    } catch (err) {
      console.error('Failed to trigger audio synth node:', err);
    }
  };

  const handleTogglePlay = (song: TraditionalSong) => {
    if (playingSongId === song.id) {
      stopSynthesis();
    } else {
      startSynthesis(song);
    }
  };

  return (
    <section id="music" className={`py-20 sm:py-28 border-t transition-colors duration-300 ${
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
            ACOUSTIC ARCHIVE
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Traditional Folk & <span className="text-heritage-terracotta">Ambient Melodies</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Press play on any song card to trigger our custom Web Audio API ancient synthesizer, which procedurally computes rich regional waveforms live in your browser.
          </p>
        </div>

        {/* Music Deck Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* List of song items - left column */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
            {traditionalSongs.map((song) => {
              const isSelected = song.id === activeSongId;
              const isPlaying = song.id === playingSongId;
              return (
                <button
                  key={song.id}
                  onClick={() => {
                    setActiveSongId(song.id);
                    if (playingSongId && playingSongId !== song.id) {
                      // Switch play directly
                      startSynthesis(song);
                    }
                  }}
                  className={`w-full p-4.5 rounded-2xl cursor-pointer border text-left transition-all ${
                    isSelected
                      ? darkMode
                        ? 'bg-heritage-gold/10 border-heritage-gold/40 shadow-md'
                        : 'bg-heritage-terracotta/10 border-heritage-terracotta/40 shadow-md'
                      : darkMode
                        ? 'bg-white/5 border-white/5 hover:border-white/10'
                        : 'bg-heritage-clay/5 border-transparent hover:border-heritage-clay/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-heritage-terracotta font-semibold">
                      {song.cultureRegion}
                    </span>
                    <Music className={`w-4 h-4 ${isPlaying ? 'text-heritage-terracotta animate-spin' : 'text-gray-400'}`} />
                  </div>
                  <h4 className="font-display font-semibold text-base mb-1">{song.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-sans truncate">Artist: {song.artist}</p>
                </button>
              );
            })}
          </div>

          {/* Master Player Deck - right column */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-3xl border h-full flex flex-col justify-between ${
              darkMode ? 'bg-dark-surface/50 border-white/5' : 'bg-heritage-cream/40 border-heritage-clay/10'
            }`}>
              
              {/* Deck top */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-lg bg-heritage-terracotta/10 text-heritage-terracotta animate-pulse">
                    <Music className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">SYNTH AUDIO DECK</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl mb-1 text-gray-900 dark:text-white">
                  {activeSong.title}
                </h3>
                <p className="text-sm text-heritage-terracotta font-mono mb-6">{activeSong.artist} • {activeSong.cultureRegion}</p>

                {/* Simulated Audio Wave equalizating bars */}
                <div className="h-28 flex items-end justify-center gap-1.5 bg-black/40 dark:bg-black/80 rounded-2xl p-6 mb-8 relative overflow-hidden">
                  <div className="absolute top-3 left-4 font-mono text-[9px] text-gray-400 uppercase flex items-center gap-1.5 tracking-wider">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-ping inline-block" />
                    Procedural Synthesis Module: {activeSong.synthConfig.style.toUpperCase()} Wave
                  </div>

                  {eqHeights.map((ht, index) => (
                    <motion.div
                      key={index}
                      className="w-1.5 sm:w-2 bg-gradient-to-t from-heritage-terracotta to-heritage-gold rounded-full"
                      style={{ height: `${playingSongId === activeSong.id ? ht : 6}px` }}
                      animate={{ height: playingSongId === activeSong.id ? undefined : 6 }}
                      transition={{ type: 'spring', damping: 10 }}
                    />
                  ))}
                </div>

                {/* Meta details */}
                <div className="space-y-4 mb-8">
                  <div>
                    <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">CULTURAL SIGNIFICANCE:</h5>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                      {activeSong.significance}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">ACOUSTIC INTRINSICS & TIMBRE:</h5>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed italic">
                      "{activeSong.meaning}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Play buttons & controls bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-400 uppercase">INSTRUMENTS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSong.instruments.map((ins, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-heritage-terracotta/10 text-heritage-terracotta text-[10px] font-mono font-medium uppercase">
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trigger synthesizer */}
                <button
                  onClick={() => handleTogglePlay(activeSong)}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl cursor-pointer font-medium font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${
                    playingSongId === activeSong.id
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                      : darkMode
                        ? 'bg-heritage-gold hover:bg-amber-400 text-dark-charcoal font-bold'
                        : 'bg-heritage-terracotta hover:bg-heritage-clay text-white'
                  }`}
                >
                  {playingSongId === activeSong.id ? (
                    <>
                      <Square className="w-4 h-4 fill-white" />
                      <span>STOP MONOMODE OSC</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>PLAY PROCEDURAL SYNTH</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
