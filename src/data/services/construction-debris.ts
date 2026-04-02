import type { Service } from './types';      

export const constructionDebrisService: Service = {
  title: 'Construction Debris',
  subtitle: 'Post-reno cleanup, done right.',
  description:
    'Whether you are renovating a kitchen or finishing a basement, we clear out drywall, lumber, flooring, and packaging quickly and safely—sweeping up so you are ready for the next trade.',
  items: [
    'Drywall & lumber offcuts',
    'Flooring, tile & underlayment',
    'Doors, trim & cabinetry',
    'Countertops & fixtures',
    'Packaging, pallets & cardboard',
  ],
  nots: [
    'Asbestos-containing materials',
    'Wet concrete or hazardous adhesives',
    'Loose fiberglass without bagging',
  ],
  features: [
    'Contractor-friendly scheduling',
    'Load-out from garages, basements, or floors',
    'Jobsite sweep-up',
    'Responsible disposal & recycling of clean loads',
  ],
  process: [
    'Send photos or book a walkthrough.',
    'We stage materials and protect pathways.',
    'We load, sweep, and haul away same or next day.',
  ],
  image: '/services/debris.jpg',
  gallery: [
    '/services/appliance.jpg',
    '/services/appliance.jpg',
    '/services/appliance.jpg',
  ],
  faqs: [
    { q: 'Can you provide COI for buildings?', a: 'Yes, we are fully insured and can provide documentation as needed.' },
    { q: 'Do you take shingles or concrete?', a: 'Yes, but weight limits and tipping categories apply—photos help us plan.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River'],
}