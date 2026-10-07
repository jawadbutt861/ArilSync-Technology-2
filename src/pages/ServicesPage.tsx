import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageView, Service } from '../types';
import {
  Code2,
  Smartphone,
  Cpu,
  Layout,
  Layers,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Terminal,
  Calculator,
  Sparkles,
} from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { InteractiveArchitecture3D } from '../components/InteractiveArchitecture3D';
import { MagneticButton } from '../components/MagneticButton';

interface ServicesPageProps {
  services: Service[];
  onNavigate: (page: PageView) => void;
  onSelectServiceForQuote?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onNavigate,
  onSelectServiceForQuote,
}) => {
  const [selectedService, setSelectedService] = useState<string>(services[0]?.id || 'srv-web');
  
  // Interactive Scope Calculator State
  const [calcService, setCalcService] = useState<'web' | 'mobile' | 'ai' | 'uiux' | 'custom'>('web');
  const [calcComplexity, setCalcComplexity] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [calcFeatures, setCalcFeatures] = useState<string[]>([
    'Auth & Roles',
    'High-Speed Database',
  ]);

  const toggleFeature = (feat: string) => {
    setCalcFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const calculateEstimate = () => {
    let baseWeeks = 4;
    let basePrice = 8500;

    if (calcComplexity === 'growth') {
      baseWeeks = 8;
      basePrice = 17000;
    } else if (calcComplexity === 'enterprise') {
      baseWeeks = 14;
      basePrice = 32000;
    }

    const featureWeeks = Math.ceil(calcFeatures.length * 0.5);
    const featurePrice = calcFeatures.length * 1500;

    return {
      weeks: baseWeeks + featureWeeks,
      price: basePrice + featurePrice,
    };
  };

  const estimate = calculateEstimate();

  const serviceIconMap: Record<string, React.ReactNode> = {
    Globe: <Code2 className="w-5 h-5 text-blue-600" />,
    Smartphone: <Smartphone className="w-5 h-5 text-blue-600" />,
    Cpu: <Cpu className="w-5 h-5 text-blue-600" />,
    Layout: <Layout className="w-5 h-5 text-blue-600" />,
    Layers: <Layers className="w-5 h-5 text-blue-600" />,
  };

  const activeSrv = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="space-y-24 py-12 md:py-16 overflow-hidden">
      
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
            <span>Engineering Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Specialized engineering for ambitious software systems.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            We don’t outsource or use fragile no-code workarounds. Arilsync operates as an elite technical unit delivering clean, scalable software across five focused domains.
          </p>
        </motion.div>
      </section>

      {/* 5 Core Disciplines Navigation + Detail Display with 3D Depth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Service Selector Tabs */}
          <div className="lg:col-span-4 space-y-2.5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              Select Discipline
            </p>
            {services.map((srv, idx) => {
              const isSelected = srv.id === activeSrv.id;
              return (
                <motion.button
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/15'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                        isSelected ? 'bg-slate-800 text-blue-400 scale-105' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {serviceIconMap[srv.icon] || <Code2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">{srv.title}</h3>
                      <p
                        className={`text-xs ${
                          isSelected ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        0{idx + 1}. Discipline
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right Service Deep Dive with 3D Tilt Card Frame */}
          <div className="lg:col-span-8">
            <TiltCard maxTilt={4} scale={1.008} className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSrv.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div className="border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded">
                        {activeSrv.category.toUpperCase()} ARCHITECTURE
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Production SLA: 99.98%
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                      {activeSrv.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {activeSrv.description}
                    </p>
                  </div>

                  {/* Core Deliverables in 3D Micro-Tiles */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
                      Deterministic Deliverables
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeSrv.deliverables.map((del, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-100/90 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed transition-all hover:bg-white hover:shadow-xs hover:border-slate-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Stack Grid */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                      Primary Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSrv.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-medium rounded-lg font-mono border border-slate-200/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Guarantees */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">Full IP Ownership</strong>
                        <span className="text-slate-500">Every commit belongs 100% to your company.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">Sprint Demos</strong>
                        <span className="text-slate-500">Working builds delivered bi-weekly.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Terminal className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-900">Automated Testing</strong>
                        <span className="text-slate-500">End-to-end integration test suites.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      Ready to scope this discipline for your project?
                    </div>
                    <MagneticButton
                      onClick={() => {
                        if (onSelectServiceForQuote) {
                          onSelectServiceForQuote(activeSrv.id);
                        }
                        onNavigate('contact');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Scope {activeSrv.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </MagneticButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TiltCard>
          </div>

        </div>
      </section>

      {/* 3D INTERACTIVE ARCHITECTURE DECOMPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveArchitecture3D />
      </section>

      {/* Interactive Scope & Estimate Calculator with 3D Glass UI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={3}
          scale={1.008}
          glareColor="rgba(59, 130, 246, 0.2)"
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-35" />

          <div className="relative z-10 max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 mb-2">
              <Calculator className="w-4 h-4" />
              <span>Interactive Scoping Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Instant Project Scope & Timeline Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Select your project parameters to generate a preliminary architectural duration and milestone budget.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Target Engineering Discipline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'web', label: 'Web Platform' },
                    { id: 'mobile', label: 'Mobile App' },
                    { id: 'ai', label: 'AI Integration' },
                    { id: 'uiux', label: 'UI/UX Design' },
                    { id: 'custom', label: 'Custom Enterprise' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCalcService(cat.id as any)}
                      className={`px-3 py-2 text-xs rounded-xl font-medium border text-left cursor-pointer transition-all ${
                        calcService === cat.id
                          ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-md shadow-blue-600/30'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Project Phase & Scale
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mvp', title: 'Sprint MVP', desc: 'Proof of concept, launch ready' },
                    { id: 'growth', title: 'Growth System', desc: 'High concurrency, multi-feature' },
                    { id: 'enterprise', title: 'Enterprise Core', desc: 'SOC2 compliant, distributed' },
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      onClick={() => setCalcComplexity(scale.id as any)}
                      className={`p-3 text-left rounded-xl border cursor-pointer transition-all ${
                        calcComplexity === scale.id
                          ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{scale.title}</div>
                      <div className="text-[11px] opacity-75 mt-0.5 hidden sm:block">
                        {scale.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features Addons */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Key Technical Modules Needed
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Auth & Roles',
                    'High-Speed Database',
                    'Stripe/Payment Billing',
                    'AI / LLM Vector Tooling',
                    'WebSocket Live Data',
                    'Offline Sync Engine',
                    'Figma Design Tokens',
                    'Automated CI/CD Deployment',
                  ].map((feat) => {
                    const active = calcFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        onClick={() => toggleFeature(feat)}
                        className={`p-2.5 text-xs text-left rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          active
                            ? 'bg-slate-800 border-blue-400 text-white shadow-xs'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span>{feat}</span>
                        {active && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Result Card with 3D Pop */}
            <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                Estimated Scope Analysis
              </span>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-400">Estimated Timeline</div>
                  <div className="text-3xl font-extrabold text-white tabular-nums mt-0.5">
                    ~{estimate.weeks} Weeks
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Bi-weekly continuous staging deployment
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-400">Estimated Milestone Budget</div>
                  <div className="text-3xl font-extrabold text-blue-400 tabular-nums mt-0.5">
                    ${estimate.price.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Includes full architectural specification & QA
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Fixed-price scope contract guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lead Architect assigned from Day 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>30-day post-launch warranty included</span>
                </div>
              </div>

              <MagneticButton
                onClick={() => onNavigate('contact')}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <span>Transfer Scope to Formal Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>

          </div>
        </TiltCard>
      </section>

    </div>
  );
};
