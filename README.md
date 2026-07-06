# Galib Portfolio - Premium Portfolio Web Experience

A sophisticated, high-performance personal portfolio website built for **Abdullah Al Galib**. Emphasizing a premium aesthetic, deep contrast styling, and seamless interactions, this application serves as a digital showcase of creative work, professional capabilities, and thoughts.

## 🌟 Key Features

- **Immersive Custom Cursor:** Context-aware interactive cursor that adapts to different UI elements (hover, drag, view states).
- **Fluid Animations:** Powered by `motion` and `lenis` for buttery-smooth page transitions, micro-interactions, and scroll behaviors.
- **Premium Visual Aesthetic:** Italian/Swiss luxury design influences with refined typography (sans, serif, and mono pairings) and deep, cinematic contrast.
- **Responsive Architecture:** Fully responsive layouts adapting elegantly from mobile devices to ultra-wide desktop displays.
- **Dynamic Views:** Seamlessly transitions between Home, Works (Portfolio), Capabilities (Services), Journal, and Contact sections using custom state-driven routing.
- **Glassmorphism UI:** Elegant frosted glass navigation and overlay effects.

## 🛠 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Motion](https://motion.dev/) (Framer Motion)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── views/          # Top-level page views (Home, Contact, Works, etc.)
│   │   ├── CustomCursor    # Context-aware cursor implementation
│   │   ├── GlassNavigation # Primary application navigation
│   │   └── ...             # Reusable UI components (Buttons, Cards, Avatars)
│   ├── hooks/
│   │   └── usePortfolioStore.ts # Global state management for routing and UI states
│   ├── App.tsx             # Main application entry and view router
│   ├── index.css           # Global Tailwind CSS configuration & custom font imports
│   └── main.tsx            # React DOM rendering entry point
```

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd galib-portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Production Build

To create a production-optimized build:

```bash
npm run build
```

This will compile and minify the assets into the `dist` directory. You can preview the production build using `npm run preview`.

## 🎨 Design Philosophy

This portfolio is built on a "Craftsmanship over Defaults" principle. It avoids standard component library aesthetics in favor of deliberate, custom-tailored visual rhythms. The "Cosmic Slate" dark theme paired with subtle white/black hover inversions ensures high readability while maintaining an editorial, high-end feel.

## 📬 Contact

**Abdullah Al Galib**  
Email: [abdullahalgalib255@gmail.com](mailto:abdullahalgalib255@gmail.com)  
Brand: Galib Portfolio  

---
*Crafted with precision.*
