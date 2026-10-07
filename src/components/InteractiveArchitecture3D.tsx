import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Shield, Cpu, Database, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface LayerData {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  latency: string;
  summary: string;
  tech: string[];
  specs: string[];
  color: string;
  accentBorder: string;
}

export const InteractiveArchitecture3D: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-ai');

  const layers: LayerData[] = [
    {
      id: 'layer-client',
      name: 'Client Edge & Next.js 15 SSR',
      category: 'Layer 01 · Presentation & Interaction',
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      latency: '< 75ms TTFB',
      summary: 'Edge-distributed static generation, streaming server-side hydration, and ultra-fluid gesture micro-interactions.',
      tech: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Vite', 'Web Workers'],
      specs: [
        'Automatic Core Web Vitals optimization (100% Lighthouse score)',
        'Edge middleware routing with sub-50ms geolocation geo-caching',
        'Strict zero-layout-shift (CLS < 0.01) tokenized design system',
      ],
      color: 'from-blue-900/60 to-slate-900/80',
      accentBorder: 'border-blue-500/60',
    },
    {
      id: 'layer-gateway',
      name: 'Event-Driven Gateway & Guardrails',
      category: 'Layer 02 · Security & Orchestration',
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      latency: '< 18ms SLA',
      summary: 'Hardened OAuth2/SAML identity brokering, distributed token-bucket rate limiting, and SOC2 audit-ready telemetry.',
      tech: ['TypeScript', 'Express', 'Redis', 'JWT/JWKS', 'Docker'],
      specs: [
        'Strict role-based access control (RBAC) with granular claims',
        'DDoS packet inspection & automated burst rate throttling',
        'Encrypted zero-trust payload validation with Zod schemas',
      ],
      color: 'from-emerald-950/60 to-slate-900/80',
      accentBorder: 'border-emerald-500/60',
    },
    {
      id: 'layer-ai',
      name: 'Autonomous AI & Vector RAG Pipeline',
      category: 'Layer 03 · Intelligence & Automation',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      latency: '< 1.2s Generation',
      summary: 'Large language model inference orchestration, Pinecone/pgvector semantic retrieval, and strict JSON tool calling guardrails.',
      tech: ['Gemini 2.5 API', 'LangChain', 'Python FastAPI', 'Vector DB', 'RAG'],
      specs: [
        'Real-time semantic vector search over enterprise documents',
        'Deterministic JSON-schema enforcement with hallucination filters',
        'Cost-governed multi-tier prompt token caching and fallback retry',
      ],
      color: 'from-cyan-950/60 to-slate-900/80',
      accentBorder: 'border-cyan-500/60',
    },
    {
      id: 'layer-data',
      name: 'Distributed Cloud Database Cluster',
      category: 'Layer 04 · High-Concurrency Persistence',
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      latency: '99.99% Availability',
      summary: 'ACID-compliant relational PostgreSQL data tier coupled with real-time Firebase Firestore synchronization channels.',
      tech: ['PostgreSQL', 'Cloud Firestore', 'Prisma/Drizzle', 'Kubernetes'],
      specs: [
        'Read replica load distribution with automated failover routing',
        'Point-in-time recovery (PITR) with continuous snapshot backup',
        'Multi-region write consistency and automated schema migrations',
      ],
      color: 'from-indigo-950/60 to-slate-900/80',
      accentBorder: 'border-indigo-500/60',
    },
  ];

  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[2];

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
      
      {/* Background Cyber Grid */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-40" />
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10 max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Architectural Topology</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          3D System Layer Decomposition
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Hover or select any architectural tier to inspect its latency benchmarks, runtime stack, and operational guarantees.
        </p>
      </div>

      {/* Grid: 3D Stack on Left, Live Spec Inspector on Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: 3D Isometric Layer Cards */}
        <div className="lg:col-span-6 space-y-3 perspective-1000">
          {layers.map((layer, index) => {
            const isActive = activeLayerId === layer.id;
            return (
              <motion.div
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden preserve-3d ${
                  isActive
                    ? `bg-slate-900/90 ${layer.accentBorder} shadow-lg ring-1 ring-blue-500/30`
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
                style={{
                  transform: isActive
                    ? 'translateZ(25px)'
                    : 'translateZ(0px)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                        isActive
                          ? 'bg-blue-600/20 border-blue-500/50'
                          : 'bg-slate-800 border-slate-700'
                      }`}
                    >
                      {layer.icon}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {layer.category}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {layer.name}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      {layer.latency}
                    </span>
                  </div>
                </div>

                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeArchitectureIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Layer Spec Inspector Panel */}
        <div className="lg:col-span-6 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-800 pb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                    {activeLayer.category}
                  </span>
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{activeLayer.name}</span>
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">P99 Benchmark</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                    {activeLayer.latency}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeLayer.summary}
              </p>

              {/* Specifications */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Architectural Guarantees
                </div>
                {activeLayer.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Engineered With
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {activeLayer.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-slate-800 border border-slate-700/80 rounded-md text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
