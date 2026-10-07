import React, { useState } from 'react';
import { PageView, InsightArticle } from '../types';
import { INSIGHTS_ARTICLES, AWARDS_RECOGNITION } from '../data/initialData';
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  Sparkles,
  Search,
  ExternalLink,
} from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (page: PageView) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Banking & Financial',
    'AI & Data Intelligence',
    'Telecommunications',
    'Retail & CPG',
  ];

  const filtered = INSIGHTS_ARTICLES.filter((article) => {
    const matchesCat = activeCategory === 'All' || article.category === activeCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-24 py-12 md:py-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded">
            <span>THOUGHT LEADERSHIP</span>
            <span>·</span>
            <span>RESEARCH & EXECUTIVE BRIEFINGS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Insights on engineering the digital tomorrow.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Architectural perspectives, technical whitepapers, and operational frameworks from Arilsync Systems’ Chief Architects and practice leaders.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search research & papers..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Featured Insights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.readTime}
                    </span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{item.author}</div>
                  <div className="text-[11px] text-slate-500">{item.authorRole}</div>
                </div>

                <button
                  onClick={() => onNavigate('contact')}
                  className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Full Whitepaper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Awards & Global Accreditations Bar (Systems Limited Style) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-2">
              ACCREDITATIONS & DISTINCTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Global Recognition & Operational Maturity
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Recognized worldwide for software engineering maturity, governance standards, and enterprise delivery excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AWARDS_RECOGNITION.map((award, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800 border border-slate-700 rounded-xl space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{award.title}</h4>
                <div className="text-xs font-mono text-blue-400">{award.awarder} · {award.year}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{award.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
