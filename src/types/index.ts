export type ServiceCategory = 'web' | 'mobile' | 'ai' | 'uiux' | 'custom' | 'cloud' | 'security' | 'bpo';

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  deliverables: string[];
  techStack: string[];
  order: number;
}

export interface Industry {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  imageUrl: string;
  capabilities: string[];
  metrics: string[];
  order: number;
}

export interface GlobalOffice {
  region: string;
  city: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  isHeadquarters?: boolean;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  author: string;
  authorRole: string;
  featured?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  client: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
  metric?: string;
  challenge?: string;
  solution?: string;
  order: number;
}

export interface PricingPlan {
  id: string;
  planName: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  quote: string;
  imageUrl?: string;
  metric?: string;
  order: number;
}

export interface CompanySettings {
  id?: string;
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'archived';
}

export type PageView = 'home' | 'services' | 'industries' | 'portfolio' | 'insights' | 'about' | 'pricing' | 'contact' | 'admin';
export type AdminTab = 'overview' | 'inquiries' | 'portfolio' | 'pricing' | 'testimonials' | 'settings' | 'setup';

