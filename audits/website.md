# Audit: Website & Landing Pages

> Part of the [Karat Growth Audit](../README.md) → `audits/website.md`

**Date:** February 2026
**Status:** Actionable — PRs mapped
**Findings:** 9 issues identified
**Summary:** Strong brand and social proof, undermined by generic CTAs, deprecated pages in active navigation, missing fee transparency, and a card page that auto-redirects before visitors can read it. Overall acquisition health: **2.5/5**.

---

## Executive Summary

Karat's website has genuine strengths — the homepage social proof (creator testimonials, investor grid, press logos) is among the best in the creator fintech space. The about page tells a clear founder story. The rewards program is differentiated.

The problems are structural. The card page redirects visitors to signup before they can read the product details. Nine systemic issues affect conversion across the site: generic CTA copy, deprecated pages linked from active navigation, two simultaneous footer templates, no fee disclosure on the card page, and no comparison content for creators evaluating alternatives.

Most fixes are copy and configuration changes. The highest-priority items (WEB-2 card redirect, WEB-3 deprecated pages) can be resolved in a single sprint.

---

## Page-by-Page Observations

### Homepage `/`

- **Strong:** Hero with rotating ICP text, social proof (creator testimonials with follower counts, 30+ creator-investor grid, "$2.4B in 2024" stat), clear feature grid, transparent pricing table, press logos linked to real articles
- **Opportunity:** CTA copy is generic ("Sign up here"), no "how it works" steps, no comparison vs. other banks, no preview of what signup requires

### Card `/card`

- **Strong:** Creator-specific value props ("limits based on social stats"), tailored reward categories (Ad Spend, Camera Equipment), creator video features (Nick DiGiovanni, ZHC), solid FAQ
- **Opportunity:** 6+ "Apply Now" instances, no fee/rate disclosure above the fold, no comparison to other business cards, auto-redirect behavior (see WEB-2)

### About `/about`

- **Strong:** Best-structured narrative page on the site. Clear product journey (banking → card → community), relatable founder story, compelling community section (Hormozi, Conte, Stephan)
- **Opportunity:** No team/culture section despite active hiring

### Guides `/guides`

- **Strong:** Timely content (tax guides for 2026, raising capital guide)
- **Opportunity:** Only 3 guides (competitors have 50+), no product CTAs within guides, Sign Up button missing from nav (see WEB-4). PDF download forms accept empty email submissions — no lead capture.

### Blog `/blog`

- **Strong:** 65+ posts, consistent cadence, good category taxonomy ("Audience & Growth," "Legal," "Money")
- **Opportunity:** Newsletter archive format doesn't perform well for SEO (multi-topic, shallow, email-style titles), no internal product links, nav "Blog" link → `/blog-old` (see WEB-3)

### Rewards `/rewards`

- **Strong:** Differentiated rewards (Times Square billboards, Coachella VIP, Streamy Awards), 16 customizable spend categories
- **Opportunity:** Old design template (see WEB-5), no clear point values or redemption rates, "Terms apply" links to generic TOS

### Deprecated Pages (Still Live)

- **`/blog-old`** — Old blog with different design, categories, and footer. Same posts as `/blog`.
- **`/banking-old`** — Old banking page indexed in Google with outdated messaging.
- **`/landing`** — Describes product as "Karat Charge Card" (outdated), shows "2.00% APY" (stale), links to deprecated legal pages.
- **`/the-karat-podcast`** — Podcast page with episodes (NasDaily, Botez, Elliot Choy). Not in nav.

---

## Findings

### WEB-1: Generic CTA Copy Across the Site

**Severity:** Medium
**Location:** All pages
**Problem:** Most CTAs are "Sign up" or "Apply now" with no specificity about cost, time commitment, or what happens next.

| Page                | Current CTA    | Recommended                                |
| ------------------- | -------------- | ------------------------------------------ |
| Homepage (hero)     | "Sign up here" | "Open Your Free Account in 5 Minutes"      |
| Homepage (mid-page) | "Sign up here" | "Start Banking — It's Free"                |
| Card (hero)         | "Apply now"    | "See If You Qualify" or "Check Your Limit" |
| Card (repeated 6x)  | "Apply now"    | Reduce to 2-3 instances with varied copy   |
| About (bottom)      | Generic form   | "Get Started With Karat"                   |

Competitor benchmarks: Mercury uses "Apply for free" / "Open a free account"; Found uses "Open your account" / "Get started for free"; Novo uses "Apply in 10 minutes."

For financial products, the CTA should answer "is this free?", "how long will it take?", and "what am I committing to?"

**Fix:**
1. Audit every CTA across the site
2. Replace with specific, benefit-oriented copy
3. Vary copy between hero, mid-page, and bottom CTAs
4. On `/card`, reduce from 6+ CTAs to 2-3 with a sticky CTA bar

**Estimated impact:** +5–10% click-through on primary CTAs.

---

### WEB-2: Card Page Auto-Redirect

**Severity:** Critical
**Location:** `/card`
**Problem:** The card page redirects visitors to `app.trykarat.com/signup` within seconds. "Redirecting in 5 seconds..." appears at least 6 times in the page source. The redirect URL uses `http://` (insecure). Visitors can't read the product page before being pushed to signup.

The homepage does not auto-redirect — it lets visitors explore and choose when to sign up. The card page should follow the same pattern.

**Fix:**
1. Remove all auto-redirect behavior from `/card`
2. Replace with a sticky CTA bar visible on scroll
3. Reduce CTAs to 2-3 (hero, mid-page, bottom)
4. Change redirect URL from `http://` to `https://`

**Estimated impact:** +15–25% engagement with card page content; reduced bounce rate.

---

### WEB-3: Deprecated Pages Still Live and Linked

**Severity:** High
**Location:** Multiple URLs
**Problem:** Old page versions are live, some indexed by Google, some linked from current navigation.

| Deprecated URL               | Status                     | Issue                                                      | Linked From                             |
| ---------------------------- | -------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| `/blog-old`                  | Live                       | Old blog design with different categories & footer         | `/blog` nav "Blog" link points here     |
| `/banking-old`               | Live, indexed in Google    | Old banking page with outdated messaging                   | Google organic results                  |
| `/landing`                   | Live                       | Shows "Karat Charge Card," "2.00% APY," deprecated legal  | Possibly old ad campaigns               |
| `/community`                 | Live, orphaned             | Separate from `studio.trykarat.com`, not linked            | Not linked                              |
| `/terms-of-use-old`          | Live                       | Old terms of use                                           | `/landing` footer, `/rewards` footer    |
| `/privacy-policy-11-20-2024` | Live                       | Date-stamped old privacy policy                            | `/rewards` footer                       |

SEO impact: `/blog` and `/blog-old` contain the same 65+ posts (duplicate content signal). `/banking-old` competes with `/` for the same queries. Clicking "Blog" in the nav while on `/blog` takes you to `/blog-old`.

**Fix:**
1. 301 redirects: `/blog-old` → `/blog`, `/banking-old` → `/`, `/landing` → `/`, `/community` → `studio.trykarat.com`, old legal pages → current versions
2. Fix the `/blog` nav link that points to `/blog-old`
3. Submit URL removal requests to Google for `/banking-old` and `/landing`
4. Audit paid campaigns that may still point to `/landing`

**Estimated impact:** SEO consolidation; elimination of duplicate content signals; consistent visitor experience from organic search.

---

### WEB-4: Inconsistent Navigation Across Pages

**Severity:** Medium
**Location:** Site-wide nav
**Problem:** The same nav items point to different destinations depending on the page, and the Sign Up button appears/disappears.

**"Offers & APY" sub-nav link:**

| Source Page                           | Destination                               | Issue                                    |
| ------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| Homepage, Card, About, Blog, Blog-old | `/archive/offers`                         | Unknown if page renders correctly        |
| Guides                                | `karat-banking-calculator.webflow.io`     | Links to Webflow staging domain          |

**"Sign Up" button:**

| Page       | Present?   | `callbackUrl` param?               |
| ---------- | ---------- | ---------------------------------- |
| Homepage   | Yes        | `banking-application`              |
| Card       | Yes        | `card-application`                 |
| About      | Yes        | No callbackUrl — generic signup    |
| Guides     | Missing    | N/A                                |
| Blog       | Yes        | No callbackUrl                     |
| Rewards    | Yes        | No callbackUrl                     |

Visitors on `/guides` — likely high-intent prospects researching financial education — can't sign up. Missing `callbackUrl` on most pages means users land on generic signup with no product context.

**Fix:**
1. Add Sign Up button to `/guides` nav
2. Fix `/guides` "Offers & APY" link (currently points to Webflow staging)
3. Fix `/blog` "Blog" link to point to `/blog` (not `/blog-old`)
4. Add `callbackUrl` parameters to all signup links for contextual routing
5. Create a page × link matrix and verify every combination

**Estimated impact:** +3–5% conversion from /guides visitors; consistent signup routing.

---

### WEB-5: Two Footer Templates in Simultaneous Use

**Severity:** Medium
**Location:** Site-wide footer
**Problem:** The site uses two different footer designs. Pages with the old footer show different legal links, different social platforms, and no SOC 2 badge.

**Current footer (2025)** — on: `/`, `/card`, `/about`, `/guides`, `/blog`, `/blog-old`

| Section | Links                                                 |
| ------- | ----------------------------------------------------- |
| About   | Press (→ Notion page), Careers, Help Center           |
| Tools   | Creator Insights, Creator Studio, Podcast (→ YouTube) |
| Social  | YouTube, Instagram, TikTok, Newsletter (→ `/blog`)    |
| Legal   | `/terms-of-use`, `/privacy-policy`                    |
| Trust   | SOC 2 badge → `trust.trykarat.com`                    |

**Old footer (pre-2025)** — on: `/rewards`, `/landing`, `/insights`, `/karat-card-benefits`, `/careers`, `/community`, `/the-karat-podcast`

| Section   | Links                                                    |
| --------- | -------------------------------------------------------- |
| Company   | "Why Karat" (→ Notion page), Careers                     |
| Resources | Creator Insights, Podcast (→ `/the-karat-podcast`)       |
| Social    | Instagram, LinkedIn, Twitter (not TikTok)                |
| Legal     | `/terms-of-use-old`, `/privacy-policy-11-20-2024`        |
| Trust     | No SOC 2 badge                                           |

Seven live pages link to outdated legal documents and show no SOC 2 trust badge.

**Fix:**
1. Update all old-footer pages to the current footer template
2. Create a `/press` page on trykarat.com (replace Notion link)
3. Standardize "Newsletter" link destination
4. Ensure SOC 2 badge appears on every page

**Estimated impact:** Trust signal consistency across all pages; correct legal document exposure.

---

### WEB-6: Hidden / Orphaned Pages With Value

**Severity:** Low
**Location:** `/the-karat-podcast`, `/insights`, `/community`
**Problem:** Several pages contain useful content or tools but aren't linked from navigation.

| Page                 | Content                                                                    | Currently Linked From   |
| -------------------- | -------------------------------------------------------------------------- | ----------------------- |
| `/the-karat-podcast` | Podcast episodes with NasDaily, Botez sisters, Elliot Choy, SteezyKane    | Old footer only         |
| `/insights`          | Creator analytics tool — compare stats to anonymized data from thousands  | Footer only             |
| `/community`         | Orphaned page, separate from `studio.trykarat.com`                         | Not linked              |

The podcast and insights tool could serve as top-of-funnel content.

**Fix:**
1. If podcast is active, add to nav under Resources. If dormant, redirect to YouTube.
2. Update `/insights` to current design and fix its nav links — or redirect to homepage
3. Redirect `/community` to `studio.trykarat.com`

**Estimated impact:** Incremental awareness from surfacing existing content assets.

---

### WEB-7: No Rate, Fee, or Process Transparency on Card Page

**Severity:** High
**Location:** `/card`, `/`, `/rewards`
**Problem:** The card page does not state its fee structure anywhere above the fold. CNBC reports "no interest or fees" — but Karat's own page doesn't say this.

| Page       | Missing                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `/card`    | No APR, no annual fee, no interest rate, no fee schedule above the fold                          |
| `/`        | Claims "5 minutes" but doesn't say what's needed (EIN? SSN? Social handles?)                     |
| `/rewards` | "1-3 points for every cent spent" but no explanation of point value. "Terms apply" → generic TOS |

For financial products, transparency directly affects conversion. Visitors comparing Karat to Chase Ink or Mercury need to see "$0 annual fee, no interest, no FX fees" clearly.

**Fix:**
1. Add fee disclosure banner to `/card` above the fold: "No annual fee. No interest. No foreign transaction fees."
2. Add "What you'll need to apply" section near primary CTAs
3. Create a rewards redemption guide linked from `/rewards`

**Estimated impact:** +5–10% conversion on card page; reduced signup anxiety.

---

### WEB-8: No Comparison or "Why Switch" Content

**Severity:** Medium
**Location:** Homepage, Card, Blog, Guides
**Problem:** Every Karat visitor already has a bank account. Nothing on the site helps them understand why to switch or how Karat compares.

| Page     | Missing                                                            |
| -------- | ------------------------------------------------------------------ |
| Homepage | No "Karat vs. Traditional Banks" comparison                       |
| Card     | No comparison to Chase Ink, Amex Business, or similar              |
| Blog     | No "Karat vs. Mercury" or "Karat vs. Found" posts                 |
| Guides   | No "How to Choose a Business Bank as a Creator" guide              |

Queries like "Karat vs Mercury" and "best credit card for YouTubers" are currently unaddressed in Karat's content.

**Fix:**
1. Add comparison section to homepage
2. Add comparison table to `/card`
3. Publish comparison blog posts (see [SEO audit](seo_and_content.md) for priority list)
4. Create a guide: "How to Choose the Right Business Bank for Your Creator Business"

**Estimated impact:** +5–15% conversion from comparison-intent visitors; defensive SEO positioning.

---

### WEB-9: Blog Format Not Optimized for Search

**Severity:** Medium
**Location:** `/blog`
**Problem:** The blog has 65+ posts but they're repurposed "Karat Weekly" newsletters — multi-topic, shallow, with email-style titles. This format doesn't rank.

| Dimension        | Current Blog                                   | What Ranks                                     |
| ---------------- | ---------------------------------------------- | ---------------------------------------------- |
| Title style      | "It's Here." / "Reach is Down"                 | "23 freelancer tax deductions for 2026"         |
| Topic depth      | 200-word blurb per topic, 3-4 topics per post  | 2,000+ word single-topic guide                 |
| Keyword focus    | Diluted across subjects                        | Tight focus on one keyword cluster              |
| Internal linking | No product CTAs                                | Contextual product CTAs throughout              |
| Schema markup    | None                                           | FAQ schema, HowTo schema                        |

Dec 2023 – Feb 2024 posts ("31 Tax Deductions for Creators," "Should I Start an LLC?") were properly structured SEO content and performed well. That strategy was then replaced with newsletter reposts.

**Fix:** See [SEO & Content Strategy audit](seo_and_content.md) for the full content strategy recommendation and PR roadmap.

**Estimated impact:** See SEO audit for projected organic traffic growth.

---

## Summary Scorecard

| Dimension                      | Score     | Key Driver                                                         |
| ------------------------------ | --------- | ------------------------------------------------------------------ |
| Homepage conversion design     | 3/5       | Strong social proof; generic CTAs reduce effectiveness             |
| Card page effectiveness        | 1/5       | Auto-redirect prevents visitors from reading the page              |
| Navigation & site integrity    | 3/5       | Two footers, deprecated pages in nav, inconsistent links           |
| Transparency & trust signals   | 2/5       | No visible rates/fees; SOC 2 badge missing from 7 pages           |
| Content depth & SEO            | 2/5       | Volume exists but wrong format                                     |
| **Overall acquisition health** | **2.5/5** | **Strong brand, undermined by technical debt and content gaps**    |

---

## PR Roadmap

### Phase 1 — Critical Fixes (Week 1)

**Goal:** Resolve items that are actively reducing conversion.

| PR     | Change                                                                          | Finding | Severity |
| ------ | ------------------------------------------------------------------------------- | ------- | -------- |
| WEB-P1 | Remove auto-redirect from `/card`; add sticky CTA bar; fix `http` → `https`    | WEB-2   | Critical |
| WEB-P2 | 301 redirect `/blog-old` → `/blog`; fix blog nav link                           | WEB-3   | High     |
| WEB-P3 | 301 redirects for `/banking-old`, `/landing`, old legal pages                   | WEB-3   | High     |
| WEB-P4 | Add fee disclosure banner to `/card` above the fold                             | WEB-7   | High     |

### Phase 2 — Navigation & Consistency (Week 2–3)

**Goal:** Standardize the experience across all pages.

| PR     | Change                                                                          | Finding | Severity |
| ------ | ------------------------------------------------------------------------------- | ------- | -------- |
| WEB-P5 | Add Sign Up button to `/guides`; fix Webflow staging link                       | WEB-4   | Medium   |
| WEB-P6 | Add `callbackUrl` to all signup links for contextual routing                    | WEB-4   | Medium   |
| WEB-P7 | Migrate all old-footer pages to current footer template                         | WEB-5   | Medium   |
| WEB-P8 | Ensure SOC 2 badge on every page                                                | WEB-5   | Medium   |

### Phase 3 — Content & Conversion (Week 3–5)

**Goal:** Improve conversion copy and add missing content.

| PR      | Change                                                                         | Finding | Severity |
| ------- | ------------------------------------------------------------------------------ | ------- | -------- |
| WEB-P9  | Rewrite all CTAs with specific, benefit-oriented copy                          | WEB-1   | Medium   |
| WEB-P10 | Add "What you'll need to apply" section near primary CTAs                      | WEB-7   | Medium   |
| WEB-P11 | Add comparison section to homepage and card page                               | WEB-8   | Medium   |
| WEB-P12 | Create rewards redemption guide                                                | WEB-7   | Medium   |
| WEB-P13 | Surface or retire orphaned pages (podcast, insights, community)                | WEB-6   | Low      |
