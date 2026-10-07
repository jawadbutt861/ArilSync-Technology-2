import { Service, PortfolioProject, PricingPlan, Testimonial, CompanySettings, Industry, GlobalOffice, InsightArticle } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-digital',
    title: 'Digital Engineering & Modern Web Platforms',
    slug: 'digital-engineering',
    category: 'web',
    description: 'Mission-critical digital transformation and high-concurrency web platforms engineered with Next.js, React, micro-frontends, and distributed backend architectures. Designed for sub-100ms latency, high availability, and massive consumer scale.',
    icon: 'Globe',
    deliverables: [
      'Micro-frontend architectures & high-throughput API gateways',
      'Server-side rendering (SSR), Edge caching & dynamic static generation',
      'End-to-end type safety with TypeScript & PostgreSQL/distributed databases',
      'Automated zero-downtime CI/CD pipelines & containerized orchestration'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
    order: 1
  },
  {
    id: 'srv-cloud',
    title: 'Cloud Transformation & Managed DevOps',
    slug: 'cloud-transformation',
    category: 'cloud',
    description: 'Enterprise cloud migration, multi-cloud strategy, and Kubernetes-orchestrated infrastructure on AWS, Azure, and Google Cloud Platform. Modernize legacy monolithic systems into resilient cloud-native architectures.',
    icon: 'Cloud',
    deliverables: [
      'Cloud readiness assessment & legacy migration execution',
      'Multi-cloud infrastructure as code (Terraform, Pulumi)',
      'Enterprise Kubernetes clustering & service mesh (Istio)',
      '24/7 Cloud Operations Center (NOC) & continuous cost optimization'
    ],
    techStack: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Datadog'],
    order: 2
  },
  {
    id: 'srv-ai',
    title: 'Data, Analytics & Generative AI',
    slug: 'data-ai-analytics',
    category: 'ai',
    description: 'Enterprise data modernization and production-grade Generative AI integration. We build custom RAG pipelines, predictive machine learning models, autonomous agent frameworks, and unified data lakehouses.',
    icon: 'Cpu',
    deliverables: [
      'Enterprise LLM orchestration & structured JSON tool calling',
      'RAG pipeline engineering with high-dimensional vector databases',
      'Data lakehouse implementation (Snowflake, Databricks, BigQuery)',
      'Predictive analytics, computer vision & real-time anomaly detection'
    ],
    techStack: ['Gemini API', 'OpenAI', 'Python', 'LangChain', 'Databricks', 'Pinecone', 'Snowflake'],
    order: 3
  },
  {
    id: 'srv-mobile',
    title: 'Mobile Engineering & Connected Apps',
    slug: 'mobile-app-development',
    category: 'mobile',
    description: 'Cross-platform iOS and Android mobile solutions designed for banking-grade security, native performance, offline-first data synchronization, and hardware IoT sensor integration.',
    icon: 'Smartphone',
    deliverables: [
      'Cross-platform iOS & Android mobile codebases (React Native/Flutter)',
      'Biometric authentication, tokenization & secure hardware enclave',
      'Offline-first synchronization & encrypted SQLite/Realm storage',
      'Push notification orchestration & real-time messaging'
    ],
    techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
    order: 4
  },
  {
    id: 'srv-security',
    title: 'Cybersecurity, Zero-Trust & SOC Services',
    slug: 'cybersecurity-soc',
    category: 'security',
    description: 'Comprehensive cybersecurity consulting, 24/7 Security Operations Center (SOC), Identity & Access Management (IAM), and compliance audits adhering to SOC 2, ISO 27001, PCI-DSS, and HIPAA.',
    icon: 'Shield',
    deliverables: [
      'Zero-Trust network architecture & cloud workload protection',
      '24/7 SOC monitoring, SIEM integration & incident response',
      'Identity & Access Management (Okta, Azure AD, OAuth2, SAML)',
      'Penetration testing, code vulnerability auditing & compliance certifications'
    ],
    techStack: ['Zero-Trust', 'Splunk', 'CrowdStrike', 'Okta', 'Vault', 'OWASP'],
    order: 5
  },
  {
    id: 'srv-bpo',
    title: 'Enterprise Business Applications & BPO',
    slug: 'business-applications-bpo',
    category: 'bpo',
    description: 'Core enterprise business solutions including Microsoft Dynamics 365, SAP, Salesforce, and bespoke ERP/CRM systems combined with high-velocity Business Process Outsourcing and dedicated tech pods.',
    icon: 'Layers',
    deliverables: [
      'Enterprise ERP/CRM implementation (SAP, Dynamics 365, Salesforce)',
      'Core banking modernization & Temenos certified integrations',
      'Dedicated engineering pods & staff augmentation models',
      'Digital workflow automation & RPA (UiPath, Power Automate)'
    ],
    techStack: ['Microsoft Dynamics 365', 'SAP', 'Salesforce', 'Temenos', 'Power Automate', 'Go'],
    order: 6
  }
];

export const INITIAL_INDUSTRIES: Industry[] = [
  {
    id: 'ind-banking',
    title: 'Banking & Financial Services',
    slug: 'banking-financial-services',
    tagline: 'Building the Banks of the Future',
    description: 'Enabling digital banking transformation with core modernization, Temenos integration, frictionless neo-banking mobile apps, real-time AML fraud detection, and open banking API ecosystems.',
    icon: 'Landmark',
    imageUrl: '/src/assets/images/systems_banking_future_1790416178531.jpg',
    capabilities: [
      'Core Banking Modernization & Temenos Implementation',
      'Omnichannel Digital Retail & Corporate Banking Apps',
      'Real-Time Fraud Prevention & AI Risk Scoring',
      'Open Banking APIs, Payment Rails & ISO 20022 Compliance'
    ],
    metrics: ['+300% Core Transaction Speed', '40M+ Accounts Powered', '$1.2B Daily Payments'],
    order: 1
  },
  {
    id: 'ind-telecom',
    title: 'Telecommunications & Media',
    slug: 'telecommunications-media',
    tagline: 'Accelerating Telco-to-Techco Modernization',
    description: 'Empowering telecom carriers with next-gen BSS/OSS digital architectures, 5G self-care portals, high-throughput rating & billing engines, and predictive churn prevention.',
    icon: 'Radio',
    imageUrl: '/src/assets/images/systems_cloud_telecom_1790416200420.jpg',
    capabilities: [
      'Digital BSS / OSS Architecture Transformation',
      'High-Concurrency 5G Subscriber Portals & eSIM Provisioning',
      'Real-Time Event Stream Billing & Rating Engines',
      'Predictive Customer Lifetime Value & AI Churn Mitigation'
    ],
    metrics: ['99.999% Service Availability', '18M+ Active Subscribers', '-40% Churn Latency'],
    order: 2
  },
  {
    id: 'ind-retail',
    title: 'Retail, E-commerce & CPG',
    slug: 'retail-cpg',
    tagline: 'Intelligent Unified Commerce & Autonomous Supply',
    description: 'Reinventing consumer retail experiences through headless commerce platforms, automated AI demand forecasting, real-time inventory synchronization, and omnichannel fulfillment.',
    icon: 'ShoppingBag',
    imageUrl: '/src/assets/images/project_ai_logistics_1790413559668.jpg',
    capabilities: [
      'Composable Headless Commerce & Multi-Storefront Platforms',
      'AI Demand Forecasting & Predictive Replenishment',
      'Omnichannel POS & Real-Time Warehouse Telemetry',
      'Dynamic Personalization & AI Recommendation Engines'
    ],
    metrics: ['+48% Online Conversion Rate', '350+ Distribution Centers', 'Sub-second Stock Sync'],
    order: 3
  },
  {
    id: 'ind-healthcare',
    title: 'Healthcare & Life Sciences',
    slug: 'healthcare-life-sciences',
    tagline: 'Connected, Compliant & Patient-Centric Care',
    description: 'Pioneering HIPAA-compliant digital patient portals, telemedicine streaming platforms, EHR/EMR FHIR interoperability bridges, and clinical trial workflow automation.',
    icon: 'HeartPulse',
    imageUrl: '/src/assets/images/project_health_app_1790413545174.jpg',
    capabilities: [
      'HIPAA & GDPR Compliant Telehealth Video Infrastructures',
      'FHIR & HL7 EHR/EMR Interoperability Gateways',
      'Remote Patient Monitoring (RPM) IoT Sensor Integration',
      'Clinical Documentation Summarization with Medical LLMs'
    ],
    metrics: ['120,000+ Patient Consultations', '100% HIPAA Compliance Pass', 'Zero Audit Violations'],
    order: 4
  },
  {
    id: 'ind-public',
    title: 'Public Sector & Smart Governance',
    slug: 'public-sector',
    tagline: 'Citizen-Centric Digital Public Infrastructure',
    description: 'Architecting secure citizen service portals, digital revenue & taxation frameworks, electronic identity ecosystems, and municipal telemetry for sovereign state operations.',
    icon: 'Building2',
    imageUrl: '/src/assets/images/systems_hero_digital_1790416160024.jpg',
    capabilities: [
      'National Citizen Identity & Digital Service Portals',
      'Taxation & Revenue Administration Cloud Modernization',
      'High-Security Government Multi-Tenant Cloud Architecture',
      'Municipal Smart City IoT Telemetry & Incident Dispatch'
    ],
    metrics: ['25M+ Citizens Served', '75% Faster Processing', 'ISO 27001 Certified'],
    order: 5
  }
];

export const ENTERPRISE_PARTNERS = [
  { name: 'Microsoft', tier: 'Solutions Partner & Global Partner of the Year', logoText: 'Microsoft' },
  { name: 'Amazon Web Services', tier: 'AWS Advanced Tier Services Partner', logoText: 'AWS' },
  { name: 'Google Cloud', tier: 'Premier Partner - Cloud & AI', logoText: 'Google Cloud' },
  { name: 'Temenos', tier: 'Certified Core Banking Implementation Partner', logoText: 'TEMENOS' },
  { name: 'SAP', tier: 'Gold Partner - Enterprise Modernization', logoText: 'SAP' },
  { name: 'Salesforce', tier: 'Ridge Consulting Partner', logoText: 'Salesforce' },
  { name: 'IBM', tier: 'Platinum Ecosystem Partner', logoText: 'IBM' },
];

export const GLOBAL_OFFICES: GlobalOffice[] = [
  {
    region: 'North America',
    city: 'San Francisco',
    country: 'United States',
    address: '750 Battery St, Suite 400, Financial District, CA 94111',
    email: 'usa@arilsync.com',
    phone: '+1 (555) 389-2041',
    isHeadquarters: true
  },
  {
    region: 'North America',
    city: 'New York',
    country: 'United States',
    address: 'Rockefeller Plaza, 14th Floor, NY 10020',
    email: 'ny@arilsync.com',
    phone: '+1 (212) 555-0199'
  },
  {
    region: 'Europe',
    city: 'London',
    country: 'United Kingdom',
    address: '1 Canada Square, Canary Wharf, London E14 5AA',
    email: 'uk@arilsync.com',
    phone: '+44 20 7946 0912'
  },
  {
    region: 'Middle East',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'DIFC Gate Precinct 4, Level 7, Dubai',
    email: 'uae@arilsync.com',
    phone: '+971 4 362 7000'
  },
  {
    region: 'Middle East',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    address: 'King Fahd Road, Al Olaya District, Riyadh 12213',
    email: 'ksa@arilsync.com',
    phone: '+966 11 462 8900'
  },
  {
    region: 'Asia-Pacific',
    city: 'Singapore',
    country: 'Singapore',
    address: 'Marina Bay Financial Centre Tower 1, Singapore 018981',
    email: 'sg@arilsync.com',
    phone: '+65 6818 6000'
  },
  {
    region: 'South Asia Hub',
    city: 'Lahore',
    country: 'Pakistan',
    address: 'Arilsync Technology Park, E-1, Seepz Industrial Zone',
    email: 'pk@arilsync.com',
    phone: '+92 42 111 797 836'
  },
  {
    region: 'South Asia Hub',
    city: 'Karachi',
    country: 'Pakistan',
    address: 'Clifton Financial Tower, Marine Drive, Karachi',
    email: 'khi@arilsync.com',
    phone: '+92 21 3587 4000'
  }
];

export const AWARDS_RECOGNITION = [
  {
    title: "Forbes Asia's Best Under A Billion",
    awarder: 'Forbes Asia',
    year: '2024 & Consecutive Years',
    desc: 'Recognized among top publicly traded high-growth enterprises across the Asia-Pacific region.'
  },
  {
    title: 'Microsoft Country Partner of the Year',
    awarder: 'Microsoft Corporation',
    year: '2023 - 2025',
    desc: 'Awarded for premier innovation and enterprise cloud delivery on Microsoft Azure and Dynamics 365.'
  },
  {
    title: 'Temenos Regional Partner of Excellence',
    awarder: 'Temenos Banking Software',
    year: '2024',
    desc: 'Honored for exceptional delivery of core banking transformations across Middle East and South Asia.'
  },
  {
    title: 'CMMI Level 5 & ISO 27001 Certified',
    awarder: 'CMMI Institute & BSI Group',
    year: 'Continuous Certification',
    desc: 'The highest global rating for software engineering maturity, process discipline, and data security.'
  }
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'ins-1',
    title: 'Building Banks of the Future: The Architectural Blueprint for Real-Time Core Modernization',
    category: 'Banking & Financial',
    readTime: '6 min read',
    date: 'Sep 2026',
    summary: 'How tier-1 financial institutions are decoupling monolithic core engines into event-driven microservices to support instant multi-currency settlement.',
    author: 'Tariq Al-Mansoor',
    authorRole: 'Chief Systems Architect',
    featured: true
  },
  {
    id: 'ins-2',
    title: 'Operationalizing Generative AI at Scale: Guardrails, Vector Retrieval, and Cost Governance',
    category: 'AI & Data Intelligence',
    readTime: '8 min read',
    date: 'Aug 2026',
    summary: 'Moving beyond proof-of-concept chatbots. A comprehensive engineering guide to RAG pipelines, deterministic JSON output guarantees, and sub-second semantic retrieval.',
    author: 'Dr. Rebecca Hastings',
    authorRole: 'VP of AI & Engineering',
    featured: true
  },
  {
    id: 'ins-3',
    title: 'Next-Gen Telco Architecture: From Legacy OSS to Cloud-Native Distributed Microservices',
    category: 'Telecommunications',
    readTime: '5 min read',
    date: 'Jul 2026',
    summary: 'Transforming telecom BSS/OSS stacks to support dynamic 5G slice provisioning, zero-touch network orchestration, and real-time subscriber self-care.',
    author: 'Zane Gallagher',
    authorRole: 'Principal Systems Technologist',
    featured: false
  },
  {
    id: 'ins-4',
    title: 'Autonomous Supply Chains: Leveraging Predictive Machine Learning for Resilient Fulfillment',
    category: 'Retail & CPG',
    readTime: '7 min read',
    date: 'Jun 2026',
    summary: 'How multi-brand retailers slash inventory carrying costs by 32% using real-time IoT sensor telemetry and dynamic route constraint-solving AI models.',
    author: 'Julian Sterling',
    authorRole: 'Principal Logistics Consultant',
    featured: false
  }
];

export const INITIAL_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj-finscale',
    title: 'FinScale Capital: Real-Time Institutional Trading Terminal',
    slug: 'finscale-trading-terminal',
    category: 'Banking & Financial Services',
    client: 'FinScale Markets Inc.',
    description: 'A low-latency web application handling institutional asset portfolios with sub-second websocket streaming, risk calculation models, and multi-factor compliance validation.',
    imageUrl: '/src/assets/images/project_fintech_platform_1790413528716.jpg',
    tags: ['React', 'Next.js', 'TypeScript', 'WebSockets', 'Tailwind CSS'],
    link: 'https://example.com/case-studies/finscale',
    metric: '+310% Trading Throughput',
    challenge: 'FinScale suffered from legacy monolithic UI rendering delays, resulting in severe 800ms DOM freezing during high market volatility events.',
    solution: 'Re-architected the client application using virtualized data grids, Web Workers for local calculation offloading, and WebSocket packet compression.',
    order: 1
  },
  {
    id: 'proj-caresync',
    title: 'CareSync Mobile: Telehealth & Clinical Vitals Ecosystem',
    slug: 'caresync-mobile-telehealth',
    category: 'Healthcare & Life Sciences',
    client: 'CareSync Health Group',
    description: 'A HIPAA-compliant mobile application connecting over 85,000 patients with clinical specialists, supporting end-to-end encrypted video consultations and wearable device synchronization.',
    imageUrl: '/src/assets/images/project_health_app_1790413545174.jpg',
    tags: ['React Native', 'WebRTC', 'Node.js', 'HealthKit', 'Security'],
    link: 'https://example.com/case-studies/caresync',
    metric: '85,000+ Active Patients',
    challenge: 'Unreliable network connectivity in rural clinics caused dropped video calls and desynchronized electronic health record writes.',
    solution: 'Built an offline-first sync engine with local encrypted SQLite cache, automatic WebRTC renegotiation, and zero-loss background queue processing.',
    order: 2
  },
  {
    id: 'proj-orbitai',
    title: 'Orbit Logistics: Autonomous Dispatch & Fleet AI Routing',
    slug: 'orbit-logistics-ai',
    category: 'Retail & CPG Logistics',
    client: 'Orbit Freight Global',
    description: 'An AI-powered logistics control room predicting route congestions, generating dynamic multi-stop dispatch plans, and slashing fuel costs across 2,400 commercial freight vehicles.',
    imageUrl: '/src/assets/images/project_ai_logistics_1790413559668.jpg',
    tags: ['Python', 'Gemini AI', 'FastAPI', 'React', 'PostGIS'],
    link: 'https://example.com/case-studies/orbit-freight',
    metric: '-28% Fleet Operating Costs',
    challenge: 'Manual dispatchers spent 4.2 hours daily matching erratic shipment arrivals against variable driver rest hours and municipal weight restrictions.',
    solution: 'Deployed a real-time constraint-solving AI engine utilizing Gemini LLM structured outputs to generate compliant dispatch routes in under 4 seconds.',
    order: 3
  },
  {
    id: 'proj-novasaas',
    title: 'Aura Design System & SaaS Modernization',
    slug: 'aura-design-system',
    category: 'UI/UX & Design Systems',
    client: 'Nova Systems Tech',
    description: 'Complete corporate redesign and modular component library development for an enterprise workforce management platform serving 400+ B2B companies.',
    imageUrl: '/src/assets/images/hero_software_studio_1790413507514.jpg',
    tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Storybook', 'WCAG AA'],
    link: 'https://example.com/case-studies/aura-system',
    metric: '-44% Development Cycle Time',
    challenge: 'Seven distinct engineering teams were duplicating interface code with inconsistent styles, driving up bug tickets and slowing feature releases.',
    solution: 'Engineered a unified 64-component accessible design system in Figma and React with automatic token deployment to npm.',
    order: 4
  }
];

export const INITIAL_PRICING: PricingPlan[] = [
  {
    id: 'plan-starter',
    planName: 'Sprint MVP',
    price: '$8,500',
    period: 'per project milestone',
    description: 'Targeted execution for early-stage ventures and enterprise innovation labs needing a production-ready MVP in 4–6 weeks.',
    features: [
      'Comprehensive system architecture & technical scope',
      'Full-stack Next.js or React Native application',
      'Database schema design (PostgreSQL or Firestore)',
      'Authentication, role permissions & billing integration',
      'Automated staging and production deployment',
      '30-day post-launch warranty and bug fixes'
    ],
    highlighted: false,
    order: 1
  },
  {
    id: 'plan-growth',
    planName: 'Dedicated Engineering Pod',
    price: '$14,500',
    period: 'per month',
    description: 'A full-cycle dedicated software team (Lead Architect, Senior Full-Stack Engineer, and UI/UX Designer) embedded directly into your workflow.',
    features: [
      'Dedicated senior software engineering capacity (160h/mo)',
      'Direct Slack / Discord communication with developers',
      'Bi-weekly production sprint releases & code reviews',
      'AI integration & cloud infrastructure optimization',
      'Continuous automated testing and CI/CD pipelines',
      'Complete intellectual property ownership on every commit'
    ],
    highlighted: true,
    badge: 'Most Popular',
    order: 2
  },
  {
    id: 'plan-enterprise',
    planName: 'Enterprise Custom Scope',
    price: 'Custom',
    period: 'tailored timeline',
    description: 'Bespoke architecture, distributed cloud systems, and legacy modernizations for established global enterprises with stringent compliance requirements.',
    features: [
      'Dedicated Solution Architect & Project Principal',
      'SOC2, HIPAA, and GDPR compliance-ready architecture',
      'High-concurrency distributed systems engineering',
      '24/7 incident response SLA & dedicated infrastructure',
      'Custom on-premise or private cloud VPC deployment',
      'Comprehensive staff training and architectural handoff'
    ],
    highlighted: false,
    order: 3
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Elena Rostova',
    role: 'Chief Technology Officer',
    company: 'FinScale Markets Inc.',
    quote: 'Arilsync Technology completely elevated our institutional trading infrastructure. Their architectural rigor and discipline in Next.js and WebSockets allowed us to cut interface latency by 64% while scaling to institutional transaction volumes.',
    metric: '+310% Trading Throughput',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    order: 1
  },
  {
    id: 'test-2',
    clientName: 'Dr. Marcus Vance',
    role: 'VP of Product',
    company: 'CareSync Health Group',
    quote: 'Finding engineering partners who truly understand both modern mobile standards and strict HIPAA data isolation is exceedingly rare. Arilsync delivered our telehealth app ahead of schedule, passing rigorous third-party audits on the very first try.',
    metric: '85,000+ Active Patients',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    order: 2
  },
  {
    id: 'test-3',
    clientName: 'Julian Sterling',
    role: 'Managing Director & Founder',
    company: 'Orbit Freight Global',
    quote: 'The AI dispatch engine Arilsync engineered for our commercial logistics fleet delivered an immediate 28% reduction in fuel waste. They didn’t just write code; they sat down with our dispatchers to understand operational reality.',
    metric: '-28% Operating Costs',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    order: 3
  },
  {
    id: 'test-4',
    clientName: 'Sophia Lin',
    role: 'Head of Engineering',
    company: 'Nova Systems Tech',
    quote: 'The design system and component architecture Arilsync built transformed our 40-engineer product organization. Feature delivery times fell by nearly half, and our customer satisfaction scores reached an all-time high.',
    metric: '-44% Cycle Time',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    order: 4
  }
];

export const INITIAL_SETTINGS: CompanySettings = {
  companyName: 'Arilsync Systems Technology',
  tagline: 'Enabling a digital tomorrow with next-gen Cloud, AI, and Enterprise Engineering.',
  email: 'contact@arilsync.com',
  phone: '+1 (555) 389-2041',
  address: '750 Battery St, Suite 400, Financial District, San Francisco, CA 94111',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/arilsync-tech',
    github: 'https://github.com/arilsync-technology',
    twitter: 'https://x.com/arilsynctech'
  }
};

