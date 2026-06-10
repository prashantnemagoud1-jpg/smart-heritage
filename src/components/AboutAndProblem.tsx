import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Cpu, Heart, AlertTriangle, Languages, Eye, HelpCircle, Sparkles, Star, BookOpen } from 'lucide-react';

interface Props {
  darkMode: boolean;
}

export default function AboutAndProblem({ darkMode }: Props) {
  const problems = [
    {
      id: 'p1',
      title: 'Inaccessible Cultural Information',
      desc: 'Important historical knowledge is often locked behind static dry paper plaques or inaccessible academic books, alienating general tourists.',
    },
    {
      id: 'p2',
      title: 'Rigid Language Barriers',
      desc: 'Foreign and regional tourists find it difficult to translate local signage, understand native dialects, or explore regional micro-archives.',
    },
    {
      id: 'p3',
      title: 'Poor Visitor Engagement',
      desc: 'Traditional museums and ruins lack interactive experiences, failing to inspire younger, digitally native generations.',
    },
    {
      id: 'p4',
      title: 'Fading Digital Preservation',
      desc: 'Cultural sights undergo environmental erosion without structured, high-resolution 3D records or digital archives to catalog them eternally.',
    },
    {
      id: 'p5',
      title: 'Obscured Local Oral Traditions',
      desc: 'Folk music, legendary stories, and native dialects are fading as elderly traditional storytellers are lost without audio-archival tools.',
    },
  ];

  const solutions = [
    {
      id: 's1',
      icon: <Cpu className="w-5 h-5 text-heritage-gold" />,
      title: 'AI-Powered Tourist Curators',
      desc: 'Context-sensitive natural language models acting as localized electronic historians, planning tailored routes and resolving queries on demand.',
    },
    {
      id: 's2',
      icon: <Eye className="w-5 h-5 text-orange-400" />,
      title: 'AR Ruins Reconstruction',
      desc: 'Mobile lenses scanning broken stones to project full-color real-time 3D structures, restoring ancient designs to their pristine state.',
    },
    {
      id: 's3',
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      title: 'Immersive VR Portals',
      desc: '360° virtual spaces rendering highly detailed architectural strolls so individuals can explore delicate historical areas from anywhere globally.',
    },
    {
      id: 's4',
      icon: <Languages className="w-5 h-5 text-teal-400" />,
      title: 'Smart Multilingual Guides',
      desc: 'Phonetic vocal systems translating classical dialects and regional poetry into modern worldwide tongues while preserving authentic pronunciations.',
    },
    {
      id: 's5',
      icon: <BookOpen className="w-5 h-5 text-pink-400" />,
      title: 'Interactive Learning Circles',
      desc: 'Digital quiz modules, regional audio players, and custom SVG pathfinders turning cultural tourism into gamified, enjoyable education.',
    },
  ];

  return (
    <section id="about" className={`py-20 sm:py-28 transition-colors duration-300 ${
      darkMode ? 'bg-dark-charcoal text-gray-100' : 'bg-heritage-cream text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. About the Project Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 ${
              darkMode ? 'bg-heritage-gold/10 text-heritage-gold' : 'bg-heritage-terracotta/10 text-heritage-terracotta'
            }`}
          >
            THE DIGITAL RENAISSANCE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6"
          >
            Preserving History Through <span className="text-heritage-terracotta">Modern Intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Digital Smart Tourism is the strategic union of classical historical research with computational sensors. Our goal is to make fragile monuments resilient to decay while providing immersive digital spaces that speak in every tongue.
          </motion.p>
        </div>

        {/* 2. Key Pillars of Smart Tourism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 sm:mb-32">
          <motion.div
            className="p-8 bento-grid-item"
          >
            <div className="p-3 w-12 h-12 rounded-2xl bg-heritage-gold/15 text-heritage-gold mb-6 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 uppercase tracking-tight text-[#1A1A1A] dark:text-white">Cultural Preservation</h3>
            <p className="text-sm text-[#6B5E55] dark:text-gray-400 leading-relaxed">
              Archiving threatened architecture, folk melodies, and languages into unified digital clouds, shielding them from physical weathering or human oversight.
            </p>
          </motion.div>

          <motion.div
            className="p-8 bento-grid-item"
          >
            <div className="p-3 w-12 h-12 rounded-2xl bg-heritage-gold/15 text-heritage-gold mb-6 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 uppercase tracking-tight text-[#1A1A1A] dark:text-white">Immersive Engagement</h3>
            <p className="text-sm text-[#6B5E55] dark:text-gray-400 leading-relaxed">
              Replacing boring static plaques with responsive augmented overlays, interactive spatial audio tracks, and intuitive maps that react to visitor steps.
            </p>
          </motion.div>

          <motion.div
            className="p-8 bento-grid-item"
          >
            <div className="p-3 w-12 h-12 rounded-2xl bg-heritage-gold/15 text-heritage-gold mb-6 flex items-center justify-center">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 uppercase tracking-tight text-[#1A1A1A] dark:text-white">Global Accessibility</h3>
            <p className="text-sm text-[#6B5E55] dark:text-gray-400 leading-relaxed">
              Empowering foreign and domestic tourists to translate complex histories and local customs instantly, fostering warm intercultural respect and curiosity.
            </p>
          </motion.div>
        </div>

        {/* 3. Problem vs Proposed Solution Split Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Problem Statement box */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-2xl tracking-tight text-red-600 dark:text-red-400">
                The Heritage Crisis
              </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-6">
              Without modernized technological mediums, ancestral tourism corridors suffer from severe operational friction and physical neglect:
            </p>
            <div className="space-y-4">
              {problems.map((prob, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={prob.id}
                  className="p-5 bento-grid-item flex gap-4"
                >
                  <div className="mt-0.5 text-[#C5A059] font-mono text-xs leading-none flex items-center justify-center h-6 w-6 bg-amber-500/10 rounded-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm mb-1 text-gray-800 dark:text-gray-200">
                      {prob.title}
                    </h4>
                    <p className="text-xs text-[#6B5E55] dark:text-gray-400 leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Proposed Solution box */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-2xl tracking-tight text-green-600 dark:text-green-400">
                The Smart Solution
              </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-6">
              By introducing custom hardware layers, cloud-delivered AI, and lightweight smartphone integrations, we breathe life back into ruins:
            </p>
            <div className="space-y-4">
              {solutions.map((sol, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={sol.id}
                  className="p-5 bento-grid-item flex gap-4"
                >
                  <div className="p-2 rounded-xl bg-amber-500/10 flex items-center justify-center h-10 w-10 shrink-0 text-[#C5A059]">
                    {sol.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm mb-1 text-gray-800 dark:text-gray-200">
                      {sol.title}
                    </h4>
                    <p className="text-xs text-[#6B5E55] dark:text-gray-400 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
