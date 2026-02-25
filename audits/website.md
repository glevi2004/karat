# Karat Growth Audit — 1.1 Website & Landing Pages + 1.2 SEO

---

## Page-by-Page Notes (Brief)

Quick observations per page — what stands out, what's strong, what's off. Issues are cataloged in the next section.

### Homepage `/` — Banking Landing Page

- **Strong:** Hero with rotating ICP text, exceptional social proof (creator testimonials with follower counts, 30+ creator-investor grid, "$2.4B in 2024" stat), clear feature grid, transparent pricing table, press logos linked to real articles
- **Weak:** Generic CTA copy ("Sign up here"), no "how it works" steps, no comparison vs. other banks, no preview of what signup requires

### Card `/card` — Credit Card Product Page

- **Strong:** Creator-specific value props ("limits based on social stats"), tailored reward categories (Ad Spend, Camera Equipment), creator video features (Nick DiGiovanni, ZHC), solid FAQ
- **Weak:** Overly aggressive CTAs (6+ "Apply Now" instances), no fee/rate disclosure above the fold, no comparison to other business cards, dead anchor link, redirect behavior (see Issue #2)

### About `/about` — Company Story

- **Strong:** Best-structured narrative page on the site. Clear product journey (banking → card → community), relatable founder story ("met playing board games in 2016"), compelling community section (Hormozi, Conte, Stephan course content)
- **Weak:** No team/culture section despite active hiring

### Guides `/guides` — Educational Content

- **Strong:** Timely content (tax guides for 2026, raising capital guide)
- **Weak:** Only 3 guides total (competitors have 50+), no product CTAs within guides, Sign Up button missing from nav (see Issue #4). Guide PDF download forms accept empty email submissions — no validation, so Karat gets zero lead capture value from gated content.

### Blog `/blog` — Karat Weekly Archive

- **Strong:** 65+ posts, consistent cadence, good category taxonomy ("Audience & Growth," "Legal," "Money")
- **Weak:** Newsletter archive format is anti-SEO (multi-topic, shallow, email-style titles), no internal product links, "Get the next issue" button has hover alignment bug, nav "Blog" link → `/blog-old` (see Issue #3)

### Rewards `/rewards` — Card Rewards Program

- **Strong:** Genuinely differentiated rewards (Times Square billboards, Coachella VIP, Streamy Awards), 16 customizable spend categories
- **Weak:** Entirely old design template (see Issue #5), no clear point values or redemption rates, "Terms apply" links to generic TOS not a redemption guide

### Deprecated Pages (Still Live)

- **`/blog-old`** — Full old blog with different design, categories ("Source Products, Founder Stories"), and footer. Contains same posts as `/blog`.
- **`/banking-old`** — Old banking page indexed in Google with stale messaging.
- **`/landing`** — Describes product as "Karat Charge Card" (outdated term), hard-codes "2.00% APY" (stale), links to deprecated legal pages.
- **`/the-karat-podcast`** — Live podcast page with episodes (NasDaily, Botez, Elliot Choy). Not in nav. Unclear if active.

---

## Systemic Issues

Each issue below is a single root problem that surfaces across multiple pages. For each: what's broken, everywhere it appears, and what to do about it.

---

### Issue #1: Generic CTA Copy Across the Entire Site

**What's happening:** Almost every CTA on the site is some variation of "Sign up" or "Apply now" with no specificity, urgency, or value communication.

| Page                | CTA Text       | What It Should Say                         |
| ------------------- | -------------- | ------------------------------------------ |
| Homepage (hero)     | "Sign up here" | "Open Your Free Account in 5 Minutes"      |
| Homepage (mid-page) | "Sign up here" | "Start Banking — It's Free"                |
| Card (hero)         | "Apply now"    | "See If You Qualify" or "Check Your Limit" |
| Card (repeated 6x)  | "Apply now"    | Reduce to 2-3 instances with varied copy   |
| About (bottom)      | Generic form   | "Get Started With Karat"                   |
| Blog-old (bottom)   | "APPLY NOW"    | "Open Your Creator Account"                |

**Competitor benchmarks:**

- Mercury: "Apply for free" / "Open a free account"
- Found: "Open your account" / "Get started for free"
- Novo: "Apply in 10 minutes"

**Why this matters:** "Sign up here" communicates nothing about what happens next, what it costs, or how long it takes. For financial products — where signup anxiety is high — the CTA needs to answer "is this free?", "how long will it take?", and "what am I committing to?" Compare: "Sign up here" vs. "Open Your Free Account in 5 Minutes" — the second one addresses all three anxieties.

**Fix:**

1. Audit every CTA across the site
2. Replace with specific, benefit-oriented copy that answers: free? fast? low commitment?
3. Vary the copy between hero, mid-page, and bottom CTAs — each should address a different objection
4. On `/card`, reduce from 6+ CTAs to 2-3 with a sticky CTA bar

---

### Issue #2: Card Page Auto-Redirect + Overly Aggressive CTAs

**What's happening:** The `/card` page attempts to redirect visitors to `app.trykarat.com/signup?callbackUrl=...card-application` within seconds. "Redirecting in 5 seconds... If the redirect doesn't work, click here" appears at least 6 times in the page source. Separately, "Apply Now" buttons appear 6+ times across the page.

**Where it appears:**

| Element                            | Location                                    | Problem                                                   |
| ---------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| "Redirecting in 5 seconds..." text | `/card` — at least 6 instances in page body | Visitor can't read the page before being pushed to signup |
| "Apply Now" buttons                | `/card` — repeated 6+ times                 | Pushy for a financial commitment product                  |
| Signup redirect URL uses `http://` | `/card` redirect target                     | Insecure protocol for a fintech application page          |

**Why this matters:** A visitor clicking "Card" in the nav wants to learn about the product — features, rewards, fees, comparisons. Immediately redirecting them to an application is like a car dealership locking the door behind you. The rich content on the page (FAQ, creator videos, reward categories) becomes invisible because the user never sees it. This is anti-pattern for any product requiring financial commitment.

**What works correctly for contrast:** The homepage does NOT auto-redirect. It lets visitors explore, read testimonials, compare tiers, and choose when to sign up. The card page should follow the same pattern.

**Fix:**

1. Remove all auto-redirect behavior from `/card`
2. Replace with a sticky CTA bar that stays visible as the user scrolls (standard SaaS/fintech pattern)
3. Reduce CTAs to 2-3 (hero, mid-page after features, bottom) — not 6+
4. Change redirect URL from `http://` to `https://`

**Severity: P0 — the card page is effectively non-functional as an information page.**

---

### Issue #3: Deprecated Pages Still Live and Actively Linked

**What's happening:** Multiple old page versions remain live, some are indexed by Google, and some are actively linked from the current site's navigation.

**Inventory of deprecated pages:**

| Deprecated URL               | Status                     | Key Problem                                                                             | Who Links Here                          |
| ---------------------------- | -------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------- |
| `/blog-old`                  | ✅ Live                    | Old blog design with different categories & footer                                      | **`/blog` nav "Blog" link points here** |
| `/banking-old`               | ✅ Live, indexed in Google | Old banking page with stale messaging                                                   | Google organic results                  |
| `/landing`                   | ✅ Live                    | Says "Karat Charge Card," shows "2.00% APY" (outdated), links to deprecated legal pages | Possibly old ad campaigns               |
| `/community`                 | ✅ Live, orphaned          | Separate from `studio.trykarat.com`, not linked anywhere                                | Not linked                              |
| `/terms-of-use-old`          | ✅ Live                    | Old terms of use                                                                        | `/landing` footer, `/rewards` footer    |
| `/privacy-policy-11-20-2024` | ✅ Live                    | Date-stamped old privacy policy                                                         | `/rewards` footer                       |

**Why this matters:**

- **SEO damage:** `/blog` and `/blog-old` contain the same 65+ posts = duplicate content signal to Google. `/banking-old` competes with `/` for the same queries.
- **Brand damage:** `/landing` tells visitors the product is a "charge card" and shows a 2.00% APY — neither is current. Someone arriving via an old link or Google result gets an outdated first impression.
- **Navigation confusion:** The most absurd case — clicking "Blog" in the nav while on `/blog` takes you to `/blog-old`, creating a loop between two versions of the same page.

**Fix:**

1. Set up 301 redirects: `/blog-old` → `/blog`, `/banking-old` → `/`, `/landing` → `/`, `/community` → `studio.trykarat.com`, `/terms-of-use-old` → `/terms-of-use`, `/privacy-policy-11-20-2024` → `/privacy-policy`
2. Fix the `/blog` nav link that currently points to `/blog-old`
3. Submit URL removal requests to Google for `/banking-old` and `/landing`
4. Audit any paid campaigns that may still point to `/landing`

**Severity: P1 — the `/blog` → `/blog-old` nav link is P0 since it affects every blog visitor.**

---

### Issue #4: Inconsistent Navigation Across Pages

**What's happening:** The same nav items point to different destinations depending on which page you're on, and key conversion elements appear/disappear unpredictably.

**"Offers & APY" sub-nav link:**

| Source Page                           | Destination                               | Problem?                                                       |
| ------------------------------------- | ----------------------------------------- | -------------------------------------------------------------- |
| Homepage, Card, About, Blog, Blog-old | `/archive/offers`                         | Unknown if page renders correctly                              |
| **Guides**                            | **`karat-banking-calculator.webflow.io`** | **Links to Webflow staging domain — exposes internal tooling** |

**"Blog" nav link:**

| Source Page                   | Destination     | Problem?                     |
| ----------------------------- | --------------- | ---------------------------- |
| Homepage, Card, About, Guides | `/blog`         | ✅ Correct                   |
| **Blog**                      | **`/blog-old`** | **Links to deprecated page** |

**"Sign Up" button presence:**

| Page       | Button Present? | `callbackUrl` param?               |
| ---------- | --------------- | ---------------------------------- |
| Homepage   | ✅ Yes          | ✅ `banking-application`           |
| Card       | ✅ Yes          | ✅ `card-application`              |
| About      | ✅ Yes          | ❌ No callbackUrl — generic signup |
| **Guides** | **❌ Missing**  | N/A                                |
| Blog       | ✅ Yes          | ❌ No callbackUrl                  |
| Rewards    | ✅ Yes          | ❌ No callbackUrl                  |

**Why this matters:** A visitor on `/guides` — someone actively researching financial education and likely a high-intent prospect — can't sign up because the button doesn't exist. The Webflow staging URL leak on `/guides` is unprofessional. And the missing `callbackUrl` on most pages means users who sign up from About/Blog/Rewards don't get routed to a specific product flow — they land on a generic signup with no context.

**Fix:**

1. Add "Sign Up" button to `/guides` nav
2. Fix `/guides` "Offers & APY" link to match other pages
3. Fix `/blog` "Blog" link to point to `/blog` (not `/blog-old`)
4. Add appropriate `callbackUrl` parameters to all signup links so users are routed to the right product application based on context
5. Audit all nav links by creating a page × link matrix and verifying every combination

---

### Issue #5: Two Footer Templates in Simultaneous Use

**What's happening:** The site runs two completely different footer designs. Pages with the old footer show different legal links, different social platforms, a missing SOC 2 badge, and link to a Notion page instead of branded press content.

**Current footer (2025)** — used on: `/`, `/card`, `/about`, `/guides`, `/blog`, `/blog-old`

| Section | Links                                                 |
| ------- | ----------------------------------------------------- |
| About   | Press (→ Notion page ⚠️), Careers, Help Center        |
| Tools   | Creator Insights, Creator Studio, Podcast (→ YouTube) |
| Social  | YouTube, Instagram, TikTok, Newsletter (→ `/blog`)    |
| Legal   | `/terms-of-use`, `/privacy-policy`                    |
| Trust   | SOC 2 badge → `trust.trykarat.com` ✅                 |

**Old footer (pre-2025)** — used on: `/rewards`, `/landing`, `/insights`, `/karat-card-benefits`, `/careers`, `/community`, `/the-karat-podcast`

| Section   | Links                                                        |
| --------- | ------------------------------------------------------------ |
| Company   | "Why Karat" (→ Notion page ⚠️), Careers                      |
| Resources | Creator Insights, Podcast (→ `/the-karat-podcast`)           |
| Social    | Instagram, **LinkedIn**, **Twitter** (not TikTok)            |
| Legal     | **`/terms-of-use-old`**, **`/privacy-policy-11-20-2024`** ⚠️ |
| Trust     | **No SOC 2 badge** ⚠️                                        |

**Why this matters:** Seven live pages link to outdated legal documents, show no SOC 2 trust badge (critical for a fintech), and display the wrong social media profiles. The "Press"/"Why Karat" link going to a Notion page (both footers) instead of a branded trykarat.com page is sloppy for a company that's raised $100M.

**Additionally:** Even the current footer has issues — "Newsletter" links to `/blog` (not `news.trykarat.com`, where the actual newsletter lives), and "Press" links to an external Notion page.

**Fix:**

1. Update all 7 old-footer pages to the current footer template
2. Create a `/press` page on trykarat.com and redirect the Notion link
3. Decide: link "Newsletter" to `/blog` or to `news.trykarat.com` — then be consistent
4. Ensure SOC 2 badge appears on every page

---

### Issue #6: Hidden / Orphaned Pages With Real Value

**What's happening:** Several pages exist on the site that contain genuinely useful content or tools, but aren't linked from the navigation or any other page. Visitors can't find them.

| Page                 | What It Contains                                                                                                                                               | Linked From               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `/the-karat-podcast` | Full podcast with episodes featuring NasDaily, Botez sisters, Elliot Choy, SteezyKane                                                                          | Old footer only (7 pages) |
| `/insights`          | Creator analytics tool — compares your stats to anonymized data from thousands of creators. Appears to be from the old app; its nav links to deprecated pages. | Footer only               |
| `/community`         | Orphaned trykarat.com page, separate from `studio.trykarat.com`. Not linked anywhere.                                                                          | Not linked                |

**Why this matters:** The podcast is a content asset with big-name creator guests that could drive awareness. The Insights tool could be a top-of-funnel acquisition hook ("See how you compare to other creators"), but it's stuck on the old app with broken nav links. These are invisible or half-broken.

**Fix:**

1. Decide on podcast strategy: if still producing, add to nav under Resources. If dormant, redirect to YouTube channel.
2. Update `/insights` to the current site design and fix its nav links — or retire it and redirect to the homepage
3. Redirect `/community` to `studio.trykarat.com`

---

### Issue #7: No Rate, Fee, or Process Transparency on Card Page

**What's happening:** The `/card` page sells the credit card without ever stating the fee structure. Across the site, Karat asks visitors to sign up for financial products without telling them what they'll pay or what the application requires.

**Where it appears:**

| Page           | What's Missing                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/card`        | No APR, no annual fee amount, no interest rate, no fee schedule anywhere above the fold. CNBC reports "no interest or fees" — but Karat's own page doesn't say this. |
| `/` (homepage) | Claims "Get set up in as little as 5 minutes" but doesn't say what you need (EIN? SSN? Social handles?). No application preview.                                     |
| `/rewards`     | "1-3 points for every cent spent" but no explanation of what a point is worth in dollars. "Terms apply" links to generic TOS.                                        |

**Why this matters:** For financial products, transparency is conversion fuel. Visitors comparing Karat to Chase Ink or Mercury need to see "$0 annual fee, no interest, no FX fees" in big text, not buried in a FAQ or absent entirely. The lack of an application preview ("here's what you'll need") creates signup anxiety — especially for a product that asks for social media access.

**Fix:**

1. Add a clear fee disclosure banner to `/card` above the fold: "No annual fee. No interest. No foreign transaction fees."
2. Add a "What you'll need to apply" section near every primary CTA (both homepage and card page): "Your business info, social media handles, and 5 minutes"
3. Create a transparent rewards redemption guide linked from `/rewards` (not just "Terms apply")

---

### Issue #8: No Comparison or "Why Switch" Content Anywhere

**What's happening:** Every Karat visitor already has a bank account. There's nothing on the site helping them understand why they should switch, or how Karat compares to alternatives.

**Where this gap exists:**

| Page     | What's Missing                                                            |
| -------- | ------------------------------------------------------------------------- |
| Homepage | No "Karat vs. Traditional Banks" comparison table                         |
| Card     | No comparison to Chase Ink, Amex Business, or other business credit cards |
| Blog     | No "Karat vs. Mercury" or "Karat vs. Found" comparison posts              |
| Guides   | No "How to Choose a Business Bank as a Creator" guide                     |

**SEO implication:** Queries like "Karat vs Mercury," "Karat vs Found," "best credit card for YouTubers" are completely undefended. Any competitor (or affiliate blogger) can create this content and own the narrative.

**Why this matters:** Creators researching financial products will compare. If Karat doesn't provide the comparison, someone else will — and that someone else may not be favorable. Comparison content also ranks well for high-commercial-intent queries.

**Fix:**

1. Add a comparison section to the homepage: "Karat vs. Traditional Banks" showing real rate differences, fee structures, and creator-specific features
2. Add a comparison table to `/card`: Karat vs. Chase Ink vs. Amex Business
3. Publish comparison blog posts: "Karat vs Mercury for Creators," "Best Business Credit Cards for Content Creators 2026"
4. Create a guide: "How to Choose the Right Business Bank for Your Creator Business"

---

### Issue #9: Blog is a Newsletter Archive, Not an SEO Engine

**What's happening:** Karat publishes consistently (65+ posts) but the content format is structurally wrong for search. Most posts are repurposed "Karat Weekly" newsletters — multi-topic, shallow, with email-optimized titles.

**Format comparison:**

| Dimension        | Karat Blog (Current)                               | What Ranks on Google                               |
| ---------------- | -------------------------------------------------- | -------------------------------------------------- |
| Title style      | "It's Here." / "Reach is Down [Here's What to Do]" | "23 freelancer tax deductions for 2026 tax season" |
| Topic depth      | 200-word blurb per topic, 3-4 topics per post      | 2,000+ word comprehensive single-topic guide       |
| Keyword focus    | Diluted across multiple subjects                   | Tight focus on one keyword cluster                 |
| Internal linking | No product CTAs in articles                        | Contextual product CTAs throughout                 |
| Schema markup    | None                                               | FAQ schema, HowTo schema for featured snippets     |

**The exception that proves the rule:** Karat's older posts (Dec 2023 – Feb 2024) are properly structured SEO content: "31 Tax Deductions for Creators," "Should I Start an LLC as a Creator?", "LLC, S-Corp, or Sole Proprietorship." These are the right format. But Karat stopped producing this type of content and shifted entirely to newsletter reposts.

**Keyword gap — Karat offers these products but doesn't rank for the queries:**

| Karat Feature    | Query Nobody Finds Karat For                     | Who Ranks Instead              |
| ---------------- | ------------------------------------------------ | ------------------------------ |
| Auto tax savings | "how to set aside money for taxes as freelancer" | QuickBooks, TurboTax           |
| Bookkeeping      | "freelancer bookkeeping tools"                   | Found, QuickBooks, Wave        |
| Invoicing        | "content creator invoice template"               | Canva, FreshBooks              |
| Credit card      | "best credit card for YouTubers"                 | NerdWallet, affiliate bloggers |
| Banking          | "business banking for influencers"               | Novo, Mercury, Bump            |

**Fix:**

1. Separate newsletter content from SEO content — keep Karat Weekly as email archive, but create a parallel track of search-optimized pillar guides
2. Revive the pillar content strategy from 2023-2024: produce 5-10 comprehensive guides targeting the keyword gaps above
3. Prioritize: "How to Set Aside Money for Taxes as a Creator" — this is literally Karat's most differentiated feature, and they have zero content on it
4. Update the Jan 2024 "Best Business Bank Accounts for Creators" post — it currently ranks but is stale and doesn't mention Karat Banking (which launched after it was written)
5. Add FAQ schema to `/card` and `/rewards` (they already have FAQ content — just need the structured data)
6. Add product CTAs within blog content: each post should naturally lead to a relevant Karat product

---

## Summary Scorecard

| Dimension                      | Score     | Key Driver                                                                              |
| ------------------------------ | --------- | --------------------------------------------------------------------------------------- |
| Homepage conversion design     | 3/5       | Excellent social proof, but generic CTAs undercut it                                    |
| Technical SEO                  | 3/5       | Good image optimization; missing schema, broken URLs                                    |
| Navigation & site integrity    | 3/5       | Two footers, deprecated pages linked from nav, inconsistent links                       |
| Content depth & SEO            | 2/5       | Volume exists but wrong format; pillar strategy abandoned                               |
| Keyword coverage               | 2/5       | Owns almost nothing in organic; dependent on press coverage                             |
| Transparency & trust signals   | 2/5       | No visible rates, no fee disclosure, SOC 2 badge missing from 7 pages                   |
| Card page effectiveness        | 1/5       | Auto-redirect + no fee disclosure = page is non-functional                              |
| **Overall acquisition health** | **2.5/5** | **Strong brand & social proof, severely undermined by technical debt and content gaps** |
