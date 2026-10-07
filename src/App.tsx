/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PageView, Service, PortfolioProject, PricingPlan, Testimonial, CompanySettings } from './types';
import {
  getServices,
  getPortfolio,
  getPricing,
  getTestimonials,
  getCompanySettings,
} from './services/dataStore';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { InsightsPage } from './pages/InsightsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioProject | null>(null);
  const [quoteServiceId, setQuoteServiceId] = useState<string>('web-development');

  // Application Data States
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<CompanySettings>({
    companyName: 'Arilsync Technology',
    tagline: 'Engineering software systems that scale with enterprise ambition.',
    email: 'contact@arilsync.com',
    phone: '+1 (555) 389-2041',
    address: '750 Battery St, Suite 400, Financial District, San Francisco, CA 94111',
    socialLinks: {},
  });

  const loadData = async () => {
    try {
      const [s, p, pr, t, set] = await Promise.all([
        getServices(),
        getPortfolio(),
        getPricing(),
        getTestimonials(),
        getCompanySettings(),
      ]);
      setServices(s);
      setPortfolio(p);
      setPricing(pr);
      setTestimonials(t);
      setSettings(set);
    } catch (err) {
      console.error('Failed to load application data:', err);
    }
  };

  useEffect(() => {
    loadData();

    // Resolve initial page view from URL pathname, hash, or query parameters
    const resolvePageFromUrl = (): PageView => {
      // 1. Check path: e.g. /admin
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (pathname === 'admin') return 'admin';
      if (['home', 'services', 'industries', 'insights', 'portfolio', 'about', 'pricing', 'contact'].includes(pathname)) {
        return pathname as PageView;
      }

      // 2. Check hash: e.g. #admin, #/admin
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (hash === 'admin') return 'admin';
      if (['home', 'services', 'industries', 'insights', 'portfolio', 'about', 'pricing', 'contact'].includes(hash)) {
        return hash as PageView;
      }

      // 3. Check query param: e.g. ?admin or ?page=admin
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('admin') || searchParams.get('page')?.toLowerCase() === 'admin') {
        return 'admin';
      }
      const pageParam = searchParams.get('page')?.toLowerCase();
      if (pageParam && ['home', 'services', 'industries', 'insights', 'portfolio', 'about', 'pricing', 'contact'].includes(pageParam)) {
        return pageParam as PageView;
      }

      return 'home';
    };

    setCurrentPage(resolvePageFromUrl());

    const handleUrlChange = () => {
      setCurrentPage(resolvePageFromUrl());
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    if (page === 'home') {
      // If navigating from admin, clean up hash/search
      if (window.location.hash.toLowerCase().includes('admin') || window.location.search.toLowerCase().includes('admin')) {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.location.hash = 'home';
      }
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* 3-Zone Sticky Navigation Bar (Public UI only, zero admin access links) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            services={services}
            portfolio={portfolio}
            pricing={pricing}
            testimonials={testimonials}
            onOpenCaseStudy={(proj) => {
              setSelectedCaseStudy(proj);
              handleNavigate('portfolio');
            }}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            onNavigate={handleNavigate}
            onSelectServiceForQuote={(srvId) => setQuoteServiceId(srvId)}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage
            onNavigate={handleNavigate}
            onSelectIndustryForQuote={(indId) => {
              setQuoteServiceId(indId);
              handleNavigate('contact');
            }}
          />
        )}

        {currentPage === 'insights' && (
          <InsightsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'portfolio' && (
          <PortfolioPage
            portfolio={portfolio}
            onNavigate={handleNavigate}
            selectedCaseStudy={selectedCaseStudy}
            onCloseCaseStudy={() => setSelectedCaseStudy(null)}
            onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage pricing={pricing} onNavigate={handleNavigate} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            settings={settings}
            defaultService={quoteServiceId}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard
            onNavigate={handleNavigate}
            onDataChange={loadData}
          />
        )}
      </main>

      {/* Quiet Corporate Footer */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          email={settings.email}
          phone={settings.phone}
          address={settings.address}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
