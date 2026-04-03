import type { Service } from './types';      

export const specialtyItemsService: Service = {
  title: 'Specialty Items',
  subtitle: 'Expert care for your heaviest and most valuable pieces.',
  description:
    'Some items require extra muscle and specialized knowledge. From upright pianos to heavy gun safes, we have the heavy-duty equipment and training to move your complex items safely without damaging your property.',
  items: [
    'Upright pianos',
    'Gun safes & heavy security cabinets',
    'Antiques & fine art',
    'Large exercise equipment (treadmills, home gyms)',
    'Large solid-wood furniture pieces',
  ],
  nots: [
    'Grand pianos (we specialize in uprights only)',
    'Billiards/pool tables (requires specialized slate leveling)',
    'Items requiring a crane for balcony removal',
  ],
  features: [
    'Heavy-duty dollies, straps, and ramps',
    'Specialized multi-layer padding',
    'Custom crating options available',
    'Extra crew members assigned for safety',
  ],
  process: [
    'We assess the item weight, dimensions, and building access points.',
    'Apply heavy-duty wrapping, padding, and edge protection.',
    'Securely maneuver the item using specialized lifting equipment.',
    'Careful, precise placement at the final destination.',
  ],
  image: '/services/specialty-moving.jpg',
  gallery: [
    '/services/specialty-items-1.jpg',
    '/services/specialty-items-2.jpg',
    '/services/specialty-items-3.jpg',
  ],
  faqs: [
    { q: 'Do you tune pianos after moving them?', a: 'No, we handle the safe transportation only. It is always recommended to hire a professional tuner a few weeks after a piano settles into a new environment.' },
    { q: 'Is there an extra fee for heavy items?', a: 'Yes, exceptionally heavy items (like safes or pianos) carry a heavy-item surcharge to account for the specialized equipment and extra crew members required.' },
    { q: 'Will you protect my hardwood floors?', a: 'Absolutely. We use neoprene floor runners, plywood sheets (if necessary for extremely heavy items), and rubber-wheeled dollies to prevent scuffs and scratches.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River', 'Herring Cove', 'Upper Tantallon', 'Lake Echo', 'Porter\'s Lake', 'North Preston', 'East Preston', 'Lower Sackville', 'Middle Sackville', 'Upper Sackville'],
};