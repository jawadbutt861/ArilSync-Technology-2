import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageView, CompanySettings } from '../types';
import { createInquiry } from '../services/dataStore';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { MagneticButton } from '../components/MagneticButton';

interface ContactPageProps {
  onNavigate: (page: PageView) => void;
  settings: CompanySettings;
  defaultService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  settings,
  defaultService = 'web-development',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: defaultService,
    budget: '$15k - $30k',
    timeline: '1 - 2 months',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide at least 15 characters describing your project';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await createInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message.trim(),
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'web-development',
        budget: '$15k - $30k',
        timeline: '1 - 2 months',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span>Initiate Engagement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Let’s review your software architecture.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Fill in your project parameters below to schedule a technical discovery call. A senior systems architect will respond within 12 business hours.
          </p>
        </motion.div>
      </section>

      {/* Main Grid: Form + Info Sidebar with 3D Depth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form with 3D Border & Soft Glow */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-xl shadow-slate-900/5">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Inquiry Received by Lead Architect
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Arilsync Technology. Your project parameters have been logged, and one of our lead architects will contact you with initial technical feasibility notes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    Project Discovery & Estimate Request
                  </h3>
                  <p className="text-xs text-slate-500">
                    All submitted inquiries are protected by standard mutual confidentiality.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 text-xs border rounded-xl focus:outline-none transition-all ${
                        errors.name
                          ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className={`w-full px-3.5 py-2.5 text-xs border rounded-xl focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company / Venture Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Global Inc."
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Primary Service Discipline
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="web-development">Web Application Development</option>
                      <option value="mobile-app-development">Mobile App Development (iOS/Android)</option>
                      <option value="ai-integration">AI Integration & RAG Pipelines</option>
                      <option value="ui-ux-design">UI/UX Design & Design Systems</option>
                      <option value="custom-software">Custom Enterprise Software Core</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Target Investment Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="$8.5k - $15k">$8,500 – $15,000 (Sprint MVP)</option>
                      <option value="$15k - $30k">$15,000 – $30,000 (Multi-feature system)</option>
                      <option value="$30k - $60k">$30,000 – $60,000 (Comprehensive product build)</option>
                      <option value="$60k+">$60,000+ (Enterprise Custom Scope)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Target Launch Horizon
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 bg-white"
                    >
                      <option value="Immediate (< 4 weeks)">Immediate (&lt; 4 weeks)</option>
                      <option value="1 - 2 months">1 – 2 months</option>
                      <option value="3 - 6 months">3 – 6 months</option>
                      <option value="Flexible / Exploratory">Flexible / Exploratory</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Technical Scope & Project Overview *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you are building, existing codebase status (if any), key user requirements, and technical constraints..."
                    className={`w-full px-3.5 py-2.5 text-xs border rounded-xl focus:outline-none transition-all ${
                      errors.message
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Strict NDA & Data Security Protection</span>
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-slate-900/10"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit for Scoping</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>

          {/* Info Sidebar with 3D Tilt Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <TiltCard maxTilt={4} scale={1.01} className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Headquarters & Direct Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Corporate Office</strong>
                    <span className="text-slate-600 leading-relaxed">{settings.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Direct Technical Email</strong>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Direct Line</strong>
                    <a href={`tel:${settings.phone}`} className="text-slate-700 hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-0.5">Architect Response SLA</strong>
                    <span className="text-slate-600">Under 12 hours (Monday through Friday)</span>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* What Happens Next Card with 3D Depth */}
            <TiltCard
              maxTilt={4}
              scale={1.01}
              glareColor="rgba(59, 130, 246, 0.2)"
              className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-4"
            >
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-blue-400">
                What Happens Next?
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-blue-400 font-bold">1.</span>
                  <span>We review your requirements and review any wireframes/repos.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-blue-400 font-bold">2.</span>
                  <span>We host a 30-minute technical discovery session with a Lead Architect.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-blue-400 font-bold">3.</span>
                  <span>You receive a deterministic architecture blueprint, milestone scope, and fixed pricing.</span>
                </div>
              </div>
            </TiltCard>

          </div>

        </div>
      </section>

    </div>
  );
};
