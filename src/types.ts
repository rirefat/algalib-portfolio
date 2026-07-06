export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  status?: 'Live' | 'Case Study' | 'Concept';
  image: string;
  accentColor: string;
  overview: string;
  challenge: string;
  solution: string;
  research: string[];
  wireframesDescription: string;
  typography: string[];
  colors: string[];
  results: string[];
  lessonsLearned: string[];
  beforeImage: string;
  afterImage: string;
  gallery: string[];
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export type Theme = 'dark' | 'light';
export type ViewMode = 'home' | 'about' | 'works' | 'services' | 'experience' | 'journal' | 'contact' | 'privacy' | 'project-detail' | 'logofolio';
