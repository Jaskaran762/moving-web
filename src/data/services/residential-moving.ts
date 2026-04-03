import type { Service } from './types';      

export const residentialMovingService: Service = {
  title: 'Residential Moving',
  subtitle: 'Stress-free relocations for your home or apartment.',
  description:
    'Comprehensive home moving services tailored to your needs. From careful packing to secure transport, our fully insured team ensures your belongings arrive safely at your new doorstep.',
  items: [
    'Furniture & household goods',
    'Fragile items & electronics',
    'Boxed personal belongings',
    'Mattresses & bed frames',
    'Outdoor furniture & equipment',
  ],
  nots: [
    'Hazardous materials (paint, chemicals, propane)',
    'Perishable food items',
    'Live pets or plants',
  ],
  features: [
    'Fully licensed & insured team',
    'Protective wrapping for all furniture',
    'Floor, stair, and doorway protection',
    'Basic furniture assembly/disassembly included',
  ],
  process: [
    'Get a free, transparent upfront estimate.',
    'We pad, wrap, and safely load your belongings.',
    'Secure transport to your new residence.',
    'We unload and place items in your designated rooms.',
  ],
  image: '/services/residential-moving.jpg',
  gallery: [
    '/services/residential-moving-1.jpg',
    '/services/residential-moving-2.jpg',
    '/services/residential-moving-3.jpg',
  ],
  faqs: [
    { q: 'Do you provide packing supplies?', a: 'Yes, we can provide boxes, tape, and packing paper for an additional fee if requested in advance.' },
    { q: 'How are my items protected?', a: 'We use professional-grade moving blankets, shrink wrap, and floor runners to protect both your items and your property.' },
    { q: 'Do I need to empty my dressers?', a: 'We recommend removing heavy items, breakables, and valuables. Lightweight clothing can usually stay in the drawers.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River', 'Herring Cove', 'Upper Tantallon', 'Lake Echo', 'Porter\'s Lake', 'North Preston', 'East Preston', 'Lower Sackville', 'Middle Sackville', 'Upper Sackville'],
};