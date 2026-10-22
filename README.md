# ProcureSphere 360 — Production Frontend Handover

Enterprise procurement platform web frontend built with **React 19**, **TypeScript**, and **Vite**.

This distribution is optimized, security-audited, and integration-ready for production deployment.

---

## 1. Verified Technology Stack & Requirements

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime / UI** | React / React-DOM | `19.3.0` | Core UI component hierarchy |
| **Build Tool** | Vite | `8.3.1` | ESM development server & Rollup bundler |
| **Language** | TypeScript | `7.0.2` | Static type checking (`ES2020` target) |
| **Client Routing**| React Router DOM | `^7.18.4` | Client-side SPA routing |
| **Motion & FX** | Framer Motion | `^14.0.0` | Declarative UI animations & layout transitions |
| **Icons** | Phosphor Icons React | `2.1.10` | Enterprise vector iconography |
| **Lottie** | DotLottie React | `^0.20.0` | Compact animated vector graphics |

### System Requirements
- **Node.js**: `v18.0.0+` or `v20.0.0+` (LTS recommended)
- **Package Manager**: `npm` (`v9.0.0+` or `v10.0.0+`). Package lockfile is strictly npm-compatible.

---

## 2. Quick Start & Setup Instructions

### 1. Install Exact Dependencies
Always use `npm ci` to install exact dependency versions from `package-lock.json`:
```bash
npm ci
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 3. Production Build
Compile TypeScript and generate the minified production distribution bundle:
```bash
npm run build
```
Build output is emitted to the `dist/` directory.

### 4. Static Type Checking
Run strict TypeScript compilation check without emitting files:
```bash
npm run typecheck
```

### 5. Preview Production Build
Preview the production build locally:
```bash
npm run preview
```
Previews the built `dist/` bundle at `http://localhost:3000`.

---

## 3. Project & Asset Organization

```
procuresphere/
├── README.md               # Frontend team handover documentation
├── PORTABLE-RUN.md         # Motion and animation runtime guide
├── ideas.md                # Design brief, tokens, and aesthetic principles
├── app.config.ts           # Standalone branding configuration
├── index.html              # HTML entry template, SEO meta tags, font preconnects
├── package.json            # Project manifest, scripts, and dependencies
├── package-lock.json       # Exact dependency lockfile
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Vite tooling
├── vercel.json             # Vercel SPA rewrite configuration
├── .gitignore              # Production git hygiene exclusions
├── public/                 # Static assets served from root URL
│   ├── _redirects          # SPA fallback rule for Netlify / Cloudflare Pages
│   ├── robots.txt          # Search engine crawler directives
│   ├── sitemap.xml         # XML sitemap
│   ├── procuresphere-mark.svg # Enterprise brand mark & favicon
│   ├── animation.webp      # High-framerate animated product demonstration
│   ├── handshake.gif       # Partner trust animation
│   ├── hero-video-matched.mp4 # Hero background video
│   ├── footer-video.mp4    # Footer ambient video
│   ├── videos/
│   │   └── intro.mp4       # Platform overview video
│   ├── login-states/       # Interactive assistant state illustrations (.webp)
│   │   ├── normal.webp     # Ready / Default state
│   │   ├── password-typing.webp # Eyes covered during typing
│   │   ├── login-failed.webp    # Error / Retry state
│   │   └── login-success.webp   # Authenticated state
│   └── roles/              # 3D interactive role cards (.webp)
│       ├── compliance/     # Active & idle role cards
│       ├── finance/        # Active & idle role cards
│       ├── legal/          # Active & idle role cards
│       ├── procurement/    # Active & idle role cards
│       ├── requester/      # Active & idle role cards
│       ├── stores/         # Active & idle role cards
│       └── vendor/         # Active & idle role cards
└── src/
    ├── main.tsx            # Application entry point & DOM mounting
    ├── App.tsx             # Root router orchestrator & homepage implementation
    ├── components/         # Modular React UI components
    │   ├── AnimatedBenefits.tsx       # Video benefits section with poster fallback
    │   ├── AnimatedFAQ.tsx            # Interactive accordion FAQ
    │   ├── AnimatedModulesStack.tsx   # Enterprise procurement modules showcase
    │   ├── CinematicGallery.tsx       # Image gallery component
    │   ├── DotLottieCardStack.tsx     # Lottie-powered card interaction
    │   ├── EditorialTestimonials.tsx  # Customer quote carousel with portraits
    │   ├── FullScreenLogin.tsx        # Interactive assistant authentication modal
    │   ├── GenericDashboard.tsx       # Role workspace mock dashboard
    │   ├── LegalModal.tsx             # Terms and Privacy modal dialogs
    │   ├── PageLayout.tsx             # Universal page wrapper (Nav & Footer)
    │   ├── PremiumHeading.tsx         # Staggered typography component
    │   └── StackModulesShowcase.tsx   # Detailed functional specifications
    ├── pages/              # Client-side route pages
    │   ├── AboutPage.tsx        # Company & platform narrative
    │   ├── ArchitecturePage.tsx # Enterprise infrastructure & security specs
    │   ├── BenefitsPage.tsx     # Quantifiable enterprise ROI metrics
    │   ├── FAQPage.tsx          # Procurement & integration answers
    │   ├── NotFoundPage.tsx     # Custom 404 page with 3D illustration
    │   ├── ProcessPage.tsx      # End-to-end procurement lifecycle
    │   ├── RolesPage.tsx        # Role-based governance and workspace access
    │   └── SolutionsPage.tsx    # Module deep-dives
    └── styles/             # Global CSS architecture
        ├── tokens.css      # CSS custom properties (colors, typography, shadows)
        ├── global.css      # Base typography, layout grid, keyframes
        ├── responsive.css  # Mobile breakpoints & viewport adjustments
        ├── tablet.css      # Tablet optimization rules
        └── uiverse.css     # Role card visual presentation
```

---

## 4. Client-Side Routing & Deployment

Routing is orchestrated via `react-router-dom` in `src/App.tsx`. The application contains **8 active routes**:
- `/` — Homepage (Interactive sphere, modules, role switcher, testimonials)
- `/about` — Platform mission and company background
- `/solutions` — Procurement module specifications
- `/benefits` — Enterprise ROI comparison matrix
- `/process` — 6-stage procurement lifecycle
- `/roles` — Role-based governance and workspace access
- `/faq` — Implementation, security, and pricing FAQ
- `*` — Custom 404 page (`NotFoundPage.tsx`)

### SPA Hosting Rewrites
For Single-Page Application (SPA) routing, all paths must rewrite to `/index.html`:
- **Vercel**: Configured via `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Netlify / Cloudflare Pages**: Configured via `public/_redirects`:
  ```
  /*    /index.html   200
  ```
- **Nginx / Custom Server**: Ensure `try_files $uri $uri/ /index.html;` is configured.

---

## 5. Security & Confidentiality Audit Summary

A repository-wide security inspection confirmed:
- **Zero Exposed Secrets**: No API keys, database connection strings, bearer tokens, private keys, or passwords exist in source files or Git history.
- **Environment Variables**: No `.env` files are required for current client-side presentation.
- **Mock Authentication**: The login assistant in `FullScreenLogin.tsx` uses simulated client-side state for UI demonstration.

---

## 6. Integration Requirements & Next Steps

When integrating into the production backend:
1. **Authentication**: Wire `FullScreenLogin.tsx` (`handleSubmit` in lines 95-127) to your OAuth 2.0 / SAML SSO identity provider.
2. **Dynamic RFQ & RFP Submission**: Connect the quote submission triggers in `src/App.tsx` and `src/pages/SolutionsPage.tsx` to procurement API endpoints.
3. **Environment Configuration**: If backend API endpoints are introduced, define `VITE_API_BASE_URL` in `.env.production` and load via `import.meta.env.VITE_API_BASE_URL`.
