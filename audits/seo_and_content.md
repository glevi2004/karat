# Audit: SEO & Content Strategy

> Part of the [Karat Growth Audit](../README.md) → `audits/seo_and_content.md`

---

## Current State

Karat publishes content but doesn't rank for it. Their organic search presence is almost entirely dependent on press coverage (CNBC, Forbes, TechCrunch) and one stale blog post from January 2024.

---

## What Karat Ranks For Today

| Query                      | Position    | Page               | Problem                                                   |
| -------------------------- | ----------- | ------------------ | --------------------------------------------------------- |
| "creator business banking" | ~2nd        | Jan 2024 blog post | Stale — doesn't mention Karat Banking (launched May 2025) |
| "Karat Financial" (brand)  | 1st         | Homepage           | Works, driven by press backlinks                          |
| Everything else            | Not ranking | —                  | No presence for non-brand queries                         |

Brand queries work because of press backlinks. Non-brand queries — the ones that actually capture new creators — are completely undefended.

---

## Keyword Gaps — Queries Karat Should Own But Doesn't

These are high-intent queries from creators actively looking for the products Karat sells:

| Karat Feature    | Query Karat Should Rank For                      | Who Ranks Instead              | Difficulty |
| ---------------- | ------------------------------------------------ | ------------------------------ | ---------- |
| Auto tax savings | "how to set aside money for taxes as freelancer" | QuickBooks, TurboTax           | Medium     |
| Banking          | "business banking for influencers"               | Novo, Mercury, Bump            | Medium     |
| Credit card      | "best credit card for YouTubers"                 | NerdWallet, affiliate bloggers | Hard       |
| Bookkeeping      | "freelancer bookkeeping tools"                   | Found, QuickBooks, Wave        | Medium     |
| Invoicing        | "content creator invoice template"               | Canva, FreshBooks              | Easy       |
| Entity structure | "LLC vs S-Corp for creators"                     | LegalZoom, NerdWallet          | Medium     |
| Tax deductions   | "creator tax deductions [year]"                  | TurboTax, H&R Block            | Medium     |

**Priority #1:** "How to Set Aside Money for Taxes as a Creator" — this is Karat's most differentiated feature (auto tax savings) and they have zero content on it.

---

## Defensive SEO Gaps

Queries people search when evaluating Karat specifically:

| Query                    | Karat's Presence | Risk                                            |
| ------------------------ | ---------------- | ----------------------------------------------- |
| "Karat Financial review" | No owned content | Third parties control the narrative             |
| "Karat vs Mercury"       | Nothing          | Competitor or affiliate blogger fills this      |
| "Karat vs Found"         | Nothing          | Same risk                                       |
| "Is Karat legit"         | Nothing          | Press articles help, but no owned trust content |

---

## Why the Blog Doesn't Work for SEO

The blog has 65+ posts but they're the wrong format for search. Most are repurposed "Karat Weekly" newsletters — multi-topic, shallow, with email-style titles.

| Dimension        | Karat Blog (Current)                          | What Ranks on Google                    |
| ---------------- | --------------------------------------------- | --------------------------------------- |
| Title style      | "It's Here." / "Reach is Down"                | "23 freelancer tax deductions for 2026" |
| Topic depth      | 200-word blurb per topic, 3-4 topics per post | 2,000+ word single-topic guide          |
| Keyword focus    | Diluted across subjects                       | Tight focus on one keyword cluster      |
| Internal linking | No product CTAs                               | Contextual product CTAs throughout      |
| Schema markup    | None                                          | FAQ schema, HowTo schema                |

**The exception:** Dec 2023–Feb 2024 posts ("31 Tax Deductions for Creators," "Should I Start an LLC?") were properly structured SEO content. This strategy worked — then Karat abandoned it and shifted entirely to newsletter reposts.

---

## Content Strategy Recommendation

### Separate two content tracks:

1. **Karat Weekly** (newsletter archive) — keep as-is for email subscribers, don't expect SEO value
2. **Creator Finance Guides** (new track) — search-optimized pillar content, 2,000+ words, one topic per post

### Priority content pieces:

| #   | Title                                                   | Target Query                   | Why It Matters                                        |
| --- | ------------------------------------------------------- | ------------------------------ | ----------------------------------------------------- |
| 1   | "How to Set Aside Money for Taxes as a Content Creator" | freelancer tax savings         | Karat's #1 differentiator, zero content               |
| 2   | "Best Business Bank Accounts for Creators [2026]"       | creator business banking       | Update stale Jan 2024 post that already ranks         |
| 3   | "Karat vs Mercury: Which Is Better for Creators?"       | Karat vs Mercury               | Defensive — own the comparison narrative              |
| 4   | "Best Business Credit Cards for Content Creators"       | best credit card for YouTubers | High commercial intent, currently owned by affiliates |
| 5   | "The Complete Guide to Creator Tax Deductions [2026]"   | creator tax deductions         | Update the 2023 post that proved the format works     |

### Technical SEO quick wins:

- Add FAQ schema to `/card` and `/rewards` (they already have FAQ content — just need structured data)
- Add HowTo schema to guides
- Fix duplicate content: 301 redirect `/blog-old` → `/blog` (same 65+ posts on both)
- Update stale Jan 2024 blog post to mention Karat Banking

---

## GEO (AI/LLM Visibility) — Not Yet Tested

**What to test:** Ask ChatGPT, Perplexity, Google AI Overviews, and Claude these queries:

- "What's the best business bank for content creators?"
- "What credit card should I get as a YouTuber?"
- "How do I do my taxes as a content creator?"
- "Karat Financial review — is it worth it?"
- "Best fintech for freelancers and creators"

**What to look for:** Is Karat cited? What sources do LLMs reference? Is Karat's content structured for easy extraction (definition → features → pricing → comparison)?

**Status:** 🔲 Not yet tested — will document results here.

---

## Competitor Content Comparison

| Company                      | Blog/Guide Count    | Content Type                | SEO Strategy                        |
| ---------------------------- | ------------------- | --------------------------- | ----------------------------------- |
| **Karat**                    | 65+ posts, 3 guides | Newsletter archive + 3 PDFs | None active                         |
| **Found**                    | 50+ guides          | Single-topic SEO guides     | Active keyword targeting            |
| **QuickBooks Self-Employed** | 200+ articles       | Comprehensive resource hub  | Dominant in tax/bookkeeping queries |
| **Mercury**                  | 30+ guides          | Product-led content         | Targets startup finance queries     |
| **NerdWallet**               | 1000+               | Comparison/review content   | Dominates "best X" queries          |

Karat has volume but the wrong format. Found is the closest competitor and is actively building the content engine Karat should have.
