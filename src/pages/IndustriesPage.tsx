import React, { useState } from 'react';
import { PageView, Industry } from '../types';
import { INITIAL_INDUSTRIES } from '../data/initialData';
import {
  Landmark,
  Radio,
  ShoppingBag,
  HeartPulse,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (page: PageView) => void;
  onSelectIndustryForQuote?: (industryId: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onNavigate,
  onSelectIndustryForQuote,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(INITIAL_INDUSTRIES[0].id);

  const iconMap: Record<string, React.ReactNode> = {
    Landmark: <Landmark className="w-5 h-5 text-blue-500" />,
    Radio: <Radio className="w-5 h-5 text-blue-500" />,
    ShoppingBag: <ShoppingBag className="w-5 h-5 text-blue-500" />,
    HeartPulse: <HeartPulse className="w-5 h-5 text-blue-500" />,
    Building2: <Building2 className="w-5 h-5 text-blue-500" />,
  };

  const activeInd = INITIAL_INDUSTRIES.find((i) => i.id === selectedIndustry) || INITIAL_INDUSTRIES[0];

  return (
    <div className="space-y-24 py-12 md:py-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded">
            <span>SECTOR EXPERTISE</span>
            <span>·</span>
            <span>SYSTEMS LIMITED BENCHMARK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Transforming mission-critical industries with next-generation digital architecture.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            We partner with sovereign governments, tier-1 financial institutions, global telecommunication operators, and retail giants to build resilient, compliant, and cloud-native digital ecosystems.
          </p>
        </div>
      </section>

      {/* Main Sector Selector & Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Bar */}
          <div className="lg:col-span-4 space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2 font-mono">
              Key Verticals
            </p>
            {INITIAL_INDUSTRIES.map((ind, idx) => {
              const isSelected = ind.id === activeInd.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {iconMap[ind.icon] || <Cpu className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{ind.title}</h3>
                      <p className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                        {ind.tagline}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Showcase */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            
            {/* Visual Header */}
            <div className="aspect-21/9 w-full relative bg-slate-900 overflow-hidden">
              <img
                src={activeInd.imageUrl}
                alt={activeInd.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
                  {activeInd.tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold">{activeInd.title}</h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 sm:p-10 space-y-8">
              
              {/* Executive Overview */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                  Industry Overview & Strategic Value
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeInd.description}
                </p>
              </div>

              {/* Quantified Impact Metrics */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 font-mono">
                  Demonstrated Industry Benchmarks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeInd.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3"
                    >
                      <TrendingUp className="w-5 h-5 text-blue-600 shrink-0" />
                      <div className="text-xs font-bold text-slate-900">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Capabilities */}
              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 font-mono">
                  Enterprise Capabilities & Solutions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeInd.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Architecture Handshake */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CMMI Level 5, ISO 27001, and SOC 2 Type II Aligned Solutions</span>
                </div>

                <button
                  onClick={() => {
                    if (onSelectIndustryForQuote) onSelectIndustryForQuote(activeInd.id);
                    onNavigate('contact');
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Consult with {activeInd.title} Architects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Global Sector Presence Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">
              Do you operate in a regulated or high-concurrency vertical?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our industry principals have spearheaded core migrations for central banks, telecom carriers, and sovereign healthcare ecosystems across 16+ countries.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Request Sector Briefing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
