import type { Service } from './types';      

export const householdItemsService: Service = {
  title: 'Household Items & Cleanouts',
  subtitle: 'Declutter, without the heavy lifting.',
  description:
    'Tackling a garage, attic, or estate? We remove general household clutter, boxed items, small furniture, and seasonal gear. We work with sensitivity and efficiency—label what stays and we will do the rest.',
  items: [
    'Boxes & totes',
    'Small furniture & decor',
    'Rugs & lamps',
    'Toys & sporting goods',
    'Estate & move-out cleanouts',
    'Storage unit clear-outs',
  ],
  nots: ['Perishables/food waste not contained', 'Hazardous chemicals or biohazards'],
  features: [
    'Room-by-room coordination',
    'Donation-first approach for good items',
    'Sweep & tidy at finish',
    'Evening & weekend slots available',
  ],
  process: [
    'Identify items to go (stickers help!).',
    'We confirm scope and provide a firm quote.',
    'We load everything and sweep the area.',
  ],
  image: '/services/household.jpg',
  gallery: [
    '/services/appliance.jpg',
    '/services/appliance.jpg',
    '/services/appliance.jpg',
  ],
  faqs: [
    { q: 'Can you work while I am off-site?', a: 'Yes—grant access and provide clear instructions or labels; we will send photo updates if requested.' },
    { q: 'Do you help sort?', a: 'We can help light sorting at the start to keep things moving smoothly.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River'],
}