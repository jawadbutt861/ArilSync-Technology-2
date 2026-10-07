import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  Service,
  PortfolioProject,
  PricingPlan,
  Testimonial,
  CompanySettings,
  Inquiry,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_PRICING,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
} from '../data/initialData';

const STORAGE_KEYS = {
  SERVICES: 'arilsync_services',
  PORTFOLIO: 'arilsync_portfolio',
  PRICING: 'arilsync_pricing',
  TESTIMONIALS: 'arilsync_testimonials',
  SETTINGS: 'arilsync_settings',
  INQUIRIES: 'arilsync_inquiries',
};

// Seed LocalStorage if empty
function initializeLocalStorage() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(INITIAL_PORTFOLIO));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRICING)) {
    localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(INITIAL_PRICING));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    const demoInquiries: Inquiry[] = [
      {
        id: 'inq-demo-1',
        name: 'Alexander Wright',
        email: 'alex.wright@vanguardlogistics.com',
        company: 'Vanguard Logistics',
        service: 'ai-integration',
        budget: '$25k - $50k',
        timeline: '2 - 3 months',
        message: 'Looking to integrate real-time route optimization and automated dispatch intelligence for our fleet of 450 vehicles. Need a high-level scoping call.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'new',
      },
      {
        id: 'inq-demo-2',
        name: 'Sarah Chen',
        email: 'schen@aurorafinance.io',
        company: 'Aurora Finance',
        service: 'web-development',
        budget: '$50k+',
        timeline: '3 - 6 months',
        message: 'We are redesigning our institutional liquidity portal with Next.js and WebSockets. Seeking a senior engineering team to lead architecture.',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        status: 'contacted',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(demoInquiries));
  }
}

initializeLocalStorage();

// ==================== SERVICES ====================
export async function getServices(): Promise<Service[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'services'));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service)).sort((a, b) => a.order - b.order);
      }
    } catch (err) {
      console.warn('[Firestore] Error fetching services, falling back to local:', err);
    }
  }
  const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return raw ? JSON.parse(raw) : INITIAL_SERVICES;
}

export async function saveService(service: Service): Promise<Service> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'services', service.id);
      await setDoc(ref, service);
    } catch (err) {
      console.warn('[Firestore] Error saving service, updating local:', err);
    }
  }
  const current = await getServices();
  const index = current.findIndex((s) => s.id === service.id);
  const updated = index >= 0 ? [...current.slice(0, index), service, ...current.slice(index + 1)] : [...current, service];
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
  return service;
}

export async function deleteService(serviceId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'services', serviceId));
    } catch (err) {
      console.warn('[Firestore] Error deleting service:', err);
    }
  }
  const current = await getServices();
  const updated = current.filter((s) => s.id !== serviceId);
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
}

// ==================== PORTFOLIO ====================
export async function getPortfolio(): Promise<PortfolioProject[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'portfolio'));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PortfolioProject)).sort((a, b) => a.order - b.order);
      }
    } catch (err) {
      console.warn('[Firestore] Error fetching portfolio, falling back to local:', err);
    }
  }
  const raw = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
  return raw ? JSON.parse(raw) : INITIAL_PORTFOLIO;
}

export async function savePortfolioProject(project: PortfolioProject): Promise<PortfolioProject> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'portfolio', project.id);
      await setDoc(ref, project);
    } catch (err) {
      console.warn('[Firestore] Error saving portfolio project:', err);
    }
  }
  const current = await getPortfolio();
  const index = current.findIndex((p) => p.id === project.id);
  const updated = index >= 0 ? [...current.slice(0, index), project, ...current.slice(index + 1)] : [...current, project];
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
  return project;
}

export async function deletePortfolioProject(projectId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'portfolio', projectId));
    } catch (err) {
      console.warn('[Firestore] Error deleting project:', err);
    }
  }
  const current = await getPortfolio();
  const updated = current.filter((p) => p.id !== projectId);
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(updated));
}

// ==================== PRICING ====================
export async function getPricing(): Promise<PricingPlan[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'pricing'));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PricingPlan)).sort((a, b) => a.order - b.order);
      }
    } catch (err) {
      console.warn('[Firestore] Error fetching pricing, falling back to local:', err);
    }
  }
  const raw = localStorage.getItem(STORAGE_KEYS.PRICING);
  return raw ? JSON.parse(raw) : INITIAL_PRICING;
}

export async function savePricingPlan(plan: PricingPlan): Promise<PricingPlan> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'pricing', plan.id);
      await setDoc(ref, plan);
    } catch (err) {
      console.warn('[Firestore] Error saving pricing plan:', err);
    }
  }
  const current = await getPricing();
  const index = current.findIndex((p) => p.id === plan.id);
  const updated = index >= 0 ? [...current.slice(0, index), plan, ...current.slice(index + 1)] : [...current, plan];
  localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(updated));
  return plan;
}

export async function deletePricingPlan(planId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'pricing', planId));
    } catch (err) {
      console.warn('[Firestore] Error deleting pricing plan:', err);
    }
  }
  const current = await getPricing();
  const updated = current.filter((p) => p.id !== planId);
  localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(updated));
}

// ==================== TESTIMONIALS ====================
export async function getTestimonials(): Promise<Testimonial[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'testimonials'));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial)).sort((a, b) => a.order - b.order);
      }
    } catch (err) {
      console.warn('[Firestore] Error fetching testimonials:', err);
    }
  }
  const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
  return raw ? JSON.parse(raw) : INITIAL_TESTIMONIALS;
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'testimonials', testimonial.id);
      await setDoc(ref, testimonial);
    } catch (err) {
      console.warn('[Firestore] Error saving testimonial:', err);
    }
  }
  const current = await getTestimonials();
  const index = current.findIndex((t) => t.id === testimonial.id);
  const updated = index >= 0 ? [...current.slice(0, index), testimonial, ...current.slice(index + 1)] : [...current, testimonial];
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
  return testimonial;
}

export async function deleteTestimonial(testimonialId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'testimonials', testimonialId));
    } catch (err) {
      console.warn('[Firestore] Error deleting testimonial:', err);
    }
  }
  const current = await getTestimonials();
  const updated = current.filter((t) => t.id !== testimonialId);
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
}

// ==================== SETTINGS ====================
export async function getCompanySettings(): Promise<CompanySettings> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', 'global'));
      if (snap.exists()) {
        return snap.data() as CompanySettings;
      }
    } catch (err) {
      console.warn('[Firestore] Error fetching settings:', err);
    }
  }
  const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return raw ? JSON.parse(raw) : INITIAL_SETTINGS;
}

export async function saveCompanySettings(settings: CompanySettings): Promise<CompanySettings> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'settings', 'global');
      await setDoc(ref, settings);
    } catch (err) {
      console.warn('[Firestore] Error saving settings:', err);
    }
  }
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  return settings;
}

// ==================== INQUIRIES ====================
export async function getInquiries(): Promise<Inquiry[]> {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'inquiries'));
      if (!snap.empty) {
        return snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Inquiry))
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    } catch (err) {
      console.warn('[Firestore] Error fetching inquiries:', err);
    }
  }
  const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
  return raw ? JSON.parse(raw) : [];
}

export async function createInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'inquiries', newInquiry.id), {
        ...newInquiry,
        serverTime: serverTimestamp(),
      });
    } catch (err) {
      console.warn('[Firestore] Error creating inquiry document:', err);
    }
  }

  const current = await getInquiries();
  const updated = [newInquiry, ...current];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  return newInquiry;
}

export async function updateInquiryStatus(inquiryId: string, status: Inquiry['status']): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'inquiries', inquiryId);
      await setDoc(ref, { status }, { merge: true });
    } catch (err) {
      console.warn('[Firestore] Error updating inquiry status:', err);
    }
  }
  const current = await getInquiries();
  const updated = current.map((item) => (item.id === inquiryId ? { ...item, status } : item));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
}

export async function deleteInquiry(inquiryId: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
    } catch (err) {
      console.warn('[Firestore] Error deleting inquiry:', err);
    }
  }
  const current = await getInquiries();
  const updated = current.filter((item) => item.id !== inquiryId);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
}

// Reset store to fresh initial values
export async function resetDatabaseToDefaults(): Promise<void> {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(INITIAL_PORTFOLIO));
  localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(INITIAL_PRICING));
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
}
