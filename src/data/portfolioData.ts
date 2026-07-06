import { Project, Experience, JournalPost, Testimonial } from '../types';

export const SERVICES = [
  {
    id: 's1',
    title: 'Product Design',
    subtitle: 'Digital Products & Systems',
    description: 'Crafting highly intuitive, pixel-perfect user interfaces and deeply researched user experiences. Specializing in complex web apps, spatial designs, and design systems.',
    skills: ['UI/UX Design', 'Design Systems', 'Interactive Prototyping', 'User Research', 'Information Architecture'],
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's2',
    title: 'Brand Identity',
    subtitle: 'Visual Systems & Strategy',
    description: 'Developing cohesive visual architectures that speak elegance and authority. From minimalist typography guidelines to complete corporate graphic standards.',
    skills: ['Logo Design', 'Typography systems', 'Style Guides', 'Brand Strategy', 'Collateral Design'],
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's3',
    title: 'Creative Direction',
    subtitle: 'Concept & Visual Narrative',
    description: 'Guiding products from initial spark to award-winning execution. Unifying visual aesthetics, design principles, and product objectives into a singular voice.',
    skills: ['Editorial Design', 'Curation', 'Visual Storytelling', 'Campaign Architecture', '3D Design Guidance'],
    icon: 'Feather',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's4',
    title: 'Packaging & Industrial UI',
    subtitle: 'Physical & Digital Blending',
    description: 'Designing premium physical packaging and tactile interfaces that bridge the gap between human touch and elegant technology.',
    skills: ['Premium Packaging', 'Tactile Interface Design', 'Material Selection', 'Ergonomic Testing', '3D Prototyping'],
    icon: 'Package',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's5',
    title: 'Arts & Illustrations',
    subtitle: 'Custom Visual Artworks',
    description: 'Creating evocative illustrations and artistic visuals that enhance storytelling and add unique character to digital and physical platforms.',
    skills: ['Digital Illustration', 'Concept Art', 'Iconography', 'Character Design', 'Environment Art'],
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'aether-os',
    title: 'Aether OS',
    subtitle: 'Spatial Operating System Design',
    category: 'Product Design',
    year: '2026',
    client: 'Aether Labs',
    role: 'Principal Product Designer',
    status: 'Concept',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#E53E3E', // Deep Red
    overview: 'Aether OS is a speculative spatial operating system designed for the next generation of visual thinkers and high-performance creatives. It introduces a modular, weightless desktop environment that responds to ambient lighting and physical depth cues.',
    challenge: 'Traditional operating systems are bound by 2D grids and heavy skeuomorphic shadows. The challenge was to create a digital workspace that feels physically organic, visually soothing, and hyper-optimized for multi-layered creative workflows.',
    solution: 'We engineered a system based on light-refraction principles, dynamic depth-nesting, and fluid canvas interactions. Elements float on adjustable Z-indexes and bend ambient light based on their material density, creating an ultra-premium, tactile feel.',
    research: [
      'Studied spatial ergonomics and optical fatigue under continuous XR device usage.',
      'Conducted 50+ semantic interviews with international digital artists, architects, and industrial designers.',
      'Prototyped interactive lighting scenarios using advanced canvas ray-marching simulations.'
    ],
    wireframesDescription: 'Designed using a fluid, gravity-free grid system. Interfaces expand outwards from active focus coordinates, minimizing cursor travel distance and eye strain.',
    typography: ['Space Grotesk (Headings)', 'JetBrains Mono (Data & Coordinates)', 'Inter (Body UI)'],
    colors: ['#0A0A0A (Deep Void)', '#FFFFFF (Pure Light)', '#E53E3E (Aether Flame)', '#1F1F1F (Translucent Obsidian)'],
    results: [
      'Winner of the Red Dot: Best of the Best Concept Award 2026.',
      'Praised by leading visual design publications for setting a new benchmark in spatial UI aesthetics.',
      'Achieved a 45% increase in experimental creative speed among user testing groups.'
    ],
    lessonsLearned: [
      'Aesthetics and usability are not a trade-off. Extreme minimalist beauty often simplifies visual decoding.',
      'Dynamic physics engines in UI must be incredibly subtle to avoid user cognitive fatigue.'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1541462608141-2f58c48e4041?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'volta-electric',
    title: 'Volta Electric',
    subtitle: 'Electric Motorcycle Brand & UI',
    category: 'Graphic Design',
    year: '2025',
    client: 'Volta Motors',
    role: 'Lead Identity & Graphic Designer',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#1A202C', // Deep Charcoal
    overview: 'Volta Electric is a high-performance electric superbike crafted for city streets. The task was to build a visually aggressive, premium brand identity, complete with physical logo badges, luxury promotional materials, and a bespoke dashboard interface.',
    challenge: 'Electric vehicles often look either overly sci-fi and synthetic, or boringly identical to combustion bikes. Volta needed an identity that felt raw, powerful, and historically premium, combining mechanical heritage with clean power.',
    solution: 'We designed a bold brand system using technical Swiss grids, high-contrast typography, and rich, deep colors. The logo badge uses dynamic angle cuts reflecting physical chassis lines. The dashboard UI presents battery telemetry with hyper-responsive fluid gauges.',
    research: [
      'Analyzed classic motorcycle badging from the 1960s to identify timeless premium visual indicators.',
      'Mapped out extreme-sunlight dashboard legibility ranges to ensure safe color contrasts.',
      'Iterated on physical logo prototype moldings with industrial clay artists.'
    ],
    wireframesDescription: 'Structured around high-visibility dark viewports, designed to keep critical speed and power analytics instantly readable within a 150-degree peripheral vision angle.',
    typography: ['Satoshi (Titles)', 'Neue Montreal (Telemetry)', 'Inter (Technical Copy)'],
    colors: ['#0B0C10 (Obsidian Steel)', '#1F2833 (Dark Slate)', '#C5A059 (Premium Brass)', '#66FCF1 (Volt Blue)'],
    results: [
      'Successfully debuted at Milan Motorcycle Show 2025, securing 10,000+ pre-orders within 48 hours.',
      'Recognized by Brand New Awards for excellence in contemporary vehicle identity systems.',
      'Featured in Creative Review magazine for its revolutionary blend of physical & digital branding.'
    ],
    lessonsLearned: [
      'Physical interfaces require different tactile feedback design than standard touchscreens.',
      'High contrast is the ultimate luxury when it comes to performance-focused design systems.'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'chronos-watch',
    title: 'Chronos Mechanical',
    subtitle: 'Luxury Mechanical Timepiece Design',
    category: 'Product & Brand Design',
    year: '2025',
    client: 'Chronos Switzerland',
    role: 'Creative Director & Designer',
    status: 'Case Study',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#D4AF37', // Gold / Warm White
    overview: 'An exquisite luxury mechanical timepiece designed for modern purists. The project involved complete watch housing design, bespoke watch face graphics, packaging made of sustainable basalt fibers, and an accompanying mobile app.',
    challenge: 'How to redesign a traditional mechanical timepiece for the digital age without relying on smart-watch screens, preserving the organic majesty of watchmaking.',
    solution: 'A hybrid timepiece that pairs Swiss micro-mechanics with subtle embedded visual complications on the dial, using high-refraction glass elements and a gold-plated titanium casing. The design focuses on pure minimalist geometry.',
    research: [
      'Explored historical Swiss watch catalogs from the 18th century to study skeleton dial structures.',
      'Researched sustainable luxury packaging materials to eliminate all paper and plastic components.',
      'Studied ambient light reflection patterns on sapphire glass crystals.'
    ],
    wireframesDescription: 'Designed watch face indices using a custom 12-point circular coordinate grid system based on golden ratios.',
    typography: ['Instrument Sans (Serif Accent)', 'Neue Montreal (Details)', 'Inter (Body)'],
    colors: ['#FFFFFF (Alabaster)', '#F5F5F7 (Soft White)', '#1C1C1E (Carbon)', '#D4AF37 (Warm Gold)'],
    results: [
      'Exhibited at Baselworld 2025, winning the Innovative Design Award.',
      'Featured in GQ, Vogue Business, and Hypebeast as the timepiece that defined the "new-quiet-luxury" era.',
      'Entire limited batch of 500 units sold out in under 12 minutes.'
    ],
    lessonsLearned: [
      'Removing elements is far more difficult than adding them. Minimalist luxury is about absolute perfection of the remaining details.',
      'Tactile packaging weight profoundly shapes the perceived quality of a physical product.'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'form-void',
    title: 'Form & Void',
    subtitle: 'Premium Typography Magazine',
    category: 'Graphic Design',
    year: '2024',
    client: 'Form & Void Association',
    role: 'Lead Editorial Designer & Curator',
    status: 'Case Study',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#000000', // Pitch Black
    overview: 'Form & Void is an award-winning bi-annual print and digital magazine showcasing experimental typography, brutalist grid layouts, and minimalist design methodologies.',
    challenge: 'Print design is often viewed as static. The challenge was to create a magazine format that feels highly kinetic, interactive, and beautifully disruptive across both print sheets and interactive digital e-reading systems.',
    solution: 'We engineered an extreme editorial grid that allows text columns to break boundaries dynamically. The print edition uses fluorescent spot inks, tactile debossed linen covers, and transparent page inserts that overlay text dynamically when turned.',
    research: [
      'Conducted archival study of Italian and Dutch graphic design movements from the late 1970s.',
      'Tested 35+ paper stocks to discover the perfect thickness for ink absorption and page-turn feedback.',
      'Collaborated with custom type foundries to commission 3 exclusive editorial fonts.'
    ],
    wireframesDescription: 'Based on highly mathematical editorial modular grids, allowing typographic layouts to scale proportionally from pocket-sized booklets to ultra-wide desktop monitors.',
    typography: ['Custom Editorial Display (Large Headings)', 'Satoshi (Body)', 'JetBrains Mono (Technical Details)'],
    colors: ['#000000 (Void Black)', '#FAF9F6 (Pure Cream)', '#FF3366 (Fluorescent Red)', '#A0A0A0 (Concrete Gray)'],
    results: [
      'Awarded "Design Book of the Year" by TDC (Type Directors Club) in New York.',
      'Featured as an exhibition piece in the Zurich Museum of Design.',
      'Gained a subscriber base of 25,000+ elite designers, agencies, and design students worldwide.'
    ],
    lessonsLearned: [
      'Paper texture is a designer’s silent weapon. The sense of physical touch amplifies visual memory.',
      'Rules are created to be broken, but only after you have mastered them at an atomic level.'
    ],
    beforeImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    period: '2024 — Present',
    role: 'Senior Visual & Product Designer',
    company: 'Nexus Creative Studio, London',
    description: 'Directing visual narrative and spatial user experience design systems for world-renowned technology brands. Collaborating directly with engineering teams to deploy WebGL experiences, interactive digital branding, and custom-tailored mobile ecosystems.',
    skills: ['Creative Direction', 'Spatial Design Systems', 'Framer Motion', 'Product Architecture']
  },
  {
    id: 'exp2',
    period: '2022 — 2024',
    role: 'Lead Visual Designer',
    company: 'Slate Luxury Branding, Zurich',
    description: 'Crafted award-winning visual identities, premium print catalog design systems, packaging systems, and digital storefronts for elite watchmakers, premium fashion labels, and automotive leaders across Switzerland and Germany.',
    skills: ['Brand Systems', 'Typography Engineering', 'Editorial Design', 'Luxury Packaging']
  },
  {
    id: 'exp3',
    period: '2020 — 2022',
    role: 'Product Designer',
    company: 'Aether Digital, San Francisco',
    description: 'Designed highly refined web portals, visual dashboards, and collaborative web editors. Implemented design systems using high-end UI guidelines, focusing on fluid motion and tactile user interactions.',
    skills: ['UI/UX Design', 'Interactive Prototyping', 'Component Library Architecture', 'Motion Design']
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'jp1',
    title: 'The Weight of Lightness: Designing Spatial UIs',
    excerpt: 'An in-depth inquiry into how depth, transparency, and soft light refraction are shaping the future of digital interfaces away from standard flat cards.',
    category: 'Product Design',
    date: 'June 18, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    content: `
Spatial User Interfaces represent the ultimate leap forward in digital interaction. Over the past decade, flat design has flattened our imagination, training users to perceive digital layers as zero-thickness planes of solid color.

With Aether OS, we set out to build an interface that possesses visual weight. By mapping light refraction dynamically, buttons do not just have drop-shadows—they bend the color of the cards underneath them, exactly like actual physical glass.

### Three Rules of Spatial UI:
1. **Light is a Material:** Never treat light as a static vector asset. Dynamic ambient light makes objects feel anchored.
2. **Depth is Cognitive Hierarchy:** Adjusting the virtual Z-index of an element changes its importance. The closer an object, the quieter its surrounding detail must be.
3. **Respect the Eye:** Human eyes adjust focal distance. Spatial interfaces must use blurred regions (glassmorphism) to mimic natural focal ranges, reducing visual fatigue.
    `
  },
  {
    id: 'jp2',
    title: 'The Silent Craft of Timeless Graphic Identity',
    excerpt: 'Why the best luxury branding is defined by subtraction, heavy negative space, and typographic absolute consistency.',
    category: 'Graphic Design',
    date: 'April 05, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop',
    content: `
We live in an era of digital noise. Every brand is shouting with flashy gradients, hyper-saturated animations, and interactive gimmicks. But look at the brands that survive decades—they are almost completely silent.

True luxury is quiet. When designing the Volta Electric brand, we bypassed the obvious electric neon blues and instead focused on deep obsidian steels, custom brass metal engravings, and pure Swiss-inspired layouts.

### Subtractive Design Method:
- **First, draw everything:** Put every visual idea on the canvas.
- **Then, strip 50%:** Remove decorative icons, background frames, borders, and colorful accent lines.
- **Next, refine the typography:** Let the letterforms breathe. Give them expansive margins—sometimes 60% of the page should be entirely empty.
- **Finally, check the contrast:** Ensure that every element that remains is structurally and functionally irreplaceable.
    `
  },
  {
    id: 'jp3',
    title: 'Physical & Digital Blending: UI Beyond Screens',
    excerpt: 'How premium packaging and tactile ergonomics interact with digital interface structures to create memorable product experiences.',
    category: 'Product Design',
    date: 'Jan 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop',
    content: `
A premium product experience does not start when a user turns on a screen; it starts the moment their hands touch the physical packaging box.

For the Chronos Timepiece project, we unified the tactile experience. The physical watch casing’s angle cuts were mapped exactly into the accompanying mobile app’s digital corner radius grids. The user's thumb meets the exact same curved geometries on their screen that their index finger touches on the watch casing.

When we unify physical and digital design, we create a cognitive bridge that makes digital applications feel infinitely more premium, concrete, and satisfying to use.
    `
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Helena Von Ruin',
    role: 'VP of Design',
    company: 'Aether Labs',
    content: 'Galib is a rare breed of designer who is equally comfortable writing GLSL shaders, carving clay prototypes, and planning spatial UI design systems. He completely transformed our core product from an ordinary web tool into an award-winning digital work of art.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't2',
    name: 'Marcello Moretti',
    role: 'Chief Brand Officer',
    company: 'Volta Motors',
    content: 'Galib’s attention to detail is borders on obsession. He spent three weeks refining the curves of our physical motorcycle logo badge, and the result is nothing short of majestic. He delivers pure, absolute premium excellence.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't3',
    name: 'Sofia Albrecht',
    role: 'Founder',
    company: 'Form & Void Association',
    content: 'Working with Galib on the magazine was a revelation. He understands that editorial design is not about placing text in columns; it is about creating rhythm, contrast, and visual tension. His Swiss design layout was highly praised worldwide.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  }
];

export const CLIENTS = ['Aether Labs', 'Volta Motors', 'Chronos Switzerland', 'Form & Void', 'Microsoft Design', 'BMW Creative Labs', 'Studio Zurich', 'London Design Bureau'];

export const AWARDS = [
  { year: '2026', title: 'Red Dot: Best of the Best', category: 'Spatial UX', project: 'Aether OS' },
  { year: '2025', title: 'Awwwards Site of the Year (Nominee)', category: 'Digital Brand Experience', project: 'Volta Interactive' },
  { year: '2025', title: 'TDC New York: Type Design Winner', category: 'Editorial Design', project: 'Form & Void Magazine' },
  { year: '2024', title: 'Swiss Design Award', category: 'Product Design', project: 'Chronos Mechanical' }
];
