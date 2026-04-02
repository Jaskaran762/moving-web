import type { Service } from './types';      

export const appliancePickupService: Service = {
  title: 'Appliance Pickup',
  subtitle: 'Heavy lifting, handled.',
  description:
    'We safely disconnect (non-hardwired) and remove bulky appliances from kitchens, laundry rooms, and basements. Where facilities allow, we recycle metal and responsibly handle refrigerants via approved depots.',
  items: [
    'Refrigerators & freezers',
    'Washers & dryers',
    'Dishwashers & microwaves',
    'Stoves & ranges',
    'Dehumidifiers & window A/C units',
  ],
  nots: [
    'Gas line disconnections (must be done by a licensed technician)',
    'Hardwired electrical disconnects (hire a certified electrician first)',
  ],
  features: [
    'Two-person team & proper equipment',
    'Pathway protection & careful removal',
    'Eco-friendly recycling where available',
    'Same-day or next-day availability',
  ],
  process: [
    'Book a convenient time.',
    'We confirm access and measuring (doors/stairs).',
    'We protect floors and remove the appliance(s).',
    'We recycle or dispose per local guidelines.',
  ],
  image: '/services/appliance.jpg',
  gallery: [
    '/services/appliance.jpg',
    '/services/appliance.jpg',
    '/services/appliance.jpg',
  ],
  faqs: [
    { q: 'Do you handle fridge coolant (refrigerant)?', a: 'Yes—units go to approved facilities that recover refrigerants per local regulations.' },
    { q: 'Do I need to disconnect?', a: 'Please unplug and empty units. For gas or hardwired units, arrange a licensed pro.' },
    { q: 'Can you remove from the basement?', a: 'Yes. We plan the route and bring the right gear for safe removal.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River'],
}