import React from 'react';
import { motion } from 'motion/react';
import { PageView } from '../types';
import { ShieldCheck, Award, Users, Terminal, ArrowRight, Code, Server, Sparkles } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { MagneticButton } from '../components/MagneticButton';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const leadership = [
    {
      name: 'Tariq Al-Mansoor',
      role: 'Co-Founder & Chief Systems Architect',
      bio: 'Former distributed systems lead with 12+ years engineering high-throughput transaction pipelines across fintech and defense technology.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Dr. Rebecca Hastings',
      role: 'Co-Founder & VP of Engineering',
      bio: 'PhD in Computer Science. Spearheads Arilsync’s AI integration practice, specializing in vector search, RAG pipelines, and model evaluation benchmarks.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    },
    {
      name: 'Zane Gallagher',
      role: 'Principal Design Technologist',
      bio: 'Pioneered design systems for Fortune 500 platforms. Bridges high-taste visual craftsmanship with rigorous production component tokens.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    },
  ];

  const values = [
    {
      title: 'Architecture Before Syntax',
      desc: 'We refuse to churn out fragile code to meet premature sprint vanity metrics. We model databases, API schemas, and concurrency boundaries with mathematical precision before deploying.',
      icon: <Terminal className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Zero Junior Handoffs',
      desc: 'Traditional agencies sell you on seasoned partners and then pass your core codebase to inexperienced subcontractors. At Arilsync, senior architects write and review every pull request.',
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Radical Transparency',
      desc: 'You have continuous access to our private GitHub repositories, Jira/Linear boards, staging previews, and automated testing dashboards. No smoke, mirrors, or hidden delays.',
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Long-Term Maintainability',
      desc: 'We write software designed to outlast our engagement. Clean type annotations, zero undocumented black boxes, and standard industry frameworks that your future in-house engineers will love.',
      icon: <Server className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <div className="space-y-24 py-12 md:py-16 overflow-hidden">
      
      {/* Hero / Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Arilsync Technology</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
              We founded Arilsync to eliminate bloated agency bureaucracy.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Arilsync Technology was established by veteran software architects who were tired of seeing venture-backed companies receive buggy, unmaintainable software from traditional generalist agencies.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We operate as a high-density engineering studio. By concentrating solely on Web Applications, Mobile Platforms, AI Integration, and Custom Core Software, we deliver enterprise-grade velocity without the layers of non-technical account managers.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            <TiltCard maxTilt={5} scale={1.015} className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl bg-slate-900">
              <img
                src="/src/assets/images/hero_software_studio_1790413507514.jpg"
                alt="Arilsync Technology Studio Headquarters"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-4/3 object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="p-6 bg-slate-900 text-white border-t border-slate-800">
                <div className="text-xs font-mono text-blue-400 mb-1">
                  HEADQUARTERS & REMOTE OPERATIONS
                </div>
                <div className="text-sm font-semibold">
                  San Francisco, CA & Distributed Global Engineering
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Engineering Principles with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-16">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Our Non-Negotiables
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              The foundational principles governing every line of code we ship.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <TiltCard
                key={i}
                maxTilt={6}
                scale={1.02}
                className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md space-y-3 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center translate-z-10">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 translate-z-10">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section with 3D Card Hover */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-16">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
              Technical Leadership
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              Led by hands-on engineering practitioners.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, i) => (
              <TiltCard
                key={i}
                maxTilt={6}
                scale={1.02}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
                    <p className="text-xs font-semibold text-blue-600 font-mono">{leader.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">{leader.bio}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={4}
          scale={1.01}
          glareColor="rgba(59, 130, 246, 0.2)"
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800 shadow-2xl"
        >
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <h3 className="text-2xl font-bold text-white">
              Want to partner with an engineering team that truly understands modern tech?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a 30-minute discovery call directly with one of our lead architects.
            </p>
          </div>
          <MagneticButton
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-blue-600/30"
          >
            <span>Start Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </TiltCard>
      </section>

    </div>
  );
};
