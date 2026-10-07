import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageView, Service, PortfolioProject, PricingPlan, Testimonial } from '../types';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Cpu,
  Layers,
  Layout,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Server,
  Sparkles,
  RotateCcw,
  Eye,
  Box,
} from 'lucide-react';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { TiltCard } from '../components/TiltCard';
import { MagneticButton } from '../components/MagneticButton';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  services: Service[];
  portfolio: PortfolioProject[];
  pricing: PricingPlan[];
  testimonials: Testimonial[];
  onOpenCaseStudy: (project: PortfolioProject) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  services,
  portfolio,
  pricing,
  testimonials,
  onOpenCaseStudy,
}) => {
  const [heroViewMode, setHeroViewMode] = useState<'3d' | 'studio'>('3d');

  const serviceIconMap: Record<string, React.ReactNode> = {
    Globe: <Code2 className="w-5 h-5 text-blue-600" />,
    Smartphone: <Smartphone className="w-5 h-5 text-blue-600" />,
    Cpu: <Cpu className="w-5 h-5 text-blue-600" />,
    Layout: <Layout className="w-5 h-5 text-blue-600" />,
    Layers: <Layers className="w-5 h-5 text-blue-600" />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <div className="space-y-24 md:space-y-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 md:pt-16 overflow-hidden">
        {/* Ambient 3D Glow Orbs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Prop */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              
              {/* Trust Badge with Pulse Glow */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 shadow-xs px-3.5 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                <span>Enterprise Software House & Engineering Studio</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-normal">San Francisco & Remote Global</span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] text-balance">
                Engineering software systems that scale with enterprise ambition.
              </h1>

              {/* Value Proposition */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Arilsync Technology builds mission-critical web applications, high-fluidity mobile platforms, and autonomous AI integrations. We replace bloated agency overhead with dedicated senior engineering pods.
              </p>

              {/* Primary & Secondary Actions with Magnetic Physics */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <MagneticButton
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:shadow-slate-900/20 whitespace-nowrap"
                >
                  <span>Schedule Technical Discovery</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>

                <MagneticButton
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300/80 rounded-xl hover:bg-slate-50 transition-all shadow-2xs whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Explore Case Studies</span>
                </MagneticButton>
              </div>

              {/* Proof Metric Adjacency in 3D Micro-Tiles */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-2xs transition-transform hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                    99.98%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Production Uptime SLA</div>
                </div>
                <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-2xs transition-transform hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums text-blue-600">
                    &lt;100ms
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">P99 Interaction Latency</div>
                </div>
                <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-2xs transition-transform hover:-translate-y-0.5">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                    $40M+
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Processed Transaction Flow</div>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Interactive 3D WebGL Engine & Studio Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              {/* Toggle Switcher Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setHeroViewMode('3d')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      heroViewMode === '3d'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>Interactive 3D Engine</span>
                  </button>
                  <button
                    onClick={() => setHeroViewMode('studio')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      heroViewMode === 'studio'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Server className="w-3.5 h-3.5" />
                    <span>Studio Visual</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  Interactive Node Core
                </span>
              </div>

              {heroViewMode === '3d' ? (
                <Hero3DCanvas />
              ) : (
                <TiltCard maxTilt={6} scale={1.01} className="w-full">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
                    <img
                      src="/src/assets/images/hero_software_studio_1790413507514.jpg"
                      alt="Arilsync Technology Engineering Architecture Studio"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto aspect-4/3 object-cover object-center group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300 mb-1">
                        <Server className="w-3.5 h-3.5 text-blue-400" />
                        <span>Active Distributed Architecture</span>
                      </div>
                      <p className="text-xs text-slate-200">
                        Next.js · React Native · Vector RAG Pipelines · Kubernetes
                      </p>
                    </div>
                  </div>
                </TiltCard>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (SERVICES OVERVIEW WITH 3D TILT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Specialized Disciplines
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
                Full-cycle software engineering from first sketch to high scale.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Explore All 5 Disciplines</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((srv, idx) => (
              <motion.div key={srv.id} variants={itemVariants}>
                <TiltCard
                  maxTilt={7}
                  scale={1.02}
                  className="h-full group p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                >
                  <div className="preserve-3d">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 translate-z-20">
                        {serviceIconMap[srv.icon] || <Code2 className="w-5 h-5 text-blue-600 group-hover:text-white" />}
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                        0{idx + 1}.
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors translate-z-10">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {srv.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 mb-6">
                      {srv.deliverables.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-slate-500 font-mono text-[11px]">
                      {srv.techStack.slice(0, 3).join(' · ')}
                    </div>
                    <button
                      onClick={() => onNavigate('services')}
                      className="font-semibold text-slate-900 group-hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}

            {/* Custom CTA Card with 3D Tilt & Cyber glow */}
            <motion.div variants={itemVariants}>
              <TiltCard
                maxTilt={6}
                scale={1.02}
                glareColor="rgba(59, 130, 246, 0.25)"
                className="h-full p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl flex flex-col justify-between border border-slate-800 shadow-xl"
              >
                <div className="preserve-3d">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Custom Engineering</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white translate-z-10">
                    Have an unconventional architecture challenge?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    We architect high-concurrency event stream pipelines, on-premise LLM gateways, and legacy system modernizations.
                  </p>
                </div>

                <MagneticButton
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
                >
                  <span>Request Custom Scoping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHY CHOOSE ARILSYNC (ENGINEERING RIGOR) WITH 3D HOVER */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-35" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Engineering Principles
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
              Why high-growth ventures trust Arilsync with their core technology.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
                title: 'Architecture First',
                desc: 'We never write code blindly. Every project begins with rigorous database schema definitions, API contracts, and security audits before the first sprint.',
              },
              {
                icon: <Zap className="w-5 h-5 text-blue-400" />,
                title: 'Direct Senior Engineers',
                desc: 'Zero junior handoffs. You work directly with lead architects who have built and maintained systems under high concurrent enterprise loads.',
              },
              {
                icon: <Server className="w-5 h-5 text-blue-400" />,
                title: 'Zero Technical Debt',
                desc: 'Strict TypeScript type safety, automated CI/CD unit and integration test coverage, and modular design tokens that your internal team can easily adopt.',
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
                title: 'Business Outcome Driven',
                desc: 'We don’t measure success by story points burned, but by customer conversion rate, infrastructure cost reduction, and sub-100ms interface latency.',
              },
            ].map((p, i) => (
              <TiltCard
                key={i}
                maxTilt={8}
                scale={1.03}
                glareColor="rgba(59, 130, 246, 0.2)"
                className="p-6 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 shadow-lg space-y-3 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center translate-z-10 shadow-xs">
                  {p.icon}
                </div>
                <h4 className="text-base font-bold text-white translate-z-10">{p.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED CASE STUDIES (PORTFOLIO HIGHLIGHTS WITH 3D LIFT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Verified Track Record
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Recent engineering projects and measurable outcomes.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.slice(0, 3).map((item) => (
            <TiltCard
              key={item.id}
              maxTilt={6}
              scale={1.02}
              onClick={() => onOpenCaseStudy(item)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col"
            >
              <div className="aspect-16/10 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {item.metric && (
                  <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm border border-slate-800 translate-z-20">
                    {item.metric}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2">
                    {item.client} · {item.category}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                    {item.tags.slice(0, 3).join(' · ')}
                  </div>
                  <span className="font-semibold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Read Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 5. VERIFIED TESTIMONIALS */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Client Endorsements
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              Trusted by technical leaders and visionary founders.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((test) => (
              <TiltCard
                key={test.id}
                maxTilt={5}
                scale={1.015}
                className="p-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {test.metric && (
                    <div className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                      Result: {test.metric}
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-300">
                    <img
                      src={test.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={test.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{test.clientName}</h4>
                    <p className="text-xs text-slate-500">
                      {test.role}, <span className="text-slate-700 font-medium">{test.company}</span>
                    </p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Engagement Models
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Transparent pricing without surprise change orders.
          </h2>
          <p className="text-sm text-slate-600 mt-3">
            Choose between fixed-scope milestone delivery or an embedded senior engineering pod.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricing.map((plan) => (
            <TiltCard
              key={plan.id}
              maxTilt={plan.highlighted ? 8 : 5}
              scale={plan.highlighted ? 1.03 : 1.015}
              glareColor={plan.highlighted ? 'rgba(59, 130, 246, 0.25)' : 'rgba(148, 163, 184, 0.12)'}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl ring-2 ring-blue-500 relative border border-slate-800'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              <div>
                {plan.badge && (
                  <span className="inline-block text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2 bg-blue-950/80 border border-blue-800/60 px-2 py-0.5 rounded">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.planName}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-extrabold tracking-tight tabular-nums">
                    {plan.price}
                  </span>
                  <span className={`text-xs ${plan.highlighted ? 'text-slate-400' : 'text-slate-500'}`}>
                    / {plan.period}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed mb-6 ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                  {plan.description}
                </p>

                <div className="space-y-3 mb-8 pt-4 border-t border-slate-200/20">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                      <span className={plan.highlighted ? 'text-slate-200' : 'text-slate-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <MagneticButton
                onClick={() => onNavigate('contact')}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>Select Engagement Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 7. HIGH-CONVERSION CTA WITH 3D GLASS FRAME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={4}
          scale={1.01}
          glareColor="rgba(59, 130, 246, 0.2)"
          className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-slate-800 shadow-2xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-tech-grid-dark opacity-35" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Ship High-Velocity Software?</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Let’s architect your next software milestone together.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book a 30-minute discovery call with our lead technical architect. We’ll review your existing codebase or wireframes and provide a deterministic architecture blueprint and timeline within 24 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <MagneticButton
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span>Schedule Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Direct engineer response · Guaranteed under 12 hours</span>
              </div>
            </div>
          </div>
        </TiltCard>
      </section>

    </div>
  );
};
