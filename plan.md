Current State Analysis
Existing Landing Page Issues:

Generic hero section with basic overlay pattern (2015-era WordPress aesthetic)
Predictable 4-column service grid with icon-title-description cards
Monotonous layout with no visual hierarchy or surprise elements
Limited use of whitespace and modern typography
No interactive elements or micro-interactions
Background image is dark and cluttered, reducing readability
Lacks emotional connection and visual storytelling
Strengths to Preserve:

Clear information architecture
Good content organization (Services, Projects, About, CTA)
Functional navigation
Solid technical foundation (Astro 4.8, Tailwind, shadcn)
Design Philosophy
Inspiration Sources:

Apple product reveals - Drama through simplicity, generous whitespace
Modern research institutions - Clean, academic credibility with bold visuals
Tech startup landing pages - Dynamic, engaging, forward-thinking
Design Style: Minimalism + Cinematic Visuals

Clean typography-first approach
Strategic use of asymmetry and scale
Native web animations (View Transitions API, CSS animations)
Data visualization elements for credibility
Generous whitespace with intentional density
Landing Page Redesign
Hero Section Transformation
Current: Dark overlay + centered text + 2 buttons Proposed: Split-screen cinematic hero

┌─────────────────────────────────────────────────┐
│  Left (60%)              │  Right (40%)         │
│                          │                      │
│  Large Typography        │  Animated           │
│  "Advancing Spatial      │  GIS Visualization  │
│   Intelligence"          │  (Interactive map   │
│                          │   or data viz)      │
│  Subheading             │                      │
│  Minimal CTA            │                      │
│                          │                      │
└─────────────────────────────────────────────────┘
Typography:

Primary: Space Grotesk (modern, geometric)
Secondary: Inter (clean, readable)
Accent: Clash Display (bold statements)
Colors:

Element	Current	Proposed
Primary	Maroon #5C1F1F	Deep Blue #1E3A8A
Accent	-	Cyan #06B6D4
Background	White	Off-white #FAFAFA
Text	Black	Charcoal #1F2937
Services Section Redesign
Current: 4-column grid with bordered cards Proposed: Asymmetric bento-box layout

┌──────────────┬──────────┬──────────┐
│              │          │          │
│   Featured   │  Service │  Service │
│   Service    │    2     │    3     │
│   (Large)    ├──────────┴──────────┤
│              │                     │
│              │    Service 4        │
└──────────────┴─────────────────────┘
Card Enhancements:

Glassmorphism effect on hover
Subtle gradient backgrounds
Animated icons (Lucide with CSS animations)
Metric counters (e.g., "50K+ geocoded addresses")
Impact Metrics Section (NEW)
Add quantitative credibility between Services and About:

Metric	Value	Visual
Projects Completed	25+	Counter animation
Researchers Supported	200+	Counter animation
Data Points Processed	70M+	Counter animation
Accuracy Rate	82.3%	Progress ring
Layout: CSS scroll-snap on mobile, 4-column grid on desktop Animation: Intersection Observer + CSS counters

Featured Projects Showcase (NEW)
Replace generic "About" section with dynamic project carousel:

┌─────────────────────────────────────────┐
│  Featured Projects                      │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ GeoAI    │  │ Petra    │  │ AHMP   ││
│  │ [Image]  │  │ [Image]  │  │ [Image]││
│  │ Title    │  │ Title    │  │ Title  ││
│  └──────────┘  └──────────┘  └────────┘│
└─────────────────────────────────────────┘
Implementation:

CSS scroll-snap for smooth scrolling
CSS scroll-driven animations for parallax
Intersection Observer for lazy loading
Testimonials/Partners Section (NEW)
Add social proof with university partners:

University of Chicago | CAMEL Lab | AHMP | [Partner Logos]
Design: CSS scroll-snap with logo grid Animation: Infinite scroll using CSS keyframes

Modernized CTA Section
Current: Centered text + button Proposed: Split design with visual element

┌────────────────────────────────────────┐
│  Left: "Ready to Start?"               │
│  Form preview or calendar visual   │ →│
│                                        │
│  Right: Contact form or quick links   │
└────────────────────────────────────────┘
Additional Site Improvements
1. Navigation Enhancement
Current Issues:

Standard horizontal nav
No visual feedback
Dropdown menus are basic
Improvements:

Sticky navigation with backdrop-blur on scroll
Active page indicator with animated underline
Mega menu for Services/Projects with previews
View Transitions API for smooth page changes
2. Typography System
Define consistent hierarchy:

Level	Font	Size	Weight	Usage
H1	Clash Display	4xl-6xl	700	Page titles
H2	Space Grotesk	3xl-4xl	600	Section headers
H3	Space Grotesk	2xl	600	Subsections
Body	Inter	base	400	Content
Caption	Inter	sm	400	Metadata
3. Animation & Interaction
Native Web APIs:

View Transitions API for page navigation
Intersection Observer for scroll animations
CSS scroll-snap for carousels
CSS scroll-driven animations for parallax
CSS @keyframes for micro-interactions
Micro-interactions:

Fade-in on scroll
Hover lift effects on cards
Button ripple effects (CSS only)
Smooth scrolling
Loading states with skeleton screens
Performance:

Use CSS transforms (GPU-accelerated)
Lazy load images below fold
Preload critical fonts
No JavaScript animation libraries needed
4. Accessibility Improvements
ARIA labels for all interactive elements
Keyboard navigation support
Focus visible states
Color contrast ratio ≥ 4.5:1
Reduced motion support (prefers-reduced-motion)
5. Mobile Optimization
Current: Responsive but basic Proposed:

Mobile-first approach
Touch-friendly targets (min 44px)
Optimized images (WebP format)
Simplified navigation (hamburger menu)
CSS scroll-snap for mobile carousels
Faster load times (<3s)
Content Asset Requirements
Before Phase 3, gather:

Project Images:

 GeoAI project hero image (high-res)
 Petra water management visualization
 AHMP Afghanistan heritage mapping
 Additional featured projects (2-3 more)
Metrics Data:

 Total projects completed
 Researchers supported count
 Data points processed
 Geocoding accuracy percentage
 Other relevant statistics
Partner Logos:

 University of Chicago official logo
 CAMEL Lab logo
 AHMP logo
 Other research partners
 Funding sources (NSF, etc.)
Service Icons/Visuals:

 GIS Software icon/illustration
 Data Resources visualization
 Workshops icon
 Support/consultation icon
Format Requirements:

Images: WebP format, multiple sizes (1x, 2x)
Logos: SVG preferred, PNG fallback
Dimensions: Responsive (provide 2-3 sizes)
Implementation Phases
Phase 1: Foundation (Week 1)
 Update color palette and CSS variables
 Implement typography system
 Add Google Fonts (Space Grotesk, Inter, Clash Display)
 Create CSS animation utilities
 Enable View Transitions API in Astro config
Status: Implemented
Branch: feature/landing-page-redesign-phase1
Phase 2: Hero & Services (Week 1-2)
 Redesign hero section with split layout
 Add interactive GIS visualization (optional)
 Implement bento-box services layout
 Add glassmorphism effects with CSS
 Implement scroll animations
Status: Implemented
Branch: feature/landing-page-redesign-phase2
Phase 2.5: Content Asset Collection (Week 2)
 Gather all project images
 Collect metrics data
 Obtain partner logos
 Optimize all assets (WebP, multiple sizes)
 Organize in proper directory structure
Status: Implemented
Branch: feature/phase-2.5
Phase 3: New Sections (Week 2-3)
 Create impact metrics component with CSS counters
 Build featured projects with CSS scroll-snap
 Add partners section with infinite scroll
 Modernize CTA section
 Implement Intersection Observer for animations
Status: Implemented
Branch: feature/landing-page-redesign-phase2
Phase 4: Site-wide Improvements (Week 3)
 Enhance navigation with backdrop-blur
 Add View Transitions between pages
 Implement scroll-driven animations
 Add micro-interactions with CSS
 Optimize images and performance
Status: Implemented
Branch: feature/landing-page-redesign-phase2
Phase 5: Polish & Testing (Week 3-4)
 Accessibility audit
 Cross-browser testing
 Mobile optimization
 Performance optimization (Lighthouse score >90)
 Test reduced motion preferences
Status: Implemented (skip link, ARIA; build verified)
Branch: feature/phase-5
Technical Considerations
Astro 4.8 Features to Leverage:

View Transitions API for smooth page changes
Image optimization with astro:assets
Component islands for minimal JavaScript
Static site generation for performance
Native Web APIs (No External Libraries):

View Transitions API (page navigation)
Intersection Observer (scroll animations)
CSS scroll-snap (carousels)
CSS scroll-driven animations (parallax)
CSS @keyframes (micro-interactions)
CSS counters (metrics animation)
Minimal Dependencies:

Recharts (data visualizations only if needed)
Lucide icons (already installed)
Performance Budget:

First Contentful Paint: <1.5s
Largest Contentful Paint: <2.5s
Total Blocking Time: <200ms
Cumulative Layout Shift: <0.1
JavaScript bundle: <50KB
Success Metrics
User Engagement:

Increase time on page by 40%
Reduce bounce rate by 25%
Increase CTA click-through rate by 30%
Technical:

Lighthouse score >90 (all categories)
Core Web Vitals: All green
Mobile-friendly test: Pass
Zero layout shift (CLS = 0)
Accessibility:

WCAG 2.1 Level AA compliance
Keyboard navigation: 100% functional
Screen reader compatible
Reduced motion support
To-dos (6)
 Design system setup: Update colors, typography, add fonts, enable View Transitions
 Hero & services: Redesign with split layout, bento-box, CSS animations
 Content gathering: Collect project images, metrics, partner logos, optimize assets
 New sections: Add metrics (CSS counters), projects (scroll-snap), partners
 Site improvements: Navigation, View Transitions, scroll animations, accessibility
 Testing & optimization: Cross-browser, mobile, performance, reduced motion
