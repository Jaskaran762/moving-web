import type { Service } from './types';      

export const furnitureRemovalService: Service = {
  title: 'Furniture Removal',
  subtitle: 'Bulky items out, relief in.',
  description:
    'From single-item pickups to full-room clear-outs, we carefully remove sofas, sectionals, mattresses, tables, and more—protecting walls, floors, and elevators along the way. If items are in usable condition, we prioritize donation; otherwise, we recycle components whenever possible.',
  items: [
    'Sofas, sectionals & recliners',
    'Mattresses & box springs',
    'Bed frames & headboards',
    'Dining & coffee tables',
    'Dressers, wardrobes & bookshelves',
    'Office chairs, desks & filing cabinets',
  ],
  nots: [
    'Infested or soaked items (health/safety risk)',
    'Hazardous/chemical-soaked furniture',
  ],
  features: [
    'We remove everything (no lifting needed)',
    'Same-day or next-day service',
    'Donation & recycling focused',
    'Upfront, volume-based quotes on site',
  ],
  process: [
    'Book a time online or call us.',
    'On arrival, we confirm the items and give a firm quote.',
    'We remove items, protect surfaces, and sweep up.',
    'We donate or recycle whenever possible.',
  ],
  image: '/services/furniture.jpg',
  gallery: [
    '/furniture/furniture-1.jpg',
    '/furniture/furniture-1.jpg',
    '/furniture/furniture-1.jpg',
  ],
  faqs: [
    { q: 'Do I need to disassemble my furniture?', a: 'Nope. We handle disassembly when needed and load everything for you.' },
    { q: 'Can you take items from upper floors?', a: 'Yes. We are trained for stairs and elevators and protect surfaces during removal.' },
    { q: 'What happens to usable items?', a: 'We aim to donate first; otherwise, we recycle components wherever we can.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River'],
};
