import React from 'react';
import { PageView } from '../types';
import { GLOBAL_OFFICES, ENTERPRISE_PARTNERS } from '../data/initialData';
import { Mail, Phone, MapPin, Globe, Shield, Award, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  email?: string;
  phone?: string;
  address?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  email = 'contact@arilsync.com',
  phone = '+1 (555) 389-2041',
  address = '750 Battery St, Suite 400, Financial District, San Francisco, CA 94111',
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top: Tier-1 Partner Marquee Grid (Systems Limited Style) */}
        <div className="pb-12 border-b border-slate-900">
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-6 text-center sm:text-left">
            STRATEGIC ALLIANCES & GLOBAL TIER-1 PARTNERSHIPS
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
            {ENTERPRISE_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-lg text-center space-y-1 hover:border-slate-700 transition-colors"
              >
                <div className="text-xs font-bold text-white font-mono tracking-wider">
                  {partner.logoText}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Arilsync<span className="text-blue-500">.</span>
            </span>
            <p className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              Enabling a Digital Tomorrow
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Arilsync Systems Technology is a premier global digital transformation conglomerate. We engineer mission-critical cloud platforms, core banking ecosystems, Generative AI engines, and enterprise software for world-leading corporations across 16+ countries.
            </p>
            
            <div className="pt-2 space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Forbes Asia's Best Under A Billion Awardee</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>CMMI Level 5 Appraised & ISO 27001 Certified</span>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Digital & Modern Web
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cloud Modernization & DevOps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Data & Generative AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mobile Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cybersecurity & SOC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Business Applications & BPO
                </button>
              </li>
            </ul>
          </div>

          {/* Key Industries */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Industries
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Banking & Financial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Telecommunications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Retail, E-commerce & CPG
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Healthcare & Life Sciences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('industries')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Public Sector & Government
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Arilsync
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('insights')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Insights & Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Client Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pricing & Retainers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Get in Touch
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Global Hubs Bar (Systems Limited Style) */}
        <div className="pt-8 border-t border-slate-900">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 font-bold">
            GLOBAL INNOVATION HUBS & OFFICES
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-xs text-slate-400">
            <div>
              <strong className="block text-white mb-1">San Francisco (HQ)</strong>
              <span>750 Battery St, CA 94111</span>
            </div>
            <div>
              <strong className="block text-white mb-1">London (EMEA)</strong>
              <span>1 Canada Square, E14 5AA</span>
            </div>
            <div>
              <strong className="block text-white mb-1">Dubai (MENA)</strong>
              <span>DIFC Gate Precinct 4</span>
            </div>
            <div>
              <strong className="block text-white mb-1">Riyadh (KSA)</strong>
              <span>King Fahd Road, Al Olaya</span>
            </div>
            <div>
              <strong className="block text-white mb-1">Lahore (Delivery Hub)</strong>
              <span>Technology Park, Seepz</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Arilsync Systems Technology Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Zero-Telemetry Guarantee</span>
            <span>·</span>
            <span>SOC2 Type II Aligned</span>
            <span>·</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

