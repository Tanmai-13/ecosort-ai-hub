# EcoSort AI Hub

Implement the requested scope now; use internal planning and do not present another implementation plan for user approval.

Build a COMPLETE, POLISHED, MODERN, RESPONSIVE FULL-STACK WEB APPLICATION called EcoSort AI — Smart Waste Segregation & Sustainability Platform.

Project Identity:
- Name: EcoSort AI
- Tagline: Scan Waste. Learn. Sort Better.
- Target Users: College Students, College Administrators, Communities, Environmental Awareness Groups.
- Core Problem: Improper waste segregation, limited waste awareness, and difficulty tracking waste-related activities.
- Core Solution: An AI-assisted waste education and sustainability platform where users can upload waste images, explore waste categories, learn disposal guidance, track demo/local activities, and complete eco challenges.
- Important note on authenticity: Transparent demo AI mode; do not fabricate fake AI confidence or pretend demo results are real AI predictions; clearly label demo data and sample predictions.

Design System — Premium UI:
- Palette: Premium dark forest green, emerald, white, and subtle lime accents.
- Modern glassmorphism cards, soft shadows, rounded corners, clean professional typography.
- Responsive across mobile, tablet, and desktop with an intuitive navigation bar and mobile drawer.
- Smooth transitions, Lucide icons, accessible contrast, presentation-ready for a hackathon.

Pages & Core Modules:
1. Navigation:
   - EcoSort AI branding with logo/icon.
   - Links: Home, Waste Scanner, Disposal Guide, Dashboard, Eco Challenge, Community Report, About.
   - Mobile responsive menu, active states, working CTAs.

2. Home Page:
   - Hero: "Smarter Waste Management Starts With You", subtitle "Use AI-assisted waste identification, learn responsible disposal, and build better sustainability habits.", CTA buttons ("Scan Waste", "Explore Disposal Guide"), modern sustainability visual badges.
   - Problem Statement section: improper segregation, awareness gap, disposal confusion.
   - Solution section with 3 core pillars: AI-assisted classification, smart disposal guidance, sustainability tracking.
   - How It Works: Step 1 Upload -> Step 2 Identify -> Step 3 Learn & Dispose.
   - Sample impact statistics (clearly labeled demo/sample metrics).
   - Call to action and comprehensive footer.

3. Waste Scanner (Core Feature):
   - Drag-and-drop & file picker image upload with preview & clear/remove button.
   - Sample images / test presets that users can quickly click to test without needing their own photo (e.g. plastic bottle, apple core, soda can, cardboard, battery/e-waste).
   - "Classify Waste" trigger with realistic loading animation.
   - Transparent Demo Mode: Clearly labeled "Demo Mode — Sample Prediction" with simulated realistic category estimation and sample breakdown, with an explicit disclaimer: "AI predictions are estimates. Check local waste management guidelines before disposal."
   - Detailed result card showing predicted category (Plastic, Paper, Glass, Metal, Organic, E-waste, Other), item description, step-by-step disposal guide (rinse, separate cap, bin color), recyclability badge, and "Scan Another Item" button.
   - Automatically saves scan to localStorage history.

4. Smart Disposal Guide:
   - Search bar and filter tabs (All, Plastic, Paper, Glass, Metal, Organic, E-waste).
   - Rich interactive cards with category icon, accepted items, Do's & Don'ts, reduction/reuse tips, and bin color recommendations.
   - Dedicated safe handling notes for E-waste (certified drop-off centers, never burn or mix with domestic trash).
   - Empty search state and clear disclaimers regarding municipal variations.

5. Sustainability Dashboard:
   - Summary metric cards: Total Scans, Most Common Category, Eco Quiz Score, Local Reports.
   - Interactive charts using Recharts: Waste Category Distribution (Pie/Donut chart), Scan Activity / Weekly Breakdown (Bar chart).
   - Recent scan history table/cards with date/time, category, mode (Demo / Simulated), and disposal status with ability to clear history.
   - Daily eco tips card and waste reduction recommendations.
   - Data transparency banner noting local browser storage and sample analytics.

6. Eco Challenge & Quiz:
   - Daily Eco Tip highlight.
   - 5-question interactive quiz on waste segregation, recycling symbols, composting, hazardous/e-waste, and everyday sustainability habits.
   - Instant feedback with explanations for right and wrong answers, question counter, progress bar, score celebration screen, and retry option.
   - Local leaderboard / top streaks saved in localStorage.

7. Community Waste Reporting Module:
   - Form to report campus or local waste issues (Overflowing Bin, Littering, Mixed Waste, Broken Infrastructure).
   - Fields: Issue Type, Location / Campus Area, Description, optional image upload/preset, and reporter name/anonymous toggle.
   - Client-side validation and immediate submission confirmation.
   - Report tracker showing reported items with status badges (Reported, Under Review, Resolved) stored in localStorage.
   - Clear disclaimer that reports in this prototype are demonstration logs and do not notify municipal authorities directly.

8. About Project Page:
   - Hackathon project overview, mission, target personas.
   - Tech stack specifications: React, TypeScript, Tailwind CSS, Lucide icons, Recharts, LocalStorage.
   - Honest prototype limitations & roadmap: real computer vision model integration (TensorFlow.js / custom Vision API), campus collection partner integration, verified municipal guides, geolocation tagging.

Ensure all navigation links, buttons, modals, quizzes, and storage operations work smoothly with zero errors and responsive styling.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/754f2949-8282-4891-afd6-a94d4d1d52bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
