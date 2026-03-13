# PetLegacyPlanning.com — Complete Build TODO

## Design System
- [x] Global CSS variables: dark luxury, gold, burgundy, cream
- [x] Google Fonts: Playfair Display + Inter
- [x] Tailwind theme tokens
- [x] Global layout components (Navbar, Footer)

## Database Schema
- [x] users table (extended with plan_tier, affiliate_code)
- [x] pets table
- [x] plan_workspaces table
- [x] plan_sections table
- [x] adoption_listings table
- [x] rehoming_listings table
- [x] newsletter_issues table
- [x] memorial_entries table
- [x] registered_pets table
- [x] community_entries (pet of week/month)
- [x] affiliate_codes table
- [x] promo_codes table
- [x] platinum_clients table
- [x] library_articles table
- [x] organizations table

## tRPC Routers
- [x] plans router (list, purchase, promo code validation)
- [x] workspace router (get, save sections, download)
- [x] community router (submissions, featured)
- [x] adoption router (listings CRUD)
- [x] rehoming router (listings CRUD)
- [x] newsletter router (issues list, issue detail)
- [x] library router (hubs, articles)
- [x] affiliate router (track, dashboard)
- [x] platinum router (client management)
- [x] admin router (moderation, dashboard)
- [x] memorial router (entries)
- [x] avatar router (Q&A via LLM)
- [x] contact router (submit form)

## Public Pages
- [x] Homepage (cinematic scroll, all 17 sections)
- [x] /how-it-works
- [x] /plans (comparison, 4 tiers + promo code)
- [x] /founder-story
- [x] Memorial section (In Memory of Chase Brent Sawyer)

## Community Pages
- [x] /community (hub with 6 spotlights)
- [x] /community/pet-of-the-week
- [x] /community/cutest-pet
- [x] /community/hero-pet
- [x] /community/breed-of-the-week
- [x] /community/rescue-of-the-week
- [x] /community/pet-of-the-month
- [x] /community/memorials (Memorials page)
- [x] /community/registered-pets (Registered Pets page)

## Adoption / Rehoming / Rescue
- [x] /adopt
- [x] /rehome

## Newsletter
- [x] /newsletter (hub + archive + subscribe)

## Library
- [x] /library (hub)
- [x] /library/:hub (category hub)
- [x] /library/article/:slug (article)
- [x] Seeded library articles across 9 hubs

## Customer Workspace
- [x] /my-plan (8-section workspace dashboard)
- [x] Pet Profile section
- [x] Medical History section
- [x] Medications section
- [x] Feeding Routine section
- [x] Behavioral Notes section
- [x] Guardian Designation section
- [x] Emergency Contacts section
- [x] End-of-Life Wishes section
- [x] Plan completion percentage tracker
- [x] Tier-based access control (free locks sections 3+)

## Platinum & Admin
- [x] /platinum (landing + inquiry form)
- [x] Platinum client portal (status tracking)
- [x] /admin (dashboard: users, moderation, affiliates, platinum)

## SEO Pages
- [x] /pet-protection/:state (all 50 states)
- [x] City links on state pages

## Legal & Support Pages
- [x] /faq (5 categories, 20 questions)
- [x] /contact (form + info)
- [x] /terms
- [x] /privacy
- [x] /disclaimer (50-state framework disclaimer)

## Features
- [x] Avatar Chase module (animated, Q&A via LLM)
- [x] Rotating hero phrases on homepage
- [x] Promo code system (10%, 20%, affiliate)
- [x] Affiliate tracking
- [x] Newsletter signup
- [x] Sister brand footer mention (LifeLegacyPlanner.com)
- [x] 50-state framework language

## Tests
- [x] Vitest: auth.me (2 tests)
- [x] Vitest: auth.logout (1 test)
- [x] Vitest: plans.validatePromo (1 test)
- [x] Vitest: avatar.ask (1 test)
- [x] Vitest: contact.submit (2 tests)
- [x] Vitest: platinum.submitInquiry (2 tests)
- [x] Vitest: workspace auth guard (2 tests)
- [x] Vitest: admin guard (2 tests)
- [x] Vitest: newsletter.subscribe (2 tests)
- [x] All 16 tests passing ✓

## Luxury Border System
- [x] SVG ornamental corner appliqué assets (baroque/filigree motifs)
- [x] LuxuryBorder React component (fixed viewport frame)
- [x] Responsive scaling (thinner/smaller on mobile)
- [x] Gold/cream/burgundy color palette integration
- [x] Wire into App.tsx Layout wrapper
- [x] Verify borders don't obscure content on any page

## Correction File Fixes
- [x] Upload real images (logo, Chase avatar, Jonathan+Savannah, Chase memorial) to CDN
- [x] Fix hero headline to "America's #1 Structured Pet Protection Planning System"
- [x] Add 4 CTA buttons: Get Free Checklist, Compare Plans, Start My Plan, Explore National Directory
- [x] Add .luxury-frame CSS class with inner cream line and appliqué corners
- [x] Apply luxury-frame to hero, cards, newsletter, founder, memorial sections
- [x] Rebuild AvatarChase as live talking narrator (Web Speech API, play/pause/resume/replay/mute)
- [x] Add pet crossword puzzle section (visible rendered grid)
- [x] Add breed word search section (visible rendered grid)
- [x] Add crossword/word-search preview cards to homepage
- [x] Build National Directory page (/directory) with search, state links, category links
- [x] Add National Directory to Navbar
- [x] Add National Directory section to homepage
- [x] Wire real images into Navbar, Footer, Founder, Memorial, Avatar sections

## Hero Rotating Text Refinement
- [x] Premium fade-only rotation (no typing effect, no layout shift)
- [x] Fixed-height container so hero content never moves
- [x] 8 approved phrases, 4-second calm interval
- [x] Full legibility over hero background at all screen sizes

## Final Completion Checklist (All Must Be Visibly Live)
- [ ] Logo visible on site (navbar + footer)
- [ ] Verified partner seal visible in trust/partner areas- [x] Logo visible on site
- [x] Verified seal visible in trust/partner areas
- [x] Founder image visible
- [x] Memorial image visible
- [x] Avatar visible with real Chase photo
- [x] Avatar has play, pause, replay, mute/unmute controls
- [x] Avatar narrates the site
- [x] Landing page says "America's #1 Structured Pet Protection Planning System"
- [x] National directory section visible on homepage
- [x] National directory has its own page (/directory)
- [x] Pet crossword puzzle section visible
- [x] Breed word search section visible
- [x] Luxury border system visible
- [x] Site in long-scroll premium format
- [x] No broken images
- [x] No placeholder boxes remain
- [x] Cinematic hero background image with dark luxury overlay

## Rotation Text Spec (manus-rotation-text-file.md)
- [x] Kicker line: "50-State Structured Planning • Emergency Readiness • Community Resources"
- [x] Fixed h1: "America's #1 Structured Pet Protection Planning System"
- [x] "Trusted for:" label + gold rotating phrase (8 approved phrases)
- [x] Soft fade + subtle translateY transition (700ms), 3800ms interval
- [x] Hero background image with dark overlay
- [x] 4 CTA buttons: Get Free Checklist, Compare Plans, Start My Plan, Explore National Directory
- [x] luxury-frame wrapper on hero authority block
- [x] Mobile: centered layout, stacked buttons, min-height on rotating wrap

## Rotating Main Headline (per provided spec)
- [x] 8 authority phrases rotate as the main h1 headline
- [x] fade + blur + translateY transition (750ms), 4000ms interval
- [x] .hero-main-headline CSS class with min-height: 3.2em to prevent layout shift
- [x] .is-changing class adds opacity:0, translateY(10px), blur(1px)
- [x] Sub-phrase "Trusted for:" row remains below as secondary rotating element

## Luxury Frame CSS (exact spec provided)
- [x] Replace .luxury-frame CSS with exact provided spec (border, box-shadow, border-radius, padding)
- [x] .frame-inner-line: inset 12px, 1px cream border, border-radius 20px
- [x] ::before top-left corner bracket, ::after bottom-right corner bracket
- [x] .corner-top-right and .corner-bottom-left div elements in JSX
- [x] .luxury-ornament diamond elements at all 4 corners
- [x] .hero-main-headline CSS class with min-height: 3.2em, transition for is-changing

## Back to Homepage Button
- [x] Create reusable BackToHome component (gold, luxury-styled, fixed bottom-left)
- [x] Add to every non-home page: Plans, HowItWorks, FounderStory, Community, Memorials, Newsletter, Library, Adopt, Rehome, RegisteredPets, MyPlan, Platinum, Admin, StatePage, FAQ, Contact, Privacy, Terms, Disclaimer, Directory

## Comparison Table Section
- [x] Add "Why Families Choose Pet Legacy Planning" comparison table to homepage
- [x] 11-row table: PLP gold checkmarks vs Top 15 Competition (partial/none badges)
- [x] plp-compare-section CSS: dark overlay, luxury card, highlight column, eyebrow, badges

## Value & Map Sections (pet_legacy_value_membership_map_section.html)
- [x] "How You Win" section: 4 value cards (Save Money, Organize Everything, Reduce Confusion, Plan Ahead)
- [x] Optional Plan Protection Membership card ($9.95/month) with 4 bullet points
- [x] Free Emergency Responder Kit card (Ultimate/Platinum bonus) with 4 bullet items
- [x] Pet Legacy Map section with interactive Leaflet map (US-centered, dark tile layer)
- [x] Pet pin form: Pet Name, Breed, City, State, Story — submits to database
- [x] Backend: pet_pins table in schema, tRPC mutation to add pin, query to list all pins
- [x] Map renders existing pins from database on load

## Scroll-to-Top Fix
- [x] Force page to load at hero (scroll to 0,0 on mount)
- [x] Strip hash from URL on load
- [x] Mobile safety timeout scroll
- [x] Apply globally via App.tsx or main.tsx so every page starts at top

## Page Title
- [x] Set title to "Pet Legacy Planning | America's #1 Structured Pet Protection Plan"

## Meta Description Tags
- [x] Add both meta descriptions with JS rotation script in index.html (rotates every 8 seconds)

## Rotating Page Titles
- [x] Add rotating browser tab title (8 titles, 8-second interval, synced with meta description rotation)

## Remove Hero Title Outline
- [x] Remove luxury-frame border/outline from hero title block on landing page

## Guided Tour with Chase — Lifelike 3D Avatar
- [x] Write warm 30-year-old storytelling narration scripts for all homepage sections
- [x] Install @sage-rsc/narrator-avatar + @met4citizen/talkinghead packages
- [x] Configure Vite to exclude talkinghead from optimization
- [x] Add Deepgram API key secret for neural TTS voice (using Web Speech API fallback)
- [x] Build GuidedTourChase component: Canvas 3D avatar, lip sync, eye blink, breathing, idle animations
- [x] Section-scroll narration: auto-narrate each section as tour progresses
- [x] Live Q&A: user can type or speak questions, Chase answers with voice + lip sync
- [x] Tour controls: Next/Prev section, Replay, Mute, Minimize, progress indicator
- [x] Wire "Take a Guided Tour with Chase" button into homepage hero section
- [x] Add section IDs to all homepage sections for scroll targeting
- [x] Fallback to Web Speech API if Deepgram key not set
- [x] chase.ask tRPC router with warm storytelling system prompt
- [x] Vitest: chase.ask (3 tests passing)

## Library SEO & Structure
- [x] Update /library page with correct H1/H2 section headings per spec
- [x] Add JSON-LD Article schema markup to every article page
- [x] Add Related Articles section to every article page (4 articles from same hub)
- [x] Build dynamic /sitemap.xml endpoint covering all 1,380+ articles
- [x] Add breeds, behavior, emergency-planning hubs to hubMeta
- [x] Wire getRelatedArticles and getAllLibraryArticleSlugs tRPC procedures

## Library Search & SEO Finalization
- [ ] Add robots.txt with sitemap URL for Google Search Console
- [ ] Add sitemap meta link to index.html
- [ ] Auto-feature top 3 articles per hub (SQL update)
- [ ] Add searchLibraryArticles DB helper with full-text LIKE search
- [ ] Add library.search tRPC procedure
- [ ] Build SearchBar component on /library page with real-time results
- [ ] Show search results inline with hub badge and excerpt

## Chase Avatar & Q&A Upgrade
- [ ] Replace canvas face with Chase's real photo (CDN URL)
- [ ] Add animated lip sync ring, eye blink overlay, breathing pulse on photo
- [ ] Upgrade chase.ask system prompt with deep pet legacy planning knowledge
- [ ] Add comprehensive Q&A knowledge: pet trusts, estate planning, state laws, guardianship, pricing
- [ ] Ensure Chase answers real questions helpfully and accurately

## All-3 Sprint
- [x] Chase real photo avatar (CDN URL replacing canvas face)
- [x] Animated lip sync ring + blink overlay + breathing on photo
- [x] Upgraded Chase Q- [ ] Upgraded Chase Q&A system prompt with deep knowledge baseA system prompt with deep knowledge base
- [ ] Import 200 long-tail articles from all-in-one JSON
- [ ] Import 30 content-pack articles (pet_legacy_planning, pet_behavior, pet_breeds)
- [ ] National Pet Directory: DB tables (vets, hospitals, shelters, rescues, trainers)
- [ ] National Pet Directory: search UI by state and service type
- [ ] National Pet Directory: tRPC procedures + nav link

## Avatar System Replacement
- [x] Complete RealisticAvatarAssistant component with full voice synthesis, lip sync, animations
- [x] Replace RealisticAvatar with RealisticAvatarAssistant in GuidedTourChase
- [x] ChaseFloatingChat is text-only (no avatar needed)
- [x] Wire new avatar to knowledge-grounded Q&A and guided recommendations
- [x] Test full flow: guided tour, Q&A, floating chat, voice, animations (19 tests passing)

## Remove Tour Button & Page
- [x] Remove "Take a Guided Tour with Chase" button from homepage hero
- [x] Remove GuidedTourChase import, tourRef, tourActive state from Home.tsx
- [x] Delete GuidedTourChase.tsx component file
- [x] Verify no references in App.tsx
- [x] TypeScript clean, all 19 tests passing

## Simplify to Text-Only Chat Box
- [x] Delete RealisticAvatarAssistant.tsx component
- [x] ChaseFloatingChat is already text-only (no avatar canvas)
- [x] ChaseFloatingChat mounted globally in App.tsx
- [x] TypeScript clean, all 19 tests passing

## Remove Personal Pet Protection Guide
- [x] Remove "Meet Chase" section from homepage
- [x] Remove "Your Personal Pet Protection Guide" heading
- [x] Remove AvatarChase import from Home.tsx
- [x] TypeScript clean, all 19 tests passing

## Stripe Payment Processing Setup
- [x] Add Stripe feature to project
- [x] Create products.ts with pricing (Basic $99, Premium $199, Elite $399)
- [x] Build Checkout page with promo code input (grand20 = 20% off)
- [x] Build ThankYou page with order confirmation
- [x] Add Stripe tRPC router with createCheckoutSession procedure
- [x] Wire Checkout and ThankYou routes into App.tsx
- [x] TypeScript clean, all 19 tests passing

## Pet Protection Quiz Feature
- [x] Build Quiz component with 5 questions and scoring
- [x] Create Quiz Results page with personalized recommendations
- [x] Wire quiz route into App.tsx
- [x] Add quiz link to navigation/homepage
- [x] Test quiz flow end-to-end
- [x] TypeScript clean, all tests passing

## Quiz Result Sharing Feature
- [x] Add social share buttons to QuizResults component (Facebook, Twitter, LinkedIn, Email)
- [x] Create share URLs with score and recommendation details
- [x] Test sharing functionality across all platforms
- [x] TypeScript clean, all tests passing

## Quiz Stats & Leaderboard Feature
- [ ] Create quiz_responses table to track quiz attempts and scores
- [ ] Build QuizStats page with aggregate statistics and visualizations
- [ ] Create tRPC procedures to record quiz responses and fetch stats
- [ ] Wire stats tracking into Quiz completion flow
- [ ] Add QuizStats link to navigation
- [ ] Test stats collection and display end-to-end
- [ ] TypeScript clean, all tests passing

## PDF Wizard Dashboard Feature (Post-Purchase)
- [ ] Create planner_projects and planner_sections tables in database
- [ ] Build Planner Dashboard page showing user's projects
- [ ] Create multi-step Planner Wizard form with all sections
- [ ] Implement save/resume functionality with auto-save
- [ ] Add PDF export from completed planner
- [ ] Protect dashboard with authentication (post-purchase only)
- [ ] Wire dashboard into navigation and App.tsx
- [ ] Test planner flow end-to-end
- [ ] TypeScript clean, all tests passing


## National Pet Law & City Compliance Planner
- [x] Create US states and major cities data structure (all 50 states + major cities)
- [x] Build standalone Compliance Planner page (accessible to all users at /compliance-planner)
- [x] Add pet law references for all 50 states with legal citations
- [x] Add Compliance Planner link to Resources dropdown in Navbar
- [x] Wire route into App.tsx
- [x] TypeScript clean, all tests passing


## Pet Guardian Registry Feature
- [x] Design and create pet guardian registry database schema
- [x] Create database helper functions for registry operations
- [x] Build tRPC router with CRUD procedures
- [x] Create Pet Guardian Registry frontend page with registration form
- [x] Add search and edit functionality
- [x] Protect with auth (Premium/Ultimate/Platinum only)
- [x] Add registry link to Resources dropdown in Navbar
- [x] Wire route into App.tsx
- [x] TypeScript clean, all tests passing


## National Pet Directory System
- [x] Design directory listings schema with pricing tiers ($99 regular, $49 grand opening)
- [x] Create database tables for directory listings, partners, and campaigns
- [x] Build partner registration page for directory sign-ups
- [x] Create tRPC directory router with CRUD procedures
- [x] Wire directory router into App.tsx
- [x] Add partner signup route to App.tsx
- [x] TypeScript clean, all tests passing
- [ ] Set up email credentials (Gmail SMTP) via webdev_request_secrets - FUTURE
- [ ] Configure Google Places API key - FUTURE
- [ ] Create directory listing management page for partners - FUTURE
- [ ] Create dynamic city/service directory pages (SEO-optimized) - FUTURE
- [ ] Build outreach flyer and invitation page - FUTURE
- [ ] Build admin dashboard for managing outreach campaigns - FUTURE
- [ ] Implement email campaign system with tRPC procedures - FUTURE
- [ ] Integrate Google Places API for lead discovery from major cities - FUTURE
- [ ] Create campaign status tracking and reporting - FUTURE
