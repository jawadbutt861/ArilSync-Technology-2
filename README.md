# Arilsync Technology — Software House & Engineering Studio

A professional, high-performance website and administrative management portal for **Arilsync Technology**, a premier software development studio offering Web Development, Mobile App Development, AI Integration, UI/UX Design, and Custom Enterprise Software.

---

## 🚀 Key Highlights & Architecture

- **Public Site**:
  - **Home**: Corporate-tech hero with 8k engineering studio photography, verified metrics, core services overview, engineering principles, featured case studies, and client endorsements.
  - **Services**: Deep dives into all 5 disciplines (Web, Mobile, AI, UI/UX, Custom Software) with deterministic deliverables, tech stacks, and an **Interactive Scope & Timeline Estimator**.
  - **Portfolio**: Filterable case studies with quantitative outcome badges, technology tags, and full modal case study deep dives (Challenge, Solution, Architecture).
  - **Pricing**: Transparent milestone packages (Sprint MVP, Dedicated Pod, Enterprise Custom), feature lists, and detailed FAQ.
  - **About**: Company genesis, leadership profiles, non-negotiable engineering principles, and headquarters location.
  - **Contact**: Validated client discovery form with real-time feedback, direct channel listings, and automatic lead logging.
- **Admin Dashboard** (Protected route — completely excluded from public navigation, accessible exclusively via URL `/admin` or `#admin`):
  - **Authentication**: Firebase Authentication (Email/Password) with seamless local fallback admin (`admin@arilsync.com` / `admin123`) for instant testing.
  - **Lead Management**: Review incoming project inquiries, update status (`new`, `contacted`, `in_progress`, `archived`), and view technical requirements.
  - **Portfolio CMS**: Full CRUD operations for projects with custom tags, outcomes, and **Cloudinary Image Upload Widget** integration.
  - **Pricing CMS**: Manage public tiers, highlights, pricing, and feature bullets.
  - **Testimonials CMS**: Manage client endorsements, roles, and metrics.
  - **Settings CMS**: Update contact email, phone, physical address, and company brand info.

---

## 🛠️ Environment Variables Configuration

Copy `.env.example` to `.env` (or configure in your deployment dashboard):

```bash
# Firebase Configuration (Vite Client Env)
VITE_FIREBASE_API_KEY="your-firebase-api-key"
VITE_FIREBASE_AUTH_DOMAIN="arilsync-tech.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="arilsync-tech"
VITE_FIREBASE_STORAGE_BUCKET="arilsync-tech.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789012"
VITE_FIREBASE_APP_ID="1:123456789012:web:abcdef123456"
VITE_FIREBASE_DATABASE_ID="(default)"

# Cloudinary Configuration (Client Media Hosting)
VITE_CLOUDINARY_CLOUD_NAME="arilsync-tech"
VITE_CLOUDINARY_UPLOAD_PRESET="arilsync_unsigned_preset"
VITE_CLOUDINARY_API_KEY="123456789012345"
```

> **Note on Zero-Downtime Fallback**: If Firebase or Cloudinary environment keys are kept as default placeholders, the application automatically runs in self-contained persistent mode with full CRUD capability and pre-curated 8K assets, so the site and admin portal are immediately testable.

---

## 📋 Setup & Deployment Instructions

### 1. Firebase Project Setup
1. Open the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g., `arilsync-tech`).
2. Go to **Authentication → Sign-in method**, click **Add new provider**, and enable **Email/Password**.
3. Under the **Users** tab, click **Add user** to create your primary administrator account (e.g. `admin@arilsync.com` with a secure password).
4. Go to **Firestore Database**, click **Create database**, and select **Start in production mode**.
5. Go to **Project settings → General**, scroll to **Your apps**, click the **Web (</>)** icon, and register the app to obtain your Firebase config keys.
6. Deploy the hardened security rules from `firestore.rules` (which restrict write access to authenticated administrators while keeping public read access open for portfolio and services).

### 2. Cloudinary Setup (For Project Media & Screenshots)
1. Register for a free account at [Cloudinary](https://cloudinary.com/).
2. On your Cloudinary Dashboard, copy your **Cloud Name**.
3. Navigate to **Settings (gear icon) → Upload → Upload presets**.
4. Click **Add upload preset**, set **Signing Mode** to **Unsigned**, name it `arilsync_unsigned_preset` (or your preferred name), and save.
5. Paste `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` into your `.env` file.

### 3. Local Development
```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev
```

### 4. Production Build & Deployment (Vercel / Firebase Hosting)
```bash
# Build optimized static bundle
npm run build
```
Deploy the output `dist/` directory to **Vercel**, **Firebase Hosting**, or **Cloud Run**:
- **Firebase Hosting**:
  ```bash
  firebase init hosting
  firebase deploy --only hosting
  ```
- **Vercel**: Import the GitHub repository, set Build Command to `npm run build`, Output Directory to `dist`, and add the environment variables in Project Settings.

---

## 📁 File Structure

```
├── firebase-blueprint.json    # Intermediate schema representation
├── firestore.rules            # Hardened Firestore security rules (Admin write / Public read)
├── .env.example               # Config placeholders for Firebase & Cloudinary
├── src/
│   ├── assets/images/         # High-resolution generated studio and project assets
│   ├── components/
│   │   ├── Navbar.tsx         # 3-Zone top bar contract (Brand, Links, Actions)
│   │   ├── Footer.tsx         # Quiet authoritative corporate footer
│   │   └── CloudinaryUploadModal.tsx  # Direct Cloudinary uploader & asset selector
│   ├── context/
│   │   └── AuthContext.tsx    # Firebase Auth provider with local demo session support
│   ├── data/
│   │   └── initialData.ts     # Realistic seed data (Services, Case Studies, Pricing, Reviews)
│   ├── services/
│   │   ├── firebase.ts        # Firebase app & Firestore initialization
│   │   ├── cloudinary.ts      # Cloudinary upload API & auto-transformations
│   │   └── dataStore.ts       # Unified data layer with Firestore + persistent storage
│   ├── pages/
│   │   ├── HomePage.tsx       # Corporate hero, capabilities, principles, case studies
│   │   ├── ServicesPage.tsx   # Detailed 5 disciplines + interactive scope calculator
│   │   ├── PortfolioPage.tsx  # Filterable grid + modal case study view
│   │   ├── PricingPage.tsx    # Milestone packages, pod retainers & FAQ
│   │   ├── AboutPage.tsx      # Origin story, non-negotiable principles, leadership
│   │   ├── ContactPage.tsx    # Lead intake form with real-time validation & direct SLA
│   │   └── AdminDashboard.tsx # Protected admin console with full CRUD & setup guide
│   ├── types/
│   │   └── index.ts           # TypeScript models
│   ├── App.tsx                # Master routing, modal coordinator, and data provider
│   └── index.css              # Tailwind CSS v4 styling & typography
```
