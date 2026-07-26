# ☕ BrewVerse — Smart Cafe Experience

A fully responsive, production-quality frontend project for a premium coffee shop — built with **only HTML5, CSS3, and vanilla JavaScript (ES6+)**. No frameworks, no build step. Open `index.html` and it just works.

> Built as a frontend developer portfolio piece — designed to be showcase-ready for GitHub and LinkedIn.

---

## ✨ Features

**Experience**
- Animated coffee-cup loading screen with smooth fade-out
- Glassmorphism sticky navbar with scroll-spy active-link highlighting
- Typewriter hero headline, floating coffee beans, animated steam
- Scroll progress indicator + back-to-top button
- Full dark / light theme toggle (persisted, respects OS preference)

**Shop**
- Dynamic menu loaded from `data/menu.json`, with category filters and live search
- "Today's Special" bestseller cards
- Full shopping cart: add / remove / adjust quantity, tax + total calculation, checkout confirmation — persisted in `localStorage`
- **Build Your Own Coffee** — interactive price, calorie, and prep-time calculator

**Engagement**
- Filterable photo gallery with lazy loading and a keyboard-friendly lightbox
- Auto-playing testimonial slider loaded from `data/testimonials.json`
- Animated statistics counters (Intersection Observer)
- 3-question **Coffee Quiz** with a personalized drink recommendation
- Accordion FAQ
- Reservation form and contact form with real-time validation
- Toast notification system for feedback across the site

---

## 🛠 Technologies Used

- **HTML5** — semantic markup
- **CSS3** — custom properties, Flexbox, CSS Grid, glassmorphism, keyframe animations, responsive breakpoints
- **Vanilla JavaScript (ES6+)** — modular IIFE pattern, `fetch`, `IntersectionObserver`, `localStorage`
- **Fonts** — Playfair Display (headings), Poppins (body), via Google Fonts

No frameworks. No build tools. No dependencies to install.

---

## 📁 Folder Structure

```
brewverse-smart-cafe/
│
├── index.html
├── README.md
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── audio/
│   ├── videos/
│   └── fonts/
│
├── css/
│   ├── variables.css      → design tokens (colors, type, spacing, shadows)
│   ├── style.css          → base styles + all section layouts
│   ├── components.css     → mobile nav, modal, toggle, misc components
│   ├── animations.css     → keyframes
│   └── responsive.css     → breakpoints
│
├── js/
│   ├── utils.js           → shared helpers (formatting, validation, storage, fetch)
│   ├── loader.js          → loading screen controller
│   ├── theme.js            → dark/light mode
│   ├── menu.js             → menu data, rendering, category filters
│   ├── search.js           → menu search box
│   ├── cart.js              → shopping cart + checkout
│   ├── calculator.js        → coffee builder price/calorie calculator
│   ├── reservation.js       → reservation, contact & newsletter form validation
│   ├── quiz.js               → coffee recommendation quiz
│   ├── gallery.js            → gallery filter + lightbox
│   ├── observer.js           → scroll-reveal + animated counters
│   ├── toast.js               → toast notifications
│   ├── animation.js           → typewriter effect
│   └── app.js                  → navbar, scroll spy, mobile nav, testimonials, FAQ
│
└── data/
    ├── menu.json
    └── testimonials.json
```

---

## 🚀 Installation & Running

No build step required.

1. **Download or clone** the project folder.
2. Open `index.html` directly in your browser — double-click it, or drag it into a browser window.

That's it. The site works fully offline (aside from web fonts and stock photography, which load from public CDNs).

### Recommended: use a local server

Some browsers restrict `fetch()` of local JSON files opened via `file://`. This project includes a **bundled fallback** for `menu.json` and `testimonials.json`, so it works either way — but for the most accurate dev experience (and no console warnings), serve it locally:

```bash
# Using VS Code: install the "Live Server" extension, then right-click index.html → "Open with Live Server"

# Or with Python:
python3 -m http.server 8000
# then visit http://localhost:8000

# Or with Node:
npx serve .
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#2C1810` |
| Secondary | `#6F4E37` |
| Accent | `#D4A373` |
| Background | `#FFF8F0` |
| Heading font | Playfair Display |
| Body font | Poppins |

---

## 📸 Screenshots

_Add screenshots of the hero, menu, cart drawer, and gallery here before publishing to GitHub._

```
docs/screenshot-hero.png
docs/screenshot-menu.png
docs/screenshot-cart.png
```

---

## 🔮 Future Improvements

- Connect the reservation and contact forms to a real backend / email service
- Add real payment integration to the checkout flow
- User accounts with saved favorites and order history
- CMS-driven menu management
- Automated image optimization pipeline for the gallery

---

## 📄 License

Free to use for learning and portfolio purposes.
