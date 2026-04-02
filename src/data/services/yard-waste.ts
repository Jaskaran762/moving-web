import type { Service } from './types';      

export const yardWasteService: Service = {
  title: 'Yard Waste & Outdoor Debris',
  subtitle: 'Curb appeal, quickly.',
  description:
    'Branches, brush, fence panels, and storm debris—our team loads it all and leaves your yard swept and tidy. For soil or stone, we organize the right tools and plan for weight limits.',
  items: [
    'Branches, brush & clippings',
    'Leaves & lawn bags',
    'Old lumber & fence panels',
    'Broken planters & patio furniture',
    'Small shed tear-downs (by request)',
  ],
  nots: ['Soil/rocks by the truckload without prior notice', 'Hazardous landscaping chemicals'],
  features: [
    'Storm clean-ups',
    'Same/next-day availability in season',
    'Responsible green-waste diversion',
    'Careful loading to protect lawns',
  ],
  process: [
    'Book a time and tell us the pile location.',
    'We confirm access and staging area.',
    'We load debris, rake/sweep, and haul away.',
  ],
  image: '/services/yard.jpg',
  gallery: [
    '/services/appliance.jpg',
    '/services/appliance.jpg',
    '/services/appliance.jpg',
  ],
  faqs: [
    { q: 'Do you take soil or stone?', a: 'Yes, within weight limits—photos help us plan equipment and time.' },
    { q: 'Do items need to be bagged?', a: 'Loose piles are fine; bagged leaves/brush speed things up.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River'],
}