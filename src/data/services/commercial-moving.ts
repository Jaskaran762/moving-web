import type { Service } from './types';      

export const commercialMovingService: Service = {
  title: 'Commercial Moves',
  subtitle: 'Efficient office relocations to keep your business running.',
  description:
    'Minimize downtime with our professional commercial moving services. We handle office furniture, IT equipment, and documents with precision, ensuring a seamless transition to your new workspace.',
  items: [
    'Office desks & ergonomic chairs',
    'Conference room tables',
    'IT equipment, monitors, & printers',
    'Filing cabinets & storage units',
    'Breakroom appliances',
  ],
  nots: [
    'Server rack disconnections (requires your IT specialist)',
    'Hazardous industrial chemicals or biological waste',
    'Hardwired machinery disconnections',
  ],
  features: [
    'Minimal business disruption',
    'Weekend and after-hours availability',
    'Secure handling of sensitive equipment',
    'Dedicated move coordinator for your project',
  ],
  process: [
    'On-site consultation to map out the logistics.',
    'IT equipment and furniture prep and wrapping.',
    'Fast, organized transport to the new facility.',
    'Unpacking and precise office setup according to your floor plan.',
  ],
  image: '/services/commercial-moving.jpg',
  gallery: [
    '/services/commercial-moves-1.jpg',
    '/services/commercial-moves-2.jpg',
    '/services/commercial-moves-3.jpg',
  ],
  faqs: [
    { q: 'Can you move our office over the weekend?', a: 'Absolutely. We offer weekend and evening moves to ensure your team experiences zero downtime during business hours.' },
    { q: 'Do you disassemble and reassemble cubicles?', a: 'Yes, our team is equipped with the tools and experience to handle standard office partitions and cubicle systems.' },
    { q: 'Are you fully insured for commercial buildings?', a: 'Yes, we carry comprehensive commercial liability insurance and can provide a Certificate of Insurance (COI) to your property manager.' },
  ],
  areas: ['Halifax', 'Dartmouth', 'Bedford', 'Clayton Park', 'Spryfield', 'Cole Harbour', 'Hammonds Plains', 'Eastern Passage', 'Timberlea', 'Beaverbank', 'Downtown Halifax', 'Fall River', 'Herring Cove', 'Upper Tantallon', 'Lake Echo', 'Porter\'s Lake', 'North Preston', 'East Preston', 'Lower Sackville', 'Middle Sackville', 'Upper Sackville'],
};