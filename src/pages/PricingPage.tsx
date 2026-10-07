import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageView, PricingPlan } from '../types';
import { CheckCircle2, ArrowRight, HelpCircle, Shield, Zap, Sparkles } from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { MagneticButton } from '../components/MagneticButton';

interface PricingPageProps {
  pricing: PricingPlan[];
  onNavigate: (page: PageView) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ pricing, onNavigate }) => {
  const faqs = [
    {
      q: 'How does intellectual property (IP) transfer work?',
      a: 'You retain 100% ownership of all source code, Figma design files, architectural documentation, and database schemas from day one. Every git commit is transferred directly to your organization’s private GitHub or GitLab repository.',
    },
    {
      q: 'What is the minimum engagement duration for a dedicated pod?',
      a: 'Dedicated engineering pods are billed on a flexible monthly retainer with a standard 30-day notice for scaling up or down. There are no lock-in golden handcuffs or punitive termination fees.',
    },
    {
      q: 'How are milestones and deliverables verified?',
      a: 'Every two weeks, our team presents a live interactive staging build demonstrating all completed user stories and automated test pass rates. You approve each sprint deliverable before milestone sign-off.',
    },
    {
      q: 'Can we transition the codebase to our internal developers later?',
      a: 'Absolutely. We architect our codebases specifically for maintainability, using standard TypeScript, modular component tokens, complete README deployment guides, and structured code walkthroughs for your incoming team.',
    },
  ];

  return (
    <div className="space-y-24 py-12 md:py-16 overflow-hidden">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Predictable Investment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Transparent pricing designed for engineering velocity.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            No ambiguous hourly estimates, surprise scope creeps, or junior billable markups. Straightforward milestone scopes and dedicated engineering pods.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricing.map((plan) => (
            <TiltCard
              key={plan.id}
              maxTilt={plan.highlighted ? 8 : 5}
              scale={plan.highlighted ? 1.03 : 1.015}
              glareColor={plan.highlighted ? 'rgba(59, 130, 246, 0.25)' : 'rgba(148, 163, 184, 0.12)'}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl ring-2 ring-blue-500 relative border border-slate-800'
                  : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {plan.badge && (
                  <div className="inline-block text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3 bg-blue-950/80 border border-blue-800/60 px-2.5 py-0.5 rounded-md">
                    {plan.badge}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.planName}</h3>
                
                <div className="flex items-baseline gap-1.5 my-4">
                  <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs ${
                      plan.highlighted ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    / {plan.period}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-8 ${
                    plan.highlighted ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {plan.description}
                </p>

                <div
                  className={`space-y-3 pt-6 border-t ${
                    plan.highlighted ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      plan.highlighted ? 'text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    What’s Included:
                  </p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                      <span className={plan.highlighted ? 'text-slate-200' : 'text-slate-700'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100/20">
                <MagneticButton
                  onClick={() => onNavigate('contact')}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Select {plan.planName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee Highlights in 3D Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard maxTilt={5} scale={1.02} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">100% Code & IP Retention</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No licensing restrictions. You own every line of code, documentation, and database schema written for your company.
            </p>
          </TiltCard>

          <TiltCard maxTilt={5} scale={1.02} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-1">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Sprint Delivery Guarantee</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bi-weekly testable releases deployed directly to staging environments with measurable progress reports.
            </p>
          </TiltCard>

          <TiltCard maxTilt={5} scale={1.02} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">30-Day Launch Warranty</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive post-launch technical support to fix bugs, monitor server latency, and ensure smooth customer adoption.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Everything you need to know about our billing, delivery, and contractual agreements.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 4 }}
              className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2 transition-all"
            >
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Scope CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard
          maxTilt={4}
          scale={1.01}
          glareColor="rgba(59, 130, 246, 0.2)"
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 border border-slate-800 shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Need an enterprise bespoke agreement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            For multi-team organizations, specialized security clearances, or high-throughput distributed microservices, we build custom scope proposals tailored to your quarterly targets.
          </p>
          <div>
            <MagneticButton
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30"
            >
              Request Custom Enterprise Proposal
            </MagneticButton>
          </div>
        </TiltCard>
      </section>

    </div>
  );
};
