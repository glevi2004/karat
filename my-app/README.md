# Karat Onboarding Prototype

> UI playground resulting from the [Onboarding Audit](../audits/onboarding.md) — exploring what a decoupled, two-phase signup could look like.

This is **not** a production-ready app. It's a prototype for testing onboarding UX ideas — specifically the core proposal from the audit: **separate account creation from the KYB application** so users get an account in under 2 minutes and complete the business verification at their own pace.

---

## Two-Phase Onboarding

The audit found that Karat bundles account creation and the full KYB application into one session — 10 screens, 28 fields, 37 actions, no way back. Users who abandon mid-flow have no account, no re-engagement path, and no reason to return.

This prototype splits the flow into two distinct phases:

### Phase 1 — Account Creation (`/signup`)

Four lightweight steps to get the user into the product:

| Step | Fields | Purpose |
| ---- | ------ | ------- |
| 1 | Name, company, email, phone | Identity |
| 2 | Company website | Business context |
| 3 | Employee count, vertical | Segmentation |
| 4 | Password or Google OAuth | Credential |

**Result:** The user has an account. They can sign in, explore, and come back. Re-engagement emails have somewhere to point.

### Phase 2 — Business Verification (`/onboarding`)

Six steps for the full KYB application, completed from within the authenticated product:

| Step | Sidebar Label | Fields |
| ---- | ------------- | ------ |
| 1 | Business information | Structure, legal name, DBA, EIN, vertical, incorporation date/state, ownership, revenue, employees |
| 2 | Leaders and owners | Owner identity, DOB, SSN, personal address (Google Places autocomplete) |
| 3 | Leaders and owners | Company officer selection and title |
| 4 | Business address | Physical address (Google Places autocomplete), P.O. box restriction |
| 5 | Verify your socials | Connect TikTok, YouTube, Instagram, X, Twitch via Phyllo/MagicSocial |
| 6 | Review | Benefits summary, terms acceptance, submit |

**Key difference from current Karat:** Back buttons on every step. Progress sidebar. AI support. Users can leave and resume — the data is saved, the account persists.

---

## AI Assistant

An AI chat panel is available throughout onboarding and the dashboard. It answers questions about the process, Karat's products, and next steps — reducing the need to leave the flow.

- **Model:** Grok 4.1 Fast via OpenRouter
- **Streaming:** Server-Sent Events for real-time responses
- **Resizable:** 280px–800px sidebar
- **Contextual suggestions:** "How do I set up my business account?", "What are the AI bookkeeping features?", "How do I get a Karat credit card?"
- **Access:** "Support" button in onboarding header, "Ask AI" in dashboard

---

## Dashboard (`/dashboard`)

A mock banking dashboard showing what the user lands on after completing onboarding:

- Account overview with balance, card, and recent transactions
- AI bookkeeping banner
- P&L chart and spend categories
- Application status indicator
- Demo mode toggle (explore without real data)

---

## Key Features

- **Back navigation on every step** — addresses ONB-1 from the audit
- **Google Places autocomplete** — for personal and business addresses, reducing field friction
- **Platform verification modal** — redesigned Phyllo flow with pre-connection explainer (addresses ONB-5, ONB-6, ONB-7)
- **Dark theme onboarding** — distinct visual phase for the KYB flow, separating it from account creation
- **Progress sidebar** — 5 sidebar milestones map to 6 internal steps, so the user always knows where they are
- **Responsive design** — collapsible sidebar, mobile progress bar, adaptive layouts

---

## Architecture

```mermaid
graph TB
    subgraph Client["Client (Next.js App Router)"]
        Landing["/ Landing Page"]
        Signup["/signup — Phase 1<br/>4-step account creation"]
        Signin["/signin"]
        Onboarding["/onboarding — Phase 2<br/>6-step KYB application"]
        Dashboard["/dashboard"]

        Landing --> Signup
        Landing --> Signin
        Signup --> Onboarding
        Signin -->|onboarding incomplete| Onboarding
        Signin -->|onboarding complete| Dashboard
        Onboarding --> Dashboard
    end

    subgraph Components["Shared Components"]
        AIChatPanel["AI Chat Panel<br/>(resizable sidebar)"]
        ShadcnUI["shadcn/ui<br/>Button, Input, Select,<br/>Card, Dialog, etc."]
        Autocomplete["Google Places<br/>Autocomplete Hook"]
    end

    subgraph API["API Routes"]
        AuthAPI["/api/auth/signup<br/>/api/auth/signin"]
        OnboardAPI["/api/onboarding"]
        UserAPI["/api/user/me"]
        AIAPI["/api/ai-chat<br/>(SSE streaming)"]
    end

    subgraph External["External Services"]
        OpenRouter["OpenRouter<br/>(Grok 4.1 Fast)"]
        GooglePlaces["Google Places API"]
        Prisma["Prisma + SQLite"]
    end

    Signup --> AuthAPI
    Signin --> AuthAPI
    Onboarding --> OnboardAPI
    Dashboard --> UserAPI
    AIChatPanel --> AIAPI
    Autocomplete --> GooglePlaces
    AIAPI --> OpenRouter
    AuthAPI --> Prisma
    OnboardAPI --> Prisma
    UserAPI --> Prisma

    Onboarding -.-> AIChatPanel
    Dashboard -.-> AIChatPanel
    Onboarding -.-> Autocomplete
```

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript, React 19 |
| UI | shadcn/ui (New York), Radix UI, Tailwind CSS 4 |
| Database | Prisma 6.19 + SQLite |
| Auth | JWT + bcryptjs (prototype-only — not production auth) |
| AI | OpenRouter API → Grok 4.1 Fast |
| Maps | Google Places Autocomplete |
| Icons | Lucide React |

---

## Running Locally

```bash
cd my-app
cp .env.example .env.local   # Add OPENROUTER_API_KEY and GOOGLE_PLACES_API_KEY
npm install
npx prisma migrate dev
npm run dev
```

---

## Mapping to Audit Findings

This prototype addresses or demonstrates fixes for the following items from the [onboarding audit](../audits/onboarding.md):

| Finding | What This Prototype Does |
| ------- | ------------------------ |
| ONB-1 (No back navigation) | Back buttons on every step |
| ONB-2 (No account creation moment) | Phase 1 creates an account before KYB begins |
| ONB-3 (Step 1 field density) | Fields distributed across 4 signup steps + 6 onboarding steps |
| ONB-4 (MagicSocial intermediate screen) | Redesigned connection modal with context |
| ONB-5 (Second "Connect" modal) | Single-modal flow for platform verification |
| ONB-6 (Phyllo redirect bug) | Modal-based flow instead of redirect |
| ONB-7 (Phyllo brand on OAuth) | Pre-connection explainer screen |
| ONB-9 (Game disrupts context) | Replaced with review + confirmation step |
| ONB-10 (First dashboard message) | Dashboard shows status and next steps clearly |
| ONB-13 (Coupled account + application) | Decoupled into two distinct phases |
