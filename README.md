# Karat Financial — Growth Analysis

## Goal

1. **Map Karat's customer lifecycle** from discovery → evaluation → signup → activation → retention
2. **Identify friction points** at every stage — where creators drop off, get confused, or lose trust
3. **Benchmark against competitors** — how does Karat's experience compare to Found, Mercury, and traditional banks?
4. **Recommend highest-leverage fixes** — prioritized by impact, not just a list of everything wrong
5. **Produce phased PRs** for each friction point — scoped, actionable tasks that can be picked up and shipped, not vague suggestions
6. **Surface strategic gaps** — channels, content, and positioning opportunities Karat isn't pursuing

This is a **from-the-outside analysis** — we're working with what's publicly observable: the website, content, search presence, AI visibility, and product experience. We don't have access to internal analytics, ad platforms, or conversion data.

## 1. Customer Lifecycle

We will base the analysis around three stages of the customer journey:

### 1. Acquisition — How do creators discover and evaluate Karat?

- Website & landing pages
- SEO & content strategy
- GEO (AI/LLM visibility), and partnerships.

This is where a creator goes from "never heard of Karat" to "I'm going to sign up."

### 2. Onboarding — What happens between "Sign Up" and active usage?

- The signup flow + approval/waiting state
- First dashboard experience, and the path to first value.

This is tightly coupled with acquisition — a bad onboarding experience is an acquisition failure.

### 3. Retention — What keeps creators using Karat over time?

- Product stickiness (bookkeeping, tax tools, invoicing)
- Lifecycle marketing (email, push)
- Community (Creator Studio)
- Cross-sell between card and banking
- Churn risks.

---

## Cross-Cutting Concerns

These themes apply to every stage of the lifecycle and are evaluated throughout rather than in isolation:

- **Brand & design consistency** — Does the experience feel cohesive from marketing site → signup → product → emails?
- **Conversion optimization** — Are CTAs, copy, and page structure optimized at every decision point?
- **Trust & transparency** — Are rates, fees, security badges, and compliance disclosures placed where they matter?
- **Mobile experience** — Creator audiences skew mobile-heavy; Karat is iOS-only. How does every touchpoint perform on mobile?

---

## What We're Focusing On

| Area                           | Why                                                                                | Status         |
| ------------------------------ | ---------------------------------------------------------------------------------- | -------------- |
| Website & landing pages        | Primary conversion surface — where most creators form their first impression       | ✅ Complete    |
| SEO & content strategy         | Biggest long-term organic growth lever, currently underutilized                    | ✅ Complete    |
| GEO (AI/LLM visibility)        | Emerging channel — creators increasingly ask AI for financial tool recommendations | 🔲 Not started |
| Partnerships & distribution    | Karat has major partners (Visa, Spotify, CAA) — are they driving growth?           | 🔲 Not started |
| Onboarding flow                | The signup-to-active-user journey, including Phyllo integration                    | 🔲 Not started |
| Retention & product stickiness | What keeps creators engaged after activation                                       | 🔲 Not started |

## What We're NOT Focusing On

These are important but require internal access or data we can't obtain from the outside:

| Area                                        | Why We're Skipping It                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| Paid advertising (Meta, Google, TikTok ads) | No access to ad accounts; Meta Ad Library shows limited/no active campaigns |
| Referral program mechanics                  | No visible referral program exists; can't test what isn't there             |
| Internal analytics & conversion rates       | Requires access to Karat's analytics platform                               |
| App Store optimization (deep)               | Keyword ranking data requires paid tools (Sensor Tower, data.ai)            |
| Support quality & response times            | Would need to create real support tickets and wait                          |
| Email sequences (full)                      | Would need a funded account and 2-4 weeks of observation                    |

We'll note these as gaps and flag recommendations where relevant, but won't pretend to audit what we can't see.

---

## File Structure

```
karat-growth-audit/
├── README.md                  ← You are here
├── 00_company_context.md      ← What Karat is, product suite, funding, market position
├── audits/
│   ├── website.md             ← Website & landing page teardown (9 issues found)
│   ├── seo_and_content.md     ← SEO keyword gaps, content strategy
│   ├── geo.md                 ← AI/LLM visibility testing
│   ├── partnerships.md        ← Partner channel assessment
│   ├── onboarding.md          ← Signup flow & first-run experience
│   └── retention.md           ← Product stickiness & churn risks
├── tasks/
│   ├── p0_critical.md         ← Fix now — actively breaking conversion
│   ├── p1_high_impact.md      ← Fix this week — high-leverage improvements
│   ├── p2_strategic.md        ← Fix this month — content, positioning, new channels
│   └── backlog.md             ← Track later
└── reference/
    ├── navigation_audit.md    ← Full nav link matrix
    ├── deprecated_pages.md    ← Inventory of stale URLs still live
    └── competitor_matrix.md   ← Positioning vs Found, Mercury, etc.
```
# karat
