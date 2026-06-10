import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, Check, X, ArrowRight, ShieldCheck, HelpCircle, Star, Sparkles } from 'lucide-react';

interface Props {
  darkMode: boolean;
}

export default function EducationalResources({ darkMode }: Props) {
  const [activeArticle, setActiveArticle] = useState<number>(0);

  // Trivia states
  const [curQuestion, setCurQuestion] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [answersChecked, setAnswersChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const articles = [
    {
      title: 'Monument Stewardship: The Ethical Guideline',
      author: 'Dr. Evelyn Martinez, World Heritage Trust',
      readTime: '4 min read',
      excerpt: 'Mass tourism introduces severe kinetic stress on historical masonry. Modern smart stewardship outlines protocols to guide visitor patterns and mitigate wear.',
      content: 'Every footstep within an ancient chamber introduces micro-vibrations, dust layers, and atmospheric humidity shifts. In Hampi or the Taj Mahal, environmental moisture reacts with classical stone stucco, potentially causing microscopic erosion over decades. Smart Tourism approaches resolve this coordinate crisis by utilizing Bluetooth beacons to stagger tourist entrances. Furthermore, eco-friendly pathways, geofencing guidelines, and digital double archives guarantee that fragile chambers are protected from excessive kinetic contact.'
    },
    {
      title: 'Constructing Digital Doubles: Laser-Scans & Clones',
      author: 'Prof. Rajeev Sharma, Digital Preservation lab',
      readTime: '6 min read',
      excerpt: 'How terrestrial LiDAR scanning and orthographic drone systems reconstruct ancient brick structures down to sub-millimeter precision.',
      content: 'Terrestrial LiDAR scanner networks transmit millions of pulsing laser waves per second to map historic scaffolds inside an absolute 3D coordinate point cloud directory. When coupled with high-resolution orthographic photography, computers compile a pixel-perfect "digital double" or virtual model of the monument. In Kyoto or Giza, these high-fidelity coordinates monitor physical shifting or stone cracking in absolute real time. If environmental wear occurs, engineers possess precise structural blue-prints to coordinate historic stone restoration with zero architectural discrepancy.'
    }
  ];

  const triviaQuestions = [
    {
      q: "Which Indian heritage site houses the Vittala Temple's famous resonant 'musical pillars'?",
      options: ["The Ruins of Hampi", "The Taj Mahal Dome", "Ajanta Cave Chambers", "The Sun Temple of Konark"],
      correct: 0,
      tip: "Hampi's 56 pillared arches resonate distinct classical musical notes when gently tapped by historians!"
    },
    {
      q: "What architectural engineering methodology allows Inca structures like Machu Picchu to survive severe earthquakes?",
      options: ["Iron reinforced mortar layers", "Dry-stone Ashlar joinery", "Subterranean hydraulic pillars", "Flexible bamboo scaffolding"],
      correct: 1,
      tip: "Ashlar dry-stone joinery fits rocks perfectly without mortar, allowing them to shift safely during seismic tremors!"
    },
    {
      q: "What role does LiDAR technology play in modern heritage preservation?",
      options: ["Carbon dating fossilized ruins", "Creating 3D digital double grids", "Synthesizing vocal translations", "Eradicating fungal stone decay"],
      correct: 1,
      tip: "LiDAR uses millions of laser pulses to compile pixel-perfect 3D point cloud coordinate models of fragile monuments."
    }
  ];

  const handleSelectAnswer = (idx: number) => {
    if (answersChecked) return;
    setSelectedAns(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedAns === null || answersChecked) return;
    setAnswersChecked(true);
    
    // Add score
    if (selectedAns === triviaQuestions[curQuestion].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAns(null);
    setAnswersChecked(false);

    if (curQuestion + 1 < triviaQuestions.length) {
      setCurQuestion((q) => q + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurQuestion(0);
    setSelectedAns(null);
    setAnswersChecked(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section id="resources" className={`py-20 sm:py-28 transition-colors duration-300 ${
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
            STUWARDSHIP & LITERACY
          </motion.div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
            Educational Resources & <span className="text-heritage-terracotta">Preservation Literacy</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Read comprehensive articles authored by leading world conservators and challenge your cultural literacy with our interactive quiz.
          </p>
        </div>

        {/* Split Articles & Interactive quiz */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Articles Board (Left Column - Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pl-1">Heritage Preservation Whitepapers</h3>
            
            {/* Horizontal switch tabs */}
            <div className="flex gap-2">
              {articles.map((art, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveArticle(idx)}
                  className={`px-3.5 py-1.5 cursor-pointer rounded-lg text-xs font-medium font-sans border transition-all ${
                    idx === activeArticle
                      ? darkMode
                        ? 'bg-heritage-gold text-dark-charcoal border-heritage-gold font-bold'
                        : 'bg-heritage-terracotta text-white border-heritage-terracotta font-bold'
                      : 'bg-transparent text-gray-400 border-gray-300 dark:border-white/10'
                  }`}
                >
                  Paper {idx + 1}
                </button>
              ))}
            </div>

            {/* Read board card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArticle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 sm:p-8 bento-grid-item"
              >
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono text-gray-400">
                  <span>{articles[activeArticle].author}</span>
                  <span>{articles[activeArticle].readTime}</span>
                </div>

                <h4 className="font-display font-bold text-lg sm:text-xl text-gray-900 dark:text-white mb-3">
                  {articles[activeArticle].title}
                </h4>
                <p className="text-sm text-heritage-terracotta dark:text-heritage-gold italic mb-6">
                  "{articles[activeArticle].excerpt}"
                </p>

                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                  {articles[activeArticle].content}
                </p>

                <div className="flex gap-2 items-center text-xs font-mono text-heritage-terracotta dark:text-heritage-gold mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified by Smart Stewardship Protocols</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Quiz board (Right Column - Span 5) */}
          <div className="lg:col-span-12 xl:col-span-5">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest pl-1 mb-6">Cultural Literacy Simulator</h3>

            <div className="p-6 sm:p-8 bento-grid-item">
              
              <AnimatePresence mode="wait">
                {!quizFinished ? (
                  <motion.div
                    key={curQuestion}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    {/* Progress tracking */}
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                      <span>CHALLENGE: {curQuestion + 1} OF {triviaQuestions.length}</span>
                      <span>SCORE: {score}</span>
                    </div>

                    {/* Question text */}
                    <h4 className="font-display font-bold text-sm sm:text-base leading-snug">
                      {triviaQuestions[curQuestion].q}
                    </h4>

                    {/* Options list */}
                    <div className="space-y-3">
                      {triviaQuestions[curQuestion].options.map((opt, oIdx) => {
                        const isSelected = oIdx === selectedAns;
                        const isCorrectOption = oIdx === triviaQuestions[curQuestion].correct;
                        
                        let optStyle = darkMode 
                          ? 'bg-black/20 border-white/5 hover:border-white/10' 
                          : 'bg-white border-heritage-clay/10 hover:border-heritage-clay/20';

                        if (isSelected && !answersChecked) {
                          optStyle = 'border-heritage-terracotta bg-heritage-terracotta/5 text-heritage-terracotta';
                        } else if (answersChecked) {
                          if (isCorrectOption) {
                            optStyle = 'border-green-600 bg-green-500/10 text-green-600 font-semibold';
                          } else if (isSelected) {
                            optStyle = 'border-red-500 bg-red-500/10 text-red-500';
                          } else {
                            optStyle = 'opacity-50 border-gray-200 dark:border-white/5 text-gray-400';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectAnswer(oIdx)}
                            disabled={answersChecked}
                            className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm font-sans block cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {answersChecked && isCorrectOption && <Check className="w-4 h-4 text-green-600 shrink-0" />}
                            {answersChecked && isSelected && !isCorrectOption && <X className="w-4 h-4 text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer results tips & explanation */}
                    {answersChecked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-3.5 rounded-lg bg-heritage-gold/5 border border-heritage-gold/20 text-xs font-sans text-gray-600 dark:text-gray-300 leading-normal"
                      >
                        <span className="font-mono text-[9px] text-orange-400 font-bold block mb-1">CULTURAL CHRONOS TIP:</span>
                        {triviaQuestions[curQuestion].tip}
                      </motion.div>
                    )}

                    {/* Action button */}
                    <div className="pt-4 border-t border-gray-200 dark:border-white/5 flex gap-2">
                      {!answersChecked ? (
                        <button
                          onClick={handleCheckAnswer}
                          disabled={selectedAns === null}
                          className={`w-full py-3 cursor-pointer rounded-xl font-mono text-xs font-semibold tracking-wider text-center uppercase transition-all ${
                            selectedAns !== null
                              ? 'bg-heritage-terracotta text-white hover:bg-heritage-clay shadow'
                              : 'bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          SUBMIT ANSWER
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="w-full py-3 bg-heritage-terracotta hover:bg-heritage-clay text-white font-mono text-xs font-semibold tracking-wider text-center uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <span>CONTINUE TRIAL</span>
                          <ArrowRight className="w-4 h-4 animate-pulse" />
                        </button>
                      )}
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="results-pane"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-heritage-gold/10 text-heritage-gold border border-heritage-gold/25 flex items-center justify-center">
                      <Award className="w-8 h-8" />
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-lg">Challenge Accomplished!</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">Your Cultural Literacy Score is loaded below:</p>
                    </div>

                    <div className="inline-block p-6 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-4xl font-display font-bold text-heritage-terracotta">{score} / {triviaQuestions.length}</span>
                      <p className="text-[10px] font-mono text-gray-400 mt-2">
                        {score === triviaQuestions.length ? '⭐ PERFECT CHRONICLER STAGE ⭐' : 'EXCELLENT HISTORIAN ENTHUSIAST'}
                      </p>
                    </div>

                    <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-sm mx-auto">
                      Stewardship is continuous learning. By visiting heritage sites with smart credentials, you actively fund organic conservation projects and help regional languages thrive.
                    </p>

                    <button
                      onClick={handleResetQuiz}
                      className="px-6 py-3 bg-heritage-terracotta hover:bg-heritage-clay text-white font-mono text-xs font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      RESET LITERACY TRIAL
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
