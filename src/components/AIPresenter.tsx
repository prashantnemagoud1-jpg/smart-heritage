import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Cpu, Calendar, Star, Compass, HelpCircle, ArrowRight, User, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface Props {
  darkMode: boolean;
}

export default function AIPresenter({ darkMode }: Props) {
  const [activePane, setActivePane] = useState<'chat' | 'itinerary' | 'faq'>('chat');

  // AI Chat states
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Greetings! I am **Aethelgard**, your AI Cultural Heritage Curator. Ask me about historical architecture, native languages, folk music origins, or plan custom sustainable tourist corridors across famous global sights!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Itinerary states
  const [itinerarySite, setItinerarySite] = useState<string>('Taj Mahal, India');
  const [itineraryDays, setItineraryDays] = useState<number>(3);
  const [itineraryStyle, setItineraryStyle] = useState<string>('historical');
  const [generatedItinerary, setGeneratedItinerary] = useState<any | null>(null);
  const [isItineraryLoading, setIsItineraryLoading] = useState<boolean>(false);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatLoading]);

  // Handle instant chat templates
  const handleTriggerTemplate = (text: string) => {
    if (isChatLoading) return;
    handleSendMessage(null, text);
  };

  const handleSendMessage = async (e: React.FormEvent | null, forcedText?: string) => {
    e?.preventDefault();
    const promptToSend = forcedText || chatInput;
    if (!promptToSend.trim()) return;

    // Reset input
    if (!forcedText) setChatInput('');

    // Append user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatHistory, userMessage] })
      });

      if (!response.ok) {
        throw new Error('Connection to heritage core failed.');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, my communication conduits encountered a solar flare. Please retry, and verify your Gemini key is configured inside AI Studio secrets if you are attempting live cross-network analytics.",
          timestamp: new Date().toLocaleTimeString([])
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle itinerary generation
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsItineraryLoading(true);
    setGeneratedItinerary(null);

    try {
      const response = await fetch('/api/itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: itinerarySite,
          durationDays: itineraryDays,
          travelerStyle: itineraryStyle
        })
      });

      if (!response.ok) {
        throw new Error('Failed to plan coordinates.');
      }

      const lData = await response.json();
      setGeneratedItinerary(lData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsItineraryLoading(false);
    }
  };

  const faqs = [
    {
      q: "What is 'Smart Tourism' compared to traditional exploration?",
      a: "Smart Tourism integrates internet networks, cloud-delivered artificial intelligence, and mobile sensor overlays to provide high-fidelity, customized context. It aims to eliminate translation barriers and preserve structures digitally while minimizing physical tourism wear and tear."
    },
    {
      q: "How does technology help preserve delicate heritage assets?",
      a: "By constructing remote 3D digital records, scanning ruins for structural fractures, and recording oral language audio streams. This safeguards complex historical profiles from physical weather, natural disasters, or lost knowledge."
    },
    {
      q: "Can I use the AI assistant to translate historical texts?",
      a: "Yes! You can ask our dynamic chatbot Aethelgard to decode or explain classical phrases, identify structural terms, or provide cultural etiquette guidelines before entering fragile regional monuments."
    }
  ];

  return (
    <section id="ai-assistant" className={`py-20 sm:py-28 border-t transition-colors duration-300 ${
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
            VIRTUAL INTELLIGENCE
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            AI Assistant & <span className="text-heritage-terracotta">Custom Itinerary Core</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Converse directly with a server-side historical guide or parameterize immediate customized daily routes matching your exact holiday schedules.
          </p>
        </div>

        {/* Triple Tab controller */}
        <div className="flex border-b border-gray-200 dark:border-white/5 justify-center gap-4 sm:gap-8 mb-12">
          <button
            onClick={() => setActivePane('chat')}
            className={`pb-4 px-4 text-xs sm:text-sm cursor-pointer font-mono font-medium tracking-wider relative uppercase flex items-center gap-1.5 ${
              activePane === 'chat'
                ? 'text-heritage-terracotta font-bold'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Guide Chat</span>
            {activePane === 'chat' && <motion.div layoutId="assistant-line" className="absolute bottom-0 left-0 w-full h-0.5 bg-heritage-terracotta" />}
          </button>

          <button
            onClick={() => setActivePane('itinerary')}
            className={`pb-4 px-4 text-xs sm:text-sm cursor-pointer font-mono font-medium tracking-wider relative uppercase flex items-center gap-1.5 ${
              activePane === 'itinerary'
                ? 'text-heritage-terracotta font-bold'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Smart Planner</span>
            {activePane === 'itinerary' && <motion.div layoutId="assistant-line" className="absolute bottom-0 left-0 w-full h-0.5 bg-heritage-terracotta" />}
          </button>

          <button
            onClick={() => setActivePane('faq')}
            className={`pb-4 px-4 text-xs sm:text-sm cursor-pointer font-mono font-medium tracking-wider relative uppercase flex items-center gap-1.5 ${
              activePane === 'faq'
                ? 'text-heritage-terracotta font-bold'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Heritage FAQs</span>
            {activePane === 'faq' && <motion.div layoutId="assistant-line" className="absolute bottom-0 left-0 w-full h-0.5 bg-heritage-terracotta" />}
          </button>
        </div>

        {/* Panel Viewports rendering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Display Pane (Left Column - Span 8) */}
          <div className="lg:col-span-12 xl:col-span-8 flex flex-col justify-between">
            <div className="p-6 sm:p-8 bento-grid-item flex-1 flex flex-col justify-between relative min-h-[500px]">
              
              <AnimatePresence mode="wait">
                {/* 1. Chat Interface */}
                {activePane === 'chat' && (
                  <motion.div
                    key="chat-pane"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col justify-between h-full flex-1"
                  >
                    {/* Chat messages rail */}
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[360px] mb-6">
                      {chatHistory.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3.5 max-w-xl ${
                            msg.role === 'user' ? 'ml-auto flex-row-reverse text-right' : ''
                          }`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${
                            msg.role === 'user'
                              ? 'bg-heritage-terracotta text-white'
                              : 'bg-heritage-gold/10 text-heritage-gold border border-heritage-gold/20'
                          }`}>
                            {msg.role === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className={`p-4 rounded-2xl text-xs sm:text-sm text-left leading-relaxed font-sans ${
                              msg.role === 'user'
                                ? 'bg-heritage-terracotta text-white rounded-tr-none'
                                : darkMode
                                  ? 'bg-dark-surface/80 border border-white/5 text-gray-200 rounded-tl-none'
                                  : 'bg-white border border-heritage-clay/10 text-gray-800 rounded-tl-none'
                            }`}>
                              {/* Quick, clean custom markdown translator for bold text inside chat displays */}
                              {msg.content.split('**').map((chunk, index) => 
                                index % 2 === 1 ? <strong key={index} className="text-heritage-terracotta dark:text-heritage-gold">{chunk}</strong> : chunk
                              )}
                            </div>
                            <span className="text-[9px] font-mono text-gray-400 mt-1 block px-1">{msg.timestamp}</span>
                          </div>
                        </div>
                      ))}

                      {/* Chatting loader */}
                      {isChatLoading && (
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-xl bg-heritage-gold/10 text-heritage-gold shrink-0 border border-heritage-gold/20">
                            <Cpu className="w-4 h-4 animate-spin-slow" />
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-heritage-terracotta rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <span className="w-1.5 h-1.5 bg-heritage-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                            <span className="w-1.5 h-1.5 bg-heritage-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input form */}
                    <form onSubmit={(e) => handleSendMessage(e)} className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask Aethelgard about any ancient custom or monument..."
                        className={`flex-1 px-4 py-3.5 rounded-xl text-sm font-sans border outline-none focus:ring-1 focus:ring-heritage-terracotta ${
                          darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                        }`}
                      />
                      <button
                        type="submit"
                        className={`p-3.5 rounded-xl text-white cursor-pointer transition-colors ${
                          darkMode ? 'bg-heritage-gold text-dark-charcoal hover:bg-amber-400' : 'bg-heritage-terracotta hover:bg-heritage-clay'
                        }`}
                        title="Send message"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 2. Itinerary Display */}
                {activePane === 'itinerary' && (
                  <motion.div
                    key="itinerary-pane"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col justify-between h-full flex-1"
                  >
                    {isItineraryLoading ? (
                      <div className="flex-1 flex flex-col items-center justify-center py-12 text-center text-xs font-mono text-gray-400">
                        <Compass className="w-12 h-12 text-heritage-terracotta animate-spin mb-4" />
                        <p>CALIBRATING HERITAGE ARCHIVES & ROUTING GEOMETRY...</p>
                        <p className="text-[10px] mt-1 text-gray-500">Retrieving optimized solar solstices & eco trails from server clouds</p>
                      </div>
                    ) : generatedItinerary ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 flex-1 overflow-y-auto max-h-[400px] pr-2"
                      >
                        <div className="flex items-center justify-between border-b pb-3 border-gray-200 dark:border-white/5">
                          <div>
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest block">PLANNER TERMINAL LOADED</span>
                            <h4 className="font-display font-bold text-lg text-heritage-terracotta">{generatedItinerary.destination}</h4>
                          </div>
                          {generatedItinerary.simulated && (
                            <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-orange-400/10 text-orange-400 font-bold">LOCAL FALLBACK ARCHIVE</span>
                          )}
                        </div>

                        {/* Day timeline tracks */}
                        <div className="space-y-6">
                          {generatedItinerary.days.map((day: any) => (
                            <div key={day.dayNumber} className="relative pl-6 border-l-2 border-heritage-terracotta/20 space-y-2">
                              {/* Bullet node */}
                              <div className="absolute -left-2 top-0.5 w-3.5 h-3.5 rounded-full bg-heritage-terracotta border-4 border-white dark:border-dark-surface" />
                              
                              <h5 className="font-display font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
                                Day {day.dayNumber}: {day.title}
                              </h5>
                              <ul className="space-y-2">
                                {day.activities.map((act: string, idx: number) => (
                                  <li key={idx} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex gap-2 items-start font-sans">
                                    <span className="text-heritage-gold mt-1 shrink-0">•</span>
                                    <span>{act}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Custom Smart preservation tips */}
                        <div className="p-4 rounded-xl bg-heritage-gold/5 border border-heritage-gold/20">
                          <span className="font-mono text-[9px] text-orange-400 block mb-2 font-bold uppercase tracking-wider">ECO-STEWARDSHIP TRAVEL TIPS</span>
                          <div className="space-y-1.5">
                            {generatedItinerary.smartTips.map((tip: string, idx: number) => (
                              <p key={idx} className="text-xs text-gray-600 dark:text-gray-300 font-sans flex items-start gap-1.5 leading-snug">
                                <Sparkles className="w-3 h-3 text-heritage-gold shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </p>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => setGeneratedItinerary(null)}
                          className="px-4 py-2 font-mono text-[10px] uppercase rounded hover:bg-heritage-terracotta hover:text-white transition-colors bg-heritage-terracotta/10 text-heritage-terracotta cursor-pointer"
                        >
                          PLAN ANOTHER HOLIDAY
                        </button>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col justify-center items-center py-12 text-center text-xs text-gray-400 italic">
                        <Compass className="w-12 h-12 stroke-[1.2] text-gray-400 mb-2" />
                        <p>Fill out the Smart Planner controls on the right panel to compute a customized cultural travel itinerary instantly.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 3. FAQ directory */}
                {activePane === 'faq' && (
                  <motion.div
                    key="faq-pane"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-4 overflow-y-auto max-h-[420px] flex-1 pr-1"
                  >
                    {faqs.map((f, id) => (
                      <div
                        key={id}
                        className={`p-5 rounded-2xl border ${
                          darkMode ? 'bg-dark-surface border-white/5' : 'bg-white border-heritage-clay/10'
                        }`}
                      >
                        <h4 className="font-display font-semibold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                          <HelpCircle className="w-4 h-4 text-heritage-terracotta" />
                          {f.q}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                          {f.a}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Side Control panel (Right Column - Span 4) */}
          <div className="lg:col-span-12 xl:col-span-4 flex flex-col justify-between">
            <div className="p-6 sm:p-8 bento-grid-item h-full flex flex-col justify-between">
              
              {/* Context-sensitive controls depending on active selection */}
              <div>
                {activePane === 'chat' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-base mb-1">Instant Chat Queries</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                        Tap any query template below to instantly request our AI curator's deep historical analysis:
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        'What are Hampi\'s musical pillars?',
                        'How was the Taj Mahal designed?',
                        'What is the meaning behind Sanskrit Namaste?',
                        'Briefly explain Roman engineering vaults'
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleTriggerTemplate(item)}
                          disabled={isChatLoading}
                          className={`w-full p-3 text-left rounded-xl border text-xs font-sans transition-all block cursor-pointer truncate ${
                            darkMode
                              ? 'bg-white/5 border-white/5 hover:border-heritage-gold/25 text-gray-300'
                              : 'bg-white border-heritage-clay/10 hover:border-heritage-terracotta/25 text-gray-700'
                          }`}
                        >
                          <span className="text-heritage-terracotta font-mono font-bold mr-1.5">Q{idx + 1}.</span>
                          {item}
                        </button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-orange-400/5 border border-orange-400/10 text-[10px] font-sans text-orange-400/80 leading-normal flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Note: Gemini 3.5-flash responses require a live secret key configuration inside your applet's Settings secrets panel to run dynamically.</span>
                    </div>
                  </div>
                )}

                {activePane === 'itinerary' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-display font-bold text-base mb-1">Planner Console</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed mb-4">
                        Set custom parameters to query our AI tour generator endpoint on the spot:
                      </p>
                    </div>

                    <form onSubmit={handleGenerateItinerary} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">MONUMENT SIGHT</label>
                        <input
                          type="text"
                          value={itinerarySite}
                          onChange={(e) => setItinerarySite(e.target.value)}
                          placeholder="e.g. Taj Mahal / Kyoto temples..."
                          className={`w-full p-2.5 rounded-lg text-xs font-sans border outline-none ${
                            darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">DURATION (DAYS)</label>
                        <select
                          value={itineraryDays}
                          onChange={(e) => setItineraryDays(Number(e.target.value))}
                          className={`w-full p-2.5 rounded-lg text-xs font-sans border outline-none ${
                            darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                          }`}
                        >
                          {[1, 2, 3, 4, 5, 7].map((d) => (
                            <option key={d} value={d}>{d} Day Holiday</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">TRAVELER STYLE</label>
                        <select
                          value={itineraryStyle}
                          onChange={(e) => setItineraryStyle(e.target.value)}
                          className={`w-full p-2.5 rounded-lg text-xs font-sans border outline-none ${
                            darkMode ? 'bg-black/30 border-white/10 text-white' : 'bg-white border-heritage-clay/20 text-gray-800'
                          }`}
                        >
                          <option value="historical">Scholarly & Historical-focused</option>
                          <option value="eco">Family & Sustainable Eco-tourism</option>
                          <option value="adventure">Cozy Backpacking & Trails</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isItineraryLoading}
                        className={`w-full py-3 cursor-pointer rounded-lg text-[10px] font-mono font-bold tracking-widest text-center uppercase shadow ${
                          darkMode ? 'bg-heritage-gold text-dark-charcoal hover:bg-amber-400' : 'bg-heritage-terracotta hover:bg-heritage-clay text-white'
                        }`}
                      >
                        GENERATE ROUTE LIST
                      </button>
                    </form>
                  </div>
                )}

                {activePane === 'faq' && (
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-base">Reference Materials</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                      Need further documentation on our computational preservation? Stroll down to our **Educational Resources** section to browse detailed preservation whitepapers and try our trivia assessment blocks!
                    </p>
                    <a
                      href="#resources"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-heritage-terracotta font-semibold hover:underline mt-2"
                    >
                      <span>Jump to resources</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Console status footer */}
              <div className="mt-8 border-t border-gray-200 dark:border-white/5 pt-4 text-center">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest leading-none block">
                  TERMINAL SYSTEM: ACTIVE
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
