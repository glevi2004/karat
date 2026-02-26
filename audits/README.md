# Karat Growth Audit — Findings Index

> Part of the [Karat Growth Audit](../README.md)

This folder contains the completed audits for Karat's acquisition and onboarding phases. Each audit follows a consistent structure: executive summary, numbered findings with severity and estimated impact, summary scorecard, and a phased PR roadmap.

---

## Audits

| Audit | Findings | Score | Highest Priority |
| ----- | -------- | ----- | ---------------- |
| [Website & Landing Pages](website.md) | 9 issues (WEB-1–9) | 2.5/5 | WEB-2: Card page auto-redirect (Critical) |
| [SEO & Content Strategy](seo_and_content.md) | 6 issues (SEO-1–6) | 2/5 | SEO-1: No ranking for core product queries (High) |
| [Onboarding Flow](onboarding.md) | 13 friction points (ONB-1–13) | 2/5 | ONB-6: Phyllo redirect bug (Critical) |

**Total findings:** 28 across 3 audits.

---

## All Findings by Severity

### Critical

| ID    | Finding                                      | Audit      |
| ----- | -------------------------------------------- | ---------- |
| WEB-2 | Card page auto-redirect                      | Website    |
| ONB-6 | Phyllo redirect bug — user lands on getphyllo.com | Onboarding |

### High

| ID     | Finding                                            | Audit      |
| ------ | -------------------------------------------------- | ---------- |
| WEB-3  | Deprecated pages still live and linked             | Website    |
| WEB-7  | No rate, fee, or process transparency on card page | Website    |
| SEO-1  | No organic ranking for core product queries        | SEO        |
| SEO-3  | Blog format optimized for email, not search        | SEO        |
| ONB-1  | No back navigation on any step                     | Onboarding |
| ONB-2  | No account creation moment — straight to setup     | Onboarding |
| ONB-9  | Wait screen + arcade game disrupts context         | Onboarding |
| ONB-11 | Multiple competing loading states                  | Onboarding |
| ONB-12 | No email re-engagement for abandonment             | Onboarding |
| ONB-13 | Account creation and application are coupled       | Onboarding |

### Medium / Medium-High

| ID     | Finding                                        | Audit      |
| ------ | ---------------------------------------------- | ---------- |
| WEB-1  | Generic CTA copy across the site               | Website    |
| WEB-4  | Inconsistent navigation across pages           | Website    |
| WEB-5  | Two footer templates in simultaneous use       | Website    |
| WEB-8  | No comparison or "why switch" content          | Website    |
| WEB-9  | Blog format not optimized for search           | Website    |
| SEO-2  | Defensive SEO gaps on brand queries            | SEO        |
| SEO-4  | Missing schema markup                          | SEO        |
| SEO-5  | Duplicate content between /blog and /blog-old  | SEO        |
| SEO-6  | Stale content that currently ranks             | SEO        |
| ONB-3  | Step 1 field density                           | Onboarding |
| ONB-4  | MagicSocial intermediate screen                | Onboarding |
| ONB-5  | "Connect your account" second modal            | Onboarding |
| ONB-7  | Phyllo brand exposed on Twitter OAuth          | Onboarding |
| ONB-8  | Confirm screen UI inconsistency                | Onboarding |
| ONB-10 | "Missing information" as first dashboard message | Onboarding |

### Low

| ID    | Finding                              | Audit   |
| ----- | ------------------------------------ | ------- |
| WEB-6 | Hidden / orphaned pages with value   | Website |

---

## Priority PRs Across All Audits

The highest-impact work items across all three audits, ordered by urgency:

### Week 1 — Stop Active Bleeding

| PR     | Change                                                                        | Source  |
| ------ | ----------------------------------------------------------------------------- | ------- |
| WEB-P1 | Remove auto-redirect from `/card`; add sticky CTA; fix `http` → `https`      | WEB-2   |
| ONB-P2 | Switch Phyllo to popup flow + pass `workPlatformId`                           | ONB-6   |
| ONB-P1 | Add back buttons to all onboarding steps                                      | ONB-1   |
| ONB-P4 | Fix dashboard first-load message ("Under review" instead of warning)          | ONB-10  |
| WEB-P2 | 301 redirect `/blog-old` → `/blog`; fix blog nav link                         | WEB-3   |
| WEB-P4 | Add fee disclosure banner to `/card` above the fold                           | WEB-7   |

### Week 2–3 — Structural Fixes

| PR      | Change                                                                       | Source  |
| ------- | ---------------------------------------------------------------------------- | ------- |
| WEB-P3  | 301 redirects for remaining deprecated pages                                 | WEB-3   |
| WEB-P5  | Add Sign Up to `/guides`; fix Webflow staging link                           | WEB-4   |
| WEB-P7  | Migrate all old-footer pages to current footer                               | WEB-5   |
| SEO-P1  | Add FAQ schema to `/card` and `/rewards`                                     | SEO-4   |
| SEO-P3  | 301 redirect `/blog-old` → `/blog` (consolidate with WEB-P2)                | SEO-5   |
| SEO-P4  | Update Jan 2024 blog post to mention Karat Banking                           | SEO-6   |
| ONB-P3  | Remove MagicSocial consent modal                                             | ONB-4   |
| ONB-P5  | Add Plaid-style pre-OAuth explainer for Phyllo branding                      | ONB-7   |

### Week 3–6 — Content & Flow Improvements

| PR      | Change                                                                       | Source  |
| ------- | ---------------------------------------------------------------------------- | ------- |
| SEO-P5  | Publish: "How to Set Aside Money for Taxes as a Creator"                     | SEO-1   |
| SEO-P6  | Publish: "Best Business Bank Accounts for Creators [2026]"                   | SEO-1   |
| SEO-P7  | Publish: "Karat vs Mercury: Which Is Better for Creators?"                   | SEO-2   |
| WEB-P9  | Rewrite all CTAs with specific, benefit-oriented copy                        | WEB-1   |
| WEB-P11 | Add comparison section to homepage and card page                             | WEB-8   |
| ONB-P6  | Split Step 1 — move EIN to sub-step with "skip for now"                      | ONB-3   |
| ONB-P7  | Remove game; replace with confirmation + quickstart screen                   | ONB-9   |

### Week 6+ — Architectural Changes

| PR      | Change                                                                       | Source  |
| ------- | ---------------------------------------------------------------------------- | ------- |
| ONB-P9  | Implement Phase 1: account creation flow                                     | ONB-2   |
| ONB-P10 | Implement Phase 2: authenticated business verification shell                 | ONB-2   |
| ONB-P12 | Progressive save on all Phase 2 steps                                        | ONB-1   |
| SEO-P10 | Separate newsletter archive from SEO content track                           | SEO-3   |

---

## What's Next

| Area | Status |
| ---- | ------ |
| GEO (AI/LLM visibility) | 🔲 Not started |
| Partnerships & distribution | 🔲 Not started |
| Retention & product stickiness | 🔲 Not started |
