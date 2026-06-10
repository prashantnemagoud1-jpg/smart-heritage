import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Mail, Send, CheckCircle, Github, Twitter, Youtube, Globe, Server, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  darkMode: boolean;
}

export default function ContactAndImpact({ darkMode }: Props) {
  // Contact States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [isSubmitContact, setIsSubmitContact] = useState(false);

  // Newsletter states
  const [newsEmail, setNewsEmail] = useState('');
  const [isSubmitNews, setIsSubmitNews] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    setIsSubmitContact(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMsg('');
    }, 500);
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setIsSubmitNews(true);
    setTimeout(() => {
      setNewsEmail('');
    }, 500);
  };

  const stats = [
    { label: 'Tourist Retention & Engagement', value: '88%', desc: 'Immersive AR scanners & local audio-dramas increase visitor strolling duration.' },
    { label: 'Endangered Dialects Saved', value: '+14 Ancient', desc: 'Sanskrit liturgies, classical Japanese poetry courts preserved in digital archives.' },
    { label: '3D Laser doubles Preserved', value: '45+ Citadels', desc: 'Sub-millimeter LiDAR meshes safeguarding fragile structures from weather decays.' },
    { label: 'Global Visitor Accessibility', value: '96% Score', desc: 'Instant multilingual translations eliminate traditional communication divides.' }
  ];

  return (
    <section id="contact-impact" className={`py-20 sm:py-28 border-t transition-colors duration-300 ${
      darkMode ? 'bg-dark-surface border-white/5 text-gray-100' : 'bg-white border-heritage-clay/10 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Impact Section (Section 14) */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 ${
              darkMode ? 'bg-heritage-gold/10 text-heritage-gold' : 'bg-heritage-terracotta/10 text-heritage-terracotta'
            }`}>
              MEASURABLE STEWARDSHIP
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
              Preservation in Numbers: <span className="text-heritage-terracotta">Our Cultural Impact</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
              By introducing localized edge-sensors, real-time AI translation tools, and 3D geometric portals, we elevate tourist metrics while protecting physical materials.
            </p>
          </div>

          {/* Grid of Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="p-6 sm:p-8 bento-grid-item flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-display font-bold text-heritage-terracotta block mb-2">{stat.value}</span>
                  <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-100">{stat.label}</h4>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans mt-2">
                  {stat.desc}
                </p>
                
                {/* Simulated percentage load bar */}
                <div className="w-full bg-gray-200 dark:bg-white/5 h-1 rounded-full mt-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    className="h-full bg-heritage-terracotta"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Contact vs Deployment dual grid (Section 15) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact and Feedback (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="font-display font-bold text-2xl mb-2 flex items-center gap-2">
                <Mail className="text-heritage-terracotta w-6 h-6" />
                Connect & Propose Feedback
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                Join our decentralized cultural stewardship council. Submit findings, project queries, or register local oral dialect traditions with our curatorial archives.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitContact ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleContactSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">FULL NAME</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full p-3.5 rounded-xl text-sm font-sans border outline-none focus:ring-1 focus:ring-heritage-terracotta ${
                          darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">EMAIL ADRESS</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full p-3.5 rounded-xl text-sm font-sans border outline-none focus:ring-1 focus:ring-heritage-terracotta ${
                          darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">PROPOSAL FEEDBACK</label>
                    <textarea
                      required
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="Share geographical coordinates or local oral traditions..."
                      className={`w-full p-3.5 rounded-xl text-sm font-sans border outline-none focus:ring-1 focus:ring-heritage-terracotta ${
                        darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`px-6 py-3.5 cursor-pointer rounded-xl font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow hover:shadow-lg ${
                      darkMode ? 'bg-heritage-gold text-dark-charcoal hover:bg-amber-400' : 'bg-heritage-terracotta text-white hover:bg-heritage-clay'
                    }`}
                  >
                    <span>SUBMIT CULTURAL BRIEF</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-green-500/10 text-green-600 border border-green-500/25 flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-base mb-1">Proposal Registered Successfully!</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 font-sans leading-relaxed">
                      Thank you for contributing to Smart Heritage stewardship, our local curatorial board will audit your dossier and log it into our centralized ledger.
                    </p>
                    <button
                      onClick={() => setIsSubmitContact(false)}
                      className="mt-4 text-xs font-mono font-bold text-heritage-terracotta hover:underline block cursor-pointer"
                    >
                      SEND ANOTHER CORRESPONDENCE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vercel Deployment instructions (Span 5) */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 bento-grid-item flex flex-col justify-between">
              
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-5 h-5 text-heritage-terracotta" />
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Vercel Deployment Guide</span>
                </div>

                <h4 className="font-display font-bold text-lg mb-2">Deploy Worldwide in Seconds</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-6">
                  This application features a fully unified Express + Vite full-stack architecture, fully optimized for immediate, high-availability deployments on Vercel:
                </p>

                {/* Steps card */}
                <div className="space-y-3.5">
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-heritage-terracotta/10 text-heritage-terracotta font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <div className="text-xs font-sans text-gray-600 dark:text-gray-300">
                      <strong>Export Project:</strong> From the top Settings menu in physical AI Studio, select "Export to GitHub" or download as a complete ZIP file.
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-heritage-terracotta/10 text-heritage-terracotta font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <div className="text-xs font-sans text-gray-600 dark:text-gray-300">
                      <strong>Connect Repository:</strong> Deploy to Vercel via dashboard, hooking up your compiled GitHub workspace repository cleanly.
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-heritage-terracotta/10 text-heritage-terracotta font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <div className="text-xs font-sans text-gray-600 dark:text-gray-300">
                      <strong>Define Secrets:</strong> Configure the live <span className="font-mono text-[10px] bg-heritage-terracotta/15 text-heritage-terracotta px-1 rounded">GEMINI_API_KEY</span> inside your Vercel Environment variables panel.
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5 space-y-4">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block font-bold">STUWARDSHIP DIRECT BULLETINS</span>
                
                <AnimatePresence mode="wait">
                  {!isSubmitNews ? (
                    <form onSubmit={handleNewsSubmit} className="flex gap-1">
                      <input
                        type="email"
                        required
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        placeholder="steward@heritage.org"
                        className={`flex-1 px-3 py-2 rounded-lg text-xs font-sans border outline-none ${
                          darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-heritage-terracotta text-white rounded-lg text-xs font-mono font-bold cursor-pointer hover:bg-heritage-clay"
                      >
                        SUBSCRIBE
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-green-600 font-sans flex items-center gap-1.5 font-semibold"
                    >
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Thank you, newsletter subscription active!</span>
                    </motion.div>
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
