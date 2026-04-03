import type { Service } from './types';      

export const longDistanceMovingService: Service = {
  title: 'Long-Distance Moving',
  subtitle: 'Reliable, dedicated transport across the province.',
  description:
    'Planning a big move? Our long-distance team provides dedicated trucks, guaranteed delivery windows, and consistent communication so you have peace of mind every kilometer of the journey.',
  items: [
    'Full household estates',
    'Multi-room apartments',
    'Corporate relocations',
    'Fragile and high-value shipments',
  ],
  nots: [
    'Cross-border (international) moves',
    'Transporting live animals or vehicles',
    'Transporting illegal or highly flammable substances',
  ],
  features: [
    'Dedicated truck (your belongings don’t share space)',
    'Guaranteed, precise delivery dates',
    'Comprehensive transit insurance coverage',
    'Consistent updates from your driving team',
  ],
  process: [
    'Detailed inventory assessment and binding quote.',
    'Expert, tight packing required for long-transit safety.',
    'Direct, non-stop transport to your destination.',
    'Safe unloading and placement in your new home.',
  ],
  image: '/services/long-distance-moving.jpg',
  gallery: [
    '/services/long-distance-1.jpg',
    '/services/long-distance-2.jpg',
    '/services/long-distance-3.jpg',
  ],
  faqs: [
    { q: 'Will my items share a truck with other people’s belongings?', a: 'No. We offer dedicated transport, meaning the truck is reserved exclusively for your move. This ensures faster delivery and prevents lost items.' },
    { q: 'How is pricing determined for long distance?', a: 'Pricing is typically based on the total weight/volume of your belongings and the distance traveled. We provide a firm quote before loading.' },
    { q: 'How long will the delivery take?', a: 'Because we use dedicated trucks, delivery is usually direct and happens within 1 to 3 days depending on the final maritime destination.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River', 'Herring Cove', 'Upper Tantallon', 'Lake Echo', 'Porter\'s Lake', 'North Preston', 'East Preston', 'Lower Sackville', 'Middle Sackville', 'Upper Sackville'],
};