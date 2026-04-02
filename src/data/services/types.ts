export type FAQ = { q: string; a: string };

export type Service = {
  title: string;
  subtitle?: string;
  description: string;
  items: string[];
  nots?: string[];
  features?: string[];
  process?: string[];
  image?: string;
  gallery?: string[];
  faqs?: FAQ[];
  areas?: string[];
};
