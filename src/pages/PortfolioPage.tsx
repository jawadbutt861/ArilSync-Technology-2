import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView, PortfolioProject } from '../types';
import { ArrowRight, ExternalLink, X, CheckCircle2, TrendingUp, Layers, Code, Sparkles } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { MagneticButton } from '../components/MagneticButton';

interface PortfolioPageProps {
  portfolio: PortfolioProject[];
  onNavigate: (page: PageView) => void;
  selectedCaseStudy?: PortfolioProject | null;
  onCloseCaseStudy?: () => void;
  onOpenCaseStudy: (project: PortfolioProject) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  portfolio,
  onNavigate,
  selectedCaseStudy,
  onCloseCaseStudy,
  onOpenCaseStudy,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Web Development',
    'Mobile Apps',
    'AI & Machine Learning',
    'UI/UX & Design Systems',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="space-y-16 py-12 md:py-16 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Production software engineered for impact and scale.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Every project listed here is in live production, handling real concurrent workloads, compliance requirements, and commercial transaction volumes.
          </p>
        </motion.div>

        {/* Category Filters with Animated Indicators */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-slate-200">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid with 3D Tilt Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard
                  maxTilt={6}
                  scale={1.02}
                  onClick={() => onOpenCaseStudy(project)}
                  className="h-full group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-16/10 w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {project.metric && (
                        <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md border border-slate-800 translate-z-20">
                          <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                          <span>{project.metric}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 sm:p-8 space-y-3">
                      <div className="text-xs font-medium text-slate-500">
                        <span>{project.client}</span>
                        <span className="mx-2">·</span>
                        <span>{project.category}</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-500">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 bg-slate-100 rounded-md text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0 ml-2">
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Case Study Detail Modal with 3D Pop & Backdrop Blur */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full my-8 overflow-hidden relative"
            >
              {/* Modal Close Button */}
              <button
                onClick={onCloseCaseStudy}
                className="absolute top-4 right-4 z-20 p-2 text-slate-700 bg-white/90 hover:bg-white rounded-full shadow-md transition-all cursor-pointer hover:scale-105"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image */}
              <div className="aspect-16/9 w-full bg-slate-900 relative overflow-hidden">
                <img
                  src={selectedCaseStudy.imageUrl}
                  alt={selectedCaseStudy.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono">
                    {selectedCaseStudy.client} · {selectedCaseStudy.category}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                    {selectedCaseStudy.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Highlight Metric */}
                {selectedCaseStudy.metric && (
                  <div className="p-4 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center justify-between shadow-2xs">
                    <div>
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        Quantified Business Result
                      </div>
                      <div className="text-2xl font-extrabold text-blue-950 tabular-nums">
                        {selectedCaseStudy.metric}
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/25">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                )}

                {/* Challenge & Solution */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                      The Engineering Challenge
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedCaseStudy.challenge ||
                        'The client struggled with system bottlenecks, high latency under volatility, and legacy architectural limitations.'}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                      Arilsync’s Architectural Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedCaseStudy.solution ||
                        'We re-architected the application stack from the ground up, utilizing sub-second reactive state pipelines, containerized deployment, and strict type safety.'}
                    </p>
                  </div>
                </div>

                {/* Stack Used */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                    Architecture & Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-mono rounded-lg border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Modal Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Want similar technical results for your company?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onCloseCaseStudy}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                  <MagneticButton
                    onClick={() => {
                      if (onCloseCaseStudy) onCloseCaseStudy();
                      onNavigate('contact');
                    }}
                    className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Conversion Banner with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={3}
          scale={1.01}
          className="p-8 sm:p-10 bg-slate-100/90 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900">
              Need custom technical specifications for your roadmap?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              We provide free initial architectural reviews for qualified engineering projects.
            </p>
          </div>
          <MagneticButton
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Request Architectural Review</span>
          </MagneticButton>
        </TiltCard>
      </section>

    </div>
  );
};
