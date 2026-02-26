# Karat Financial — Growth Analysis

> **Reference board:** [Karat Growth Audit — Visual Map](https://link.excalidraw.com/l/9QvXbs54mAb/7sPMMJ164Pe)

## Goal

1. **Map Karat's customer lifecycle** from discovery → evaluation → signup → activation → retention
2. **Identify friction points** at every stage — where creators drop off, get confused, or lose trust
3. **Benchmark against competitors** — how does Karat's experience compare to Found, Mercury, and traditional banks?
4. **Recommend highest-leverage fixes** — prioritized by impact, not just a list of everything wrong
5. **Produce phased PRs** for each friction point — scoped, actionable tasks that can be picked up and shipped, not vague suggestions
6. **Surface strategic gaps** — channels, content, and positioning opportunities Karat isn't pursuing

This is a **from-the-outside analysis** — we're working with what's publicly observable: the website, content, search presence, AI visibility, and product experience. We don't have access to internal analytics, ad platforms, or conversion data.

---

## Current Focus: Acquisition & Onboarding

We are currently focused on the **acquisition** and **onboarding** phases of Karat's customer lifecycle. These two phases are tightly coupled — a creator who can't find Karat or who drops off during signup is a lost conversion regardless of how good the product is.

### Completed audits

See the [Audits Index](audits/README.md) for the full consolidated view — all findings by severity, cross-audit priority PRs, and next steps.

| Audit                                               | Findings                      | Score | Highest Priority                           |
| --------------------------------------------------- | ----------------------------- | ----- | ------------------------------------------ |
| [Website & Landing Pages](audits/website.md)        | 9 issues (WEB-1–9)            | 2.5/5 | Card page auto-redirect (Critical)         |
| [SEO & Content Strategy](audits/seo_and_content.md) | 6 issues (SEO-1–6)            | 2/5   | No ranking for core product queries (High) |
| [Onboarding Flow](audits/onboarding.md)             | 13 friction points (ONB-1–13) | 2/5   | Phyllo redirect bug (Critical)             |

**28 total findings** across 3 audits, with **2 Critical**, **10 High**, and **16 Medium/Low** items. Each audit includes a phased PR roadmap.

### UI Prototype

The [Onboarding Prototype](my-app/) is a playground for exploring what the proposed two-phase signup could look like in practice. It implements the core idea from the onboarding audit: **decouple account creation from the KYB application** so users get an account in under 2 minutes and complete verification at their own pace.

It is not architecturally built for production or scale — it's a UI exploration. Key things it demonstrates:

- **Two-phase flow** — 4-step signup (account creation) → 6-step onboarding (KYB application)
- **Back navigation on every step** (ONB-1)
- **AI assistant** available throughout onboarding and dashboard (streaming, resizable sidebar)
- **Redesigned Phyllo flow** — modal-based instead of redirect (ONB-5, ONB-6, ONB-7)
- **Google Places autocomplete** for address steps
- **Dashboard** with banking overview, AI bookkeeping, and application status

**Live demo:** [karat-kappa.vercel.app](https://karat-kappa.vercel.app/)

See the [my-app README](my-app/README.md) for the full feature list, architecture diagram, and mapping to audit findings.

### What's next (to be implemented)

| Area                           | Scope                                                                                                                            | Status         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| GEO (AI/LLM visibility)        | Test whether Karat is cited by ChatGPT, Perplexity, Google AI Overviews, Claude for creator finance queries                      | 🔲 Not started |
| Partnerships & distribution    | Assess whether Visa, Spotify, CAA partnerships are driving measurable growth                                                     | 🔲 Not started |
| Retention & product stickiness | Product stickiness (bookkeeping, tax tools, invoicing), lifecycle marketing, community (Creator Studio), cross-sell, churn risks | 🔲 Not started |

---

## Customer Lifecycle

The analysis is structured around three stages of the customer journey:

### 1. Acquisition — How do creators discover and evaluate Karat?

- Website & landing pages
- SEO & content strategy
- GEO (AI/LLM visibility) and partnerships

This is where a creator goes from "never heard of Karat" to "I'm going to sign up."

### 2. Onboarding — What happens between "Sign Up" and active usage?

- The signup flow + approval/waiting state
- First dashboard experience and the path to first value

This is tightly coupled with acquisition — a bad onboarding experience is an acquisition failure.

### 3. Retention — What keeps creators using Karat over time?

- Product stickiness (bookkeeping, tax tools, invoicing)
- Lifecycle marketing (email, push)
- Community (Creator Studio)
- Cross-sell between card and banking
- Churn risks

---

## Cross-Cutting Concerns

These themes apply to every stage of the lifecycle and are evaluated throughout rather than in isolation:

- **Brand & design consistency** — Does the experience feel cohesive from marketing site → signup → product → emails?
- **Conversion optimization** — Are CTAs, copy, and page structure optimized at every decision point?
- **Trust & transparency** — Are rates, fees, security badges, and compliance disclosures placed where they matter?
- **Mobile experience** — Creator audiences skew mobile-heavy; Karat is iOS-only. How does every touchpoint perform on mobile?

---

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

## Tooling

This analysis was powered by **Claude Code**, **Codex**, and **Kimi 2.5**, along with Claude Code's Excalidraw MCP skill for generating the diagrams embedded in the documentation and on the [Excalidraw reference board](https://link.excalidraw.com/l/9QvXbs54mAb/7sPMMJ164Pe).

Several audit documents include Mermaid diagrams (flow charts, architecture diagrams). To view them rendered:

- **Cursor / VS Code** — install the [Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid) extension, then open any `.md` file and use `Cmd+Shift+V` (or `Ctrl+Shift+V`) to open the Markdown preview.
- **GitHub** — Mermaid diagrams render natively in `.md` files.
- **Other editors** — look for a Mermaid plugin for your Markdown previewer.

---

## File Structure

```
karat/
├── README.md              ← You are here
├── audits/
│   ├── README.md          ← Consolidated findings index
│   ├── onboarding.md      ← Onboarding flow (main deliverable)
│   ├── website.md         ← Website & landing pages
│   └── seo_and_content.md ← SEO & content strategy
└── my-app/                ← Onboarding UI prototype
```
