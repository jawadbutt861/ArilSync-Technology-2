import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  PageView,
  AdminTab,
  PortfolioProject,
  PricingPlan,
  Testimonial,
  CompanySettings,
  Inquiry,
} from '../types';
import {
  getPortfolio,
  savePortfolioProject,
  deletePortfolioProject,
  getPricing,
  savePricingPlan,
  deletePricingPlan,
  getTestimonials,
  saveTestimonial,
  deleteTestimonial,
  getCompanySettings,
  saveCompanySettings,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  resetDatabaseToDefaults,
} from '../services/dataStore';
import { isFirebaseConfigured } from '../services/firebase';
import { isCloudinaryConfigured, cloudinaryConfig } from '../services/cloudinary';
import { CloudinaryUploadModal } from '../components/CloudinaryUploadModal';
import {
  LayoutDashboard,
  FolderGit2,
  Tag,
  MessageSquare,
  Settings,
  Mail,
  BookOpen,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Database,
  Cloud,
  Lock,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Search,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (page: PageView) => void;
  onDataChange?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onDataChange }) => {
  const { user, isAdmin, signIn, signOut } = useAuth();
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('admin@arilsync.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  // Live Data State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
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
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Modals & Editing
  const [isCloudinaryModalOpen, setIsCloudinaryModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [editingPricing, setEditingPricing] = useState<Partial<PricingPlan> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = async () => {
    setIsLoadingData(true);
    try {
      const [inq, port, prc, test, set] = await Promise.all([
        getInquiries(),
        getPortfolio(),
        getPricing(),
        getTestimonials(),
        getCompanySettings(),
      ]);
      setInquiries(inq);
      setPortfolio(port);
      setPricing(prc);
      setTestimonials(test);
      setSettings(set);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    const result = await signIn(loginEmail, loginPassword);
    if (!result.success) {
      setLoginError(result.error || 'Authentication failed. Please verify credentials.');
    }
    setIsLoggingIn(false);
  };

  // ==================== PORTFOLIO HANDLERS ====================
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.description) {
      alert('Title and description are required.');
      return;
    }

    const projectToSave: PortfolioProject = {
      id: editingProject.id || `proj-${Date.now()}`,
      title: editingProject.title,
      slug: editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: editingProject.category || 'Web Development',
      client: editingProject.client || 'Client Name',
      description: editingProject.description,
      imageUrl: editingProject.imageUrl || '/src/assets/images/project_fintech_platform_1790413528716.jpg',
      tags: typeof editingProject.tags === 'string' ? (editingProject.tags as string).split(',').map((t) => t.trim()) : editingProject.tags || ['Next.js', 'React'],
      link: editingProject.link || '',
      metric: editingProject.metric || '',
      challenge: editingProject.challenge || '',
      solution: editingProject.solution || '',
      order: editingProject.order || portfolio.length + 1,
    };

    await savePortfolioProject(projectToSave);
    await loadAllData();
    if (onDataChange) onDataChange();
    setEditingProject(null);
    showToast('Project saved successfully to Firestore / Store.');
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      await deletePortfolioProject(id);
      await loadAllData();
      if (onDataChange) onDataChange();
      showToast('Project removed.');
    }
  };

  // ==================== PRICING HANDLERS ====================
  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing?.planName || !editingPricing?.price) {
      alert('Plan name and price are required.');
      return;
    }

    const planToSave: PricingPlan = {
      id: editingPricing.id || `plan-${Date.now()}`,
      planName: editingPricing.planName,
      price: editingPricing.price,
      period: editingPricing.period || 'per month',
      description: editingPricing.description || '',
      features: Array.isArray(editingPricing.features)
        ? editingPricing.features
        : (editingPricing.features as unknown as string || '').split('\n').filter(Boolean),
      highlighted: Boolean(editingPricing.highlighted),
      badge: editingPricing.badge || '',
      order: editingPricing.order || pricing.length + 1,
    };

    await savePricingPlan(planToSave);
    await loadAllData();
    if (onDataChange) onDataChange();
    setEditingPricing(null);
    showToast('Pricing plan updated.');
  };

  const handleDeletePricing = async (id: string) => {
    if (confirm('Delete this pricing plan?')) {
      await deletePricingPlan(id);
      await loadAllData();
      if (onDataChange) onDataChange();
      showToast('Pricing plan deleted.');
    }
  };

  // ==================== TESTIMONIAL HANDLERS ====================
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.clientName || !editingTestimonial?.quote) {
      alert('Client name and quote are required.');
      return;
    }

    const itemToSave: Testimonial = {
      id: editingTestimonial.id || `test-${Date.now()}`,
      clientName: editingTestimonial.clientName,
      company: editingTestimonial.company || '',
      role: editingTestimonial.role || '',
      quote: editingTestimonial.quote,
      metric: editingTestimonial.metric || '',
      imageUrl: editingTestimonial.imageUrl || '',
      order: editingTestimonial.order || testimonials.length + 1,
    };

    await saveTestimonial(itemToSave);
    await loadAllData();
    if (onDataChange) onDataChange();
    setEditingTestimonial(null);
    showToast('Testimonial saved.');
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      await deleteTestimonial(id);
      await loadAllData();
      if (onDataChange) onDataChange();
      showToast('Testimonial deleted.');
    }
  };

  // ==================== SETTINGS HANDLER ====================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCompanySettings(settings);
    if (onDataChange) onDataChange();
    showToast('Company settings successfully updated.');
  };

  // ==================== INQUIRY STATUS HANDLERS ====================
  const handleStatusChange = async (inquiryId: string, status: Inquiry['status']) => {
    await updateInquiryStatus(inquiryId, status);
    await loadAllData();
    showToast(`Inquiry marked as ${status}.`);
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (confirm('Delete this inquiry?')) {
      await deleteInquiry(inquiryId);
      await loadAllData();
      showToast('Inquiry removed.');
    }
  };

  // ==================== UNPROTECTED / LOGIN SCREEN ====================
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-blue-400 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Admin Portal</h2>
            <p className="text-xs text-slate-500">
              Protected management dashboard for Arilsync Technology
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In as Administrator'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              Demo credentials: <span className="font-mono text-slate-700 font-semibold">admin@arilsync.com</span> / <span className="font-mono text-slate-700 font-semibold">admin123</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Firebase Auth & Firestore sync active when configured in <code className="font-mono">.env</code>
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== AUTHENTICATED DASHBOARD ====================
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cloudinary Media Uploader Modal */}
      <CloudinaryUploadModal
        isOpen={isCloudinaryModalOpen}
        onClose={() => setIsCloudinaryModalOpen(false)}
        currentImageUrl={editingProject?.imageUrl || ''}
        onImageSelected={(url) => {
          if (editingProject) {
            setEditingProject({ ...editingProject, imageUrl: url });
          }
          showToast('Image URL selected.');
        }}
      />

      {/* Top Admin Status Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-18 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono bg-slate-100 px-2.5 py-1 rounded">
              Console
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Logged in as <strong className="text-slate-800">{user?.email}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Status indicators */}
            <div className="hidden md:flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>DB: {isFirebaseConfigured ? 'Firestore Live' : 'Persistent Storage'}</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Cloud className="w-3.5 h-3.5 text-blue-600" />
                <span>Cloudinary: {isCloudinaryConfigured ? 'Connected' : 'Local Fallback'}</span>
              </span>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
            >
              Public Site
            </button>

            <button
              onClick={async () => {
                await signOut();
                onNavigate('home');
              }}
              className="text-xs text-red-600 hover:text-red-700 px-3 py-1.5 border border-red-200 rounded-md hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-1">
            {[
              { id: 'overview', label: 'Overview & Metrics', icon: <LayoutDashboard className="w-4 h-4" /> },
              {
                id: 'inquiries',
                label: 'Client Inquiries',
                icon: <Mail className="w-4 h-4" />,
                badge: inquiries.filter((i) => i.status === 'new').length,
              },
              { id: 'portfolio', label: 'Portfolio Case Studies', icon: <FolderGit2 className="w-4 h-4" /> },
              { id: 'pricing', label: 'Pricing & Retainers', icon: <Tag className="w-4 h-4" /> },
              { id: 'testimonials', label: 'Client Testimonials', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'settings', label: 'Company Settings', icon: <Settings className="w-4 h-4" /> },
              { id: 'setup', label: 'Firebase & Cloudinary Guide', icon: <BookOpen className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as AdminTab)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge ? (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-slate-200">
              <button
                onClick={async () => {
                  if (confirm('Reset store back to default seed data?')) {
                    await resetDatabaseToDefaults();
                    await loadAllData();
                    if (onDataChange) onDataChange();
                    showToast('Data reset to defaults.');
                  }
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Default Seed Data</span>
              </button>
            </div>
          </aside>

          {/* Main Panel */}
          <main className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs min-h-[600px]">
            
            {/* ================= OVERVIEW TAB ================= */}
            {currentTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Dashboard Overview</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    System activity, incoming project inquiries, and content catalog summary
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-medium">New Inquiries</span>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {inquiries.filter((i) => i.status === 'new').length}
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium">
                      {inquiries.length} total logged
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Portfolio Items</span>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {portfolio.length}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Active case studies
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Pricing Packages</span>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {pricing.length}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Active retainer plans
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Testimonials</span>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {testimonials.length}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Verified reviews
                    </span>
                  </div>
                </div>

                {/* Integration Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-5 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-blue-600" />
                        Firebase Firestore & Auth
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          isFirebaseConfigured
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {isFirebaseConfigured ? 'Connected Live' : 'Demo / Persistent Mode'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isFirebaseConfigured
                        ? 'Connected to Firebase. Data reads and writes sync in real-time with your Cloud Firestore collections.'
                        : 'Currently operating in self-contained persistent mode with full CRUD capability. Add your Firebase keys in .env when ready to synchronize to a live cloud project.'}
                    </p>
                  </div>

                  <div className="p-5 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Cloud className="w-4 h-4 text-blue-600" />
                        Cloudinary Image CDN
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          isCloudinaryConfigured
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {isCloudinaryConfigured ? 'Connected Live' : 'Curated Asset Mode'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isCloudinaryConfigured
                        ? `Cloud name: ${cloudinaryConfig.cloudName}. Direct uploads will be served with auto-transformations.`
                        : 'Direct upload widget active with fallback image caching. You can also pick from the pre-generated 8k studio assets library.'}
                    </p>
                  </div>
                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Recent Inbound Leads
                    </h4>
                    <button
                      onClick={() => setCurrentTab('inquiries')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      View All Inquiries →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400">
                          <th className="pb-2 font-medium">Contact</th>
                          <th className="pb-2 font-medium">Service</th>
                          <th className="pb-2 font-medium">Budget</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {inquiries.slice(0, 4).map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-50">
                            <td className="py-2.5">
                              <div className="font-semibold text-slate-900">{inq.name}</div>
                              <div className="text-[11px] text-slate-500">{inq.email}</div>
                            </td>
                            <td className="py-2.5 text-slate-600 font-mono text-[11px]">
                              {inq.service}
                            </td>
                            <td className="py-2.5 text-slate-600">{inq.budget || '—'}</td>
                            <td className="py-2.5">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                                  inq.status === 'new'
                                    ? 'bg-blue-100 text-blue-800'
                                    : inq.status === 'contacted'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {inq.status.replace('_', ' ')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================= INQUIRIES TAB ================= */}
            {currentTab === 'inquiries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Lead Inquiries Inbox</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage incoming project estimate requests submitted via the contact form
                  </p>
                </div>

                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                      No inquiries logged yet.
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{inq.name}</h4>
                              {inq.company && (
                                <span className="text-xs text-slate-500 font-medium">
                                  · {inq.company}
                                </span>
                              )}
                            </div>
                            <a
                              href={`mailto:${inq.email}`}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              {inq.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                handleStatusChange(inq.id, e.target.value as Inquiry['status'])
                              }
                              className="text-xs border border-slate-300 rounded-md px-2 py-1 bg-white font-medium"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="in_progress">In Progress</option>
                              <option value="archived">Archived</option>
                            </select>

                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-500 font-mono">
                          <div>
                            <span className="text-slate-400">Discipline: </span>
                            <span className="text-slate-800">{inq.service}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Budget: </span>
                            <span className="text-slate-800">{inq.budget || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Horizon: </span>
                            <span className="text-slate-800">{inq.timeline || 'N/A'}</span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-lg leading-relaxed">
                          {inq.message}
                        </p>

                        <div className="text-[11px] text-slate-400">
                          Received on: {new Date(inq.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ================= PORTFOLIO TAB ================= */}
            {currentTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Portfolio Projects</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage case studies, upload images via Cloudinary, and highlight measurable outcomes
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingProject({
                        title: '',
                        client: '',
                        category: 'Web Development',
                        description: '',
                        imageUrl: '/src/assets/images/project_fintech_platform_1790413528716.jpg',
                        tags: ['Next.js', 'React', 'TypeScript'],
                        metric: '',
                        challenge: '',
                        solution: '',
                      })
                    }
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                {/* Project Edit / Create Modal or Form */}
                {editingProject && (
                  <div className="p-6 bg-slate-50 border border-slate-300 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <h4 className="text-sm font-bold text-slate-900">
                        {editingProject.id ? 'Edit Case Study' : 'Create New Case Study'}
                      </h4>
                      <button
                        onClick={() => setEditingProject(null)}
                        className="text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            value={editingProject.title || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, title: e.target.value })
                            }
                            required
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={editingProject.client || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, client: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Discipline / Category
                          </label>
                          <select
                            value={editingProject.category || 'Web Development'}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, category: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                          >
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Apps">Mobile Apps</option>
                            <option value="AI & Machine Learning">AI & Machine Learning</option>
                            <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                            <option value="Custom Enterprise">Custom Enterprise</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Quantified Metric (e.g. +310% Throughput)
                          </label>
                          <input
                            type="text"
                            value={editingProject.metric || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, metric: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      {/* Image with Cloudinary Upload Widget trigger */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-slate-700">
                            Cover Image (Cloudinary or Curated Asset)
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsCloudinaryModalOpen(true)}
                            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
                          >
                            <Cloud className="w-3.5 h-3.5" />
                            <span>Open Cloudinary Image Selector / Uploader</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={editingProject.imageUrl || ''}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, imageUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                        />
                        {editingProject.imageUrl && (
                          <div className="mt-2 aspect-video max-h-32 rounded overflow-hidden bg-slate-200 w-48">
                            <img
                              src={editingProject.imageUrl}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={
                            Array.isArray(editingProject.tags)
                              ? editingProject.tags.join(', ')
                              : editingProject.tags || ''
                          }
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              tags: e.target.value.split(',').map((t) => t.trim()),
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Executive Summary / Description *
                        </label>
                        <textarea
                          rows={3}
                          value={editingProject.description || ''}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, description: e.target.value })
                          }
                          required
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            The Challenge
                          </label>
                          <textarea
                            rows={2}
                            value={editingProject.challenge || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, challenge: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Arilsync Solution
                          </label>
                          <textarea
                            rows={2}
                            value={editingProject.solution || ''}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, solution: e.target.value })
                            }
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Save Project to Database
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Projects List */}
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {portfolio.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={proj.imageUrl}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                          <p className="text-xs text-slate-500">
                            {proj.client} · {proj.category} · {proj.metric || 'No metric'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= PRICING TAB ================= */}
            {currentTab === 'pricing' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Pricing Packages</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Manage public plans, milestone tiers, and highlight badges
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingPricing({
                        planName: '',
                        price: '$10,000',
                        period: 'per milestone',
                        description: '',
                        features: ['Custom Next.js Frontend', 'PostgreSQL Schema', 'Full IP Rights'],
                        highlighted: false,
                      })
                    }
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Plan</span>
                  </button>
                </div>

                {/* Edit Form */}
                {editingPricing && (
                  <form
                    onSubmit={handleSavePricing}
                    className="p-6 bg-slate-50 border border-slate-300 rounded-xl space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Plan Name *
                        </label>
                        <input
                          type="text"
                          value={editingPricing.planName || ''}
                          onChange={(e) =>
                            setEditingPricing({ ...editingPricing, planName: e.target.value })
                          }
                          required
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Price *
                        </label>
                        <input
                          type="text"
                          value={editingPricing.price || ''}
                          onChange={(e) =>
                            setEditingPricing({ ...editingPricing, price: e.target.value })
                          }
                          required
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Billing Period
                        </label>
                        <input
                          type="text"
                          value={editingPricing.period || ''}
                          onChange={(e) =>
                            setEditingPricing({ ...editingPricing, period: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Short Plan Summary
                      </label>
                      <input
                        type="text"
                        value={editingPricing.description || ''}
                        onChange={(e) =>
                          setEditingPricing({ ...editingPricing, description: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Included Features (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={
                          Array.isArray(editingPricing.features)
                            ? editingPricing.features.join('\n')
                            : (editingPricing.features as any) || ''
                        }
                        onChange={(e) =>
                          setEditingPricing({
                            ...editingPricing,
                            features: e.target.value.split('\n'),
                          })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(editingPricing.highlighted)}
                          onChange={(e) =>
                            setEditingPricing({ ...editingPricing, highlighted: e.target.checked })
                          }
                          className="rounded text-blue-600"
                        />
                        <span>Highlight as Most Popular</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingPricing(null)}
                        className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Save Plan
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pricing.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-5 border border-slate-200 rounded-xl space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-slate-900">{plan.planName}</h4>
                          {plan.highlighted && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-extrabold text-slate-900 mt-1 tabular-nums">
                          {plan.price}{' '}
                          <span className="text-xs font-normal text-slate-500">/{plan.period}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-2">{plan.description}</p>
                        <div className="mt-3 space-y-1">
                          {plan.features.slice(0, 3).map((f, i) => (
                            <div key={i} className="text-xs text-slate-500 truncate">
                              • {f}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingPricing(plan)}
                          className="p-1 text-slate-600 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePricing(plan.id)}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TESTIMONIALS TAB ================= */}
            {currentTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Client Testimonials</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Curate verifiable endorsements with client roles and business outcomes
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setEditingTestimonial({
                        clientName: '',
                        role: 'VP of Engineering',
                        company: '',
                        quote: '',
                        metric: '',
                        imageUrl: '',
                      })
                    }
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                {/* Form */}
                {editingTestimonial && (
                  <form
                    onSubmit={handleSaveTestimonial}
                    className="p-6 bg-slate-50 border border-slate-300 rounded-xl space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.clientName || ''}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              clientName: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.role || ''}
                          onChange={(e) =>
                            setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.company || ''}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Quantified Outcome Metric
                        </label>
                        <input
                          type="text"
                          placeholder="+310% Trading Throughput"
                          value={editingTestimonial.metric || ''}
                          onChange={(e) =>
                            setEditingTestimonial({ ...editingTestimonial, metric: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Avatar Image URL
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.imageUrl || ''}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              imageUrl: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quote *
                      </label>
                      <textarea
                        rows={3}
                        value={editingTestimonial.quote || ''}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingTestimonial(null)}
                        className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Save Testimonial
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {testimonials.map((test) => (
                    <div
                      key={test.id}
                      className="p-5 border border-slate-200 rounded-xl flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{test.clientName}</h4>
                          <span className="text-xs text-slate-500">
                            · {test.role}, {test.company}
                          </span>
                          {test.metric && (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {test.metric}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 italic">"{test.quote}"</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingTestimonial(test)}
                          className="p-1.5 text-slate-600 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(test.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= SETTINGS TAB ================= */}
            {currentTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Company Settings</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Update global contact information, email, phone, and corporate address
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Brand Name
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Direct Telephone Line
                    </label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Office Physical Address
                    </label>
                    <textarea
                      rows={2}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Save Global Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================= SETUP & DEPLOYMENT TAB ================= */}
            {currentTab === 'setup' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Firebase & Cloudinary Deployment Guide
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Step-by-step instructions to connect real cloud credentials to Arilsync Technology
                  </p>
                </div>

                <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
                  
                  {/* Step 1: Firebase */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      Firebase Firestore & Authentication Setup
                    </h4>
                    <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
                      <li>Go to the <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">Firebase Console</a> and create a new project (e.g. <code>arilsync-tech</code>).</li>
                      <li>In <strong>Build → Authentication</strong>, click Get Started and enable <strong>Email/Password</strong> sign-in.</li>
                      <li>In <strong>Build → Firestore Database</strong>, click Create Database (Production Mode).</li>
                      <li>In Project Settings → General, click the <strong>&lt;/&gt; Web App</strong> icon to register your app.</li>
                      <li>Copy the credentials and paste them into your <code>.env</code> file:</li>
                    </ol>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto">
{`VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="arilsync-tech.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="arilsync-tech"
VITE_FIREBASE_STORAGE_BUCKET="arilsync-tech.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcdef"`}
                    </pre>
                    <p className="text-slate-500">
                      Note: The security rules from <code>firestore.rules</code> restrict write operations to authenticated administrators while keeping public portfolio read access open.
                    </p>
                  </div>

                  {/* Step 2: Cloudinary */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        2
                      </span>
                      Cloudinary Image Hosting & Upload Preset Setup
                    </h4>
                    <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
                      <li>Create a free account at <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">Cloudinary.com</a>.</li>
                      <li>In your Cloudinary Dashboard, copy your <strong>Cloud Name</strong>.</li>
                      <li>Go to <strong>Settings → Upload</strong>, scroll to <strong>Upload Presets</strong>, and click <strong>Add upload preset</strong>.</li>
                      <li>Set <strong>Signing Mode</strong> to <span className="font-semibold text-slate-900">Unsigned</span>, name it (e.g. <code>arilsync_unsigned</code>), and click Save.</li>
                      <li>Add these values to your <code>.env</code> file:</li>
                    </ol>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto">
{`VITE_CLOUDINARY_CLOUD_NAME="your-cloud-name"
VITE_CLOUDINARY_UPLOAD_PRESET="arilsync_unsigned"`}
                    </pre>
                  </div>

                  {/* Step 3: Production Build & Deploy */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        3
                      </span>
                      Production Build & Hosting (Vercel / Firebase Hosting)
                    </h4>
                    <p className="text-slate-600">
                      Run the production build:
                    </p>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px]">
npm run build
                    </pre>
                    <p className="text-slate-600">
                      Deploy the resulting <code>dist/</code> folder to Vercel, Firebase Hosting, or Cloud Run. Add the environment variables in your hosting provider's dashboard.
                    </p>
                  </div>

                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};
