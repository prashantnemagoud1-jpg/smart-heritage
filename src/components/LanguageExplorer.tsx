import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Languages, Volume2, Globe, Star, Sparkles, AlertCircle, Quote } from 'lucide-react';
import { languagesList } from '../data/heritageData';
import { LanguageCulture, Phrase } from '../types';

interface Props {
  darkMode: boolean;
}

export default function LanguageExplorer({ darkMode }: Props) {
  const [activeLangId, setActiveLangId] = useState<string>(languagesList[0].id);
  const [speakingPhrase, setSpeakingPhrase] = useState<string | null>(null);

  const activeLang = languagesList.find((l) => l.id === activeLangId) || languagesList[0];

  // Map our language IDs to best fallback browser synthesis locales
  const getLocale = (id: string): string => {
    switch (id) {
      case 'sanskrit': return 'hi-IN'; // Sanskrit phonetic matches Hindi synthesis perfectly
      case 'latin': return 'it-IT'; // Italian synthesis mimics classical Latin vowels
      case 'quechua': return 'es-PE'; // Peruvian Spanish synthesis works for phonetic Quechua
      case 'japanese-classical': return 'ja-JP'; // Standard Japanese
      default: return 'en-US';
    }
  };

  const handlePronounce = (phraseObj: Phrase) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser environment. You can read the phonetic guide: ' + phraseObj.pronunciation);
      return;
    }

    // Capture phrase text without devbracket translations
    const cleanText = phraseObj.phrase.split('(')[0].trim();
    
    // Stop any existing spoken cues
    window.speechSynthesis.cancel();

    // Trigger synthesis
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = getLocale(activeLang.id);
    utterance.rate = 0.8; // slightly slower for educational utility
    
    utterance.onstart = () => setSpeakingPhrase(phraseObj.phrase);
    utterance.onend = () => setSpeakingPhrase(null);
    utterance.onerror = () => setSpeakingPhrase(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="languages" className={`py-20 sm:py-28 transition-colors duration-300 ${
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
            NATIVE DIALECTS
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Hear the Voices of <span className="text-heritage-terracotta">Ancestral Tradition</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Each heritage region is anchored by active spoken dialects. Push any audio trigger below to hear native words pronounced in real time.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          {languagesList.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                window.speechSynthesis.cancel();
                setSpeakingPhrase(null);
                setActiveLangId(lang.id);
              }}
              className={`p-4 rounded-2xl cursor-pointer border text-center transition-all flex flex-col justify-between h-24 ${
                lang.id === activeLangId
                  ? darkMode
                    ? 'bg-heritage-gold/10 border-heritage-gold text-heritage-gold'
                    : 'bg-heritage-terracotta/10 border-heritage-terracotta text-heritage-terracotta'
                  : darkMode
                    ? 'bg-white/5 border-white/5 hover:border-white/10 text-gray-400'
                    : 'bg-white border-heritage-clay/10 hover:border-heritage-terracotta/20 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono tracking-wide uppercase opacity-75">{lang.region.split('/')[0].trim()}</span>
                <Languages className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="block font-display font-bold text-sm sm:text-base leading-none mb-1">{lang.langName}</span>
                <span className="text-xs font-sans opacity-70 italic">{lang.nativeName}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Multi-grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Facts and Metadata */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6">
            <div className="p-8 bento-grid-item">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-[#1A1A1A] dark:text-white mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-heritage-gold" />
                Language Etymology
              </h3>
              
              <div className="mb-4">
                <span className="text-xs font-mono text-gray-500 uppercase">Literal Meaning:</span>
                <p className="text-sm italic font-medium text-heritage-terracotta">"{activeLang.meaning}"</p>
              </div>

              <div className="mb-6">
                <span className="text-xs font-mono text-gray-500 uppercase">Historical Origins:</span>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1 font-sans">
                  {activeLang.origin}
                </p>
              </div>

              {/* Facts list */}
              <div>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-3">Linguistic Facts & Secrets</span>
                <div className="space-y-3.5">
                  {activeLang.facts.map((fact, index) => (
                    <div key={index} className="flex gap-2 items-start text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                      <div className="h-1.5 w-1.5 rounded-full bg-heritage-gold shrink-0 mt-1.5" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Cards & Synthesizer */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            <div className="p-8 bento-grid-item flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-[#1A1A1A] dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-heritage-gold" />
                  Common Historical Phrases
                </h3>
                <span className="text-[10px] font-mono rounded px-2 py-1 bg-heritage-terracotta/10 text-heritage-terracotta">
                  PHONETIC TTS ACTIVE
                </span>
              </div>

              {/* Phrase Cards */}
              <div className="space-y-4">
                {activeLang.phrases.map((phObj, i) => {
                  const isCurSpeaking = speakingPhrase === phObj.phrase;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                        isCurSpeaking
                          ? 'border-heritage-terracotta bg-heritage-terracotta/5 shadow-md'
                          : darkMode
                            ? 'bg-black/20 border-white/5 hover:border-white/10'
                            : 'bg-heritage-clay/5 border-transparent hover:border-heritage-clay/10'
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-xs font-mono text-gray-400 tracking-wider">PHRASE {i + 1}</span>
                        <h4 className="font-bold text-base sm:text-lg font-display tracking-wide truncate mt-0.5 text-gray-800 dark:text-white">
                          {phObj.phrase}
                        </h4>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4 mt-2 text-xs sm:text-sm">
                          <span className="text-heritage-terracotta flex items-center gap-1 font-mono">
                            <Quote className="w-3 h-3 rotate-180 text-gray-400" />
                            {phObj.meaning}
                          </span>
                          <span className="text-gray-400 italic">"Read: {phObj.pronunciation}"</span>
                        </div>
                      </div>

                      {/* Speaking state display / Speak action */}
                      <button
                        onClick={() => handlePronounce(phObj)}
                        className={`p-3 rounded-xl cursor-pointer transition-all shrink-0 ${
                          isCurSpeaking
                            ? 'bg-heritage-terracotta text-white active-equalizer'
                            : darkMode
                              ? 'bg-white/5 hover:bg-white/10 hover:text-heritage-gold text-gray-300'
                              : 'bg-heritage-clay/10 hover:bg-heritage-terracotta hover:text-white text-heritage-clay'
                        }`}
                        title="Pronounce Word"
                      >
                        {isCurSpeaking ? (
                          <div className="flex items-center gap-1 justify-center py-1">
                            {/* Animated equalising dots representing vocal audio stream */}
                            <span className="w-1 bg-white h-3 rounded animate-bounce inline-block" style={{ animationDelay: '0s' }} />
                            <span className="w-1 bg-white h-4 rounded animate-bounce inline-block" style={{ animationDelay: '0.15s' }} />
                            <span className="w-1 bg-white h-2 rounded animate-bounce inline-block" style={{ animationDelay: '0.3s' }} />
                          </div>
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Warning text box */}
              <div className="mt-6 flex items-start gap-2.5 p-3 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-sans">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-normal">
                  The audio synthesis system uses standard client-side browser speech engines. For optimal performance, ensure your operating system has high-quality English/Spanish/Hindi voices pre-loaded.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
