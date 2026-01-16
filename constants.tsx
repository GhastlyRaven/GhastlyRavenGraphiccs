
import { Product, Review } from './types';

export const ADMIN_EMAIL = 'ghastlyravengraphics@gmail.com';

export const CATEGORIES_CONFIG = {
  'Small Shop Files': {
    'Seamless': ['Exclusive', 'Semi Exclusive', 'Non exclusive'],
    'PNG': ['Exclusive', 'Semi Exclusive', 'Non Exclusive']
  },
  'Business': {
    'Branding': ['Logo', 'Business Card', 'Scan To Pay', 'Site Graphics', 'REP Graphics', 'Order Tracker']
  },
  'Facebook Group': {
    'Assets': ['Cover photo', 'Interaction Graphics']
  },
  'Other': {
    'Custom': ['Pet Portraits', 'Photoshop', 'Birthday Invitation', 'Request']
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Gothic Rose Seamless',
    price: 15.00,
    category: 'Small Shop Files',
    subCategory: 'Seamless',
    tier: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800',
    description: 'Beautifully dark seamless rose pattern. Perfect for fabric or stationery.',
    featured: true
  },
  {
    id: '2',
    name: 'Raven Emblem Logo',
    price: 45.00,
    category: 'Business',
    subCategory: 'Branding',
    tier: 'Logo',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800',
    description: 'Custom logo design for gothic brands. Hand-crafted raven iconography.',
    featured: true
  },
  {
    id: '3',
    name: 'Moonlight Skull PNG',
    price: 8.00,
    category: 'Small Shop Files',
    subCategory: 'PNG',
    tier: 'Non Exclusive',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800',
    description: 'High quality transparent PNG asset. Detailed skull with floral accents.',
    featured: false
  },
  {
    id: '4',
    name: 'Spooky Scan To Pay',
    price: 12.00,
    category: 'Business',
    subCategory: 'Branding',
    tier: 'Scan To Pay',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800',
    description: 'Customized QR code display for your shop. Modern spooky aesthetic.',
    featured: true
  }
];

export const MOCK_REVIEWS: Review[] = [
  { id: '1', author: 'Morticia A.', text: 'Absolutely love the exclusive files! The quality is unmatched.', rating: 5 },
  { id: '2', author: 'Raven M.', text: 'Ghastly Raven did my business cards and they are stunning.', rating: 5 },
  { id: '3', author: 'Wednesday X.', text: 'Quick turnaround on custom requests. 10/10 would recommend.', rating: 5 }
];

export const FAQS = [
  { q: "What is your turnaround time?", a: "Standard turnaround for business graphics is 3-5 business days. Custom requests vary depending on complexity." },
  { q: "Do you offer refunds?", a: "Due to the digital nature of our products, all sales are final. Please contact us if you have any issues with your download." },
  { q: "How do Exclusive files work?", a: "Exclusive files are sold to only one customer. Once purchased, they are removed from the shop forever." }
];
