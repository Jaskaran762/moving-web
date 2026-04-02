import type { Service } from './types';      

export const electronicWasteService: Service = {
  title: 'Electronics & E-Waste',
  subtitle: 'Secure, responsible recycling.',
  description:
    'We collect old TVs, monitors, towers, laptops, printers, and cables for responsible e-waste processing. Data-bearing devices can be separated for specialized destruction on request.',
  items: [
    'TVs & computer monitors',
    'Desktops, laptops & tablets',
    'Printers, scanners & fax machines',
    'Keyboards, routers & cables',
    'Small electronics & audio gear',
  ],
  nots: ['Loose lithium batteries (must be taped/bagged and declared)'],
  features: [
    'Responsible e-waste handling',
    'Donation for still-working devices (where possible)',
    'Optional data-destruction routing',
    'On-site, no-obligation quotes',
  ],
  process: [
    'Book a pickup and identify any data-bearing devices.',
    'We sort electronics for reuse vs. recycling streams.',
    'We transport to approved depots or refurbishers.',
  ],
  image: '/services/e-waste.jpg',
  gallery: [
    '/services/appliance.jpg',
    '/services/appliance.jpg',
    '/services/appliance.jpg',
  ],
  faqs: [
    { q: 'Can you certify data destruction?', a: 'We can route devices to partners that provide certificates—ask when booking.' },
    { q: 'Do you take old batteries?', a: 'Household batteries are accepted when bagged/taped; large packs require special handling.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River'],
}