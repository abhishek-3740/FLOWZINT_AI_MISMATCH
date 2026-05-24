export const categories = [
  {
    id: 'wellness',
    title: 'Wellness & self-care',
    description: 'Hydration, recovery, and small daily upgrades for better routines.',
    tone: 'Daily Reset',
  },
  {
    id: 'bamboo-salt',
    title: 'Home care essentials',
    description: 'Cleaning, refresh, and organization picks for the spaces you use every day.',
    tone: 'Home Ready',
  },
  {
    id: 'mens-cosmetics',
    title: 'Beauty & grooming',
    description: 'Simple beauty and grooming items with practical, real-world use.',
    tone: 'Everyday Style',
  },
  {
    id: 'bundles',
    title: 'Smart bundles',
    description: 'AI-picked stacks matched to your budget, habits, and household needs.',
    tone: 'Auto-Replenish',
  },
];

export const products = [
  {
    id: 'morning-dew-cleanser',
    name: 'Morning Dew Desk Lamp',
    category: 'Self-Care',
    price: 24,
    rating: 4.8,
    reviewsCount: 182,
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A warm, adjustable desk lamp that brings clean light to work, study, and late-night browsing.',
    benefits: ['Warm glow', 'Adjustable angle', 'Desk essential'],
    notes: ['Great for workspaces', 'Pairs with the organizer bundle'],
    reviews: [
      { name: 'Ari', rating: 5, comment: 'Feels premium and makes my desk look finished.' },
      { name: 'Mina', rating: 4, comment: 'Great light quality and very easy to place.' },
    ],
  },
  {
    id: 'bamboo-salt-scrub',
    name: 'Bamboo Salt Organizer Set',
    category: 'Home Care',
    price: 32,
    rating: 4.9,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A tidy desk and drawer organizer set for cables, pens, and everyday essentials.',
    benefits: ['Clutter control', 'Easy access', 'Desk upgrade'],
    notes: ['Use 2 to 3 times a week', 'Great for weekly refresh days'],
    reviews: [
      { name: 'Jordan', rating: 5, comment: 'A very clean organizer set that freed up my whole desk.' },
      { name: 'Sana', rating: 5, comment: 'Everything has a place now.' },
    ],
  },
  {
    id: 'sage-barrier-moisturizer',
    name: 'Sage Throw Blanket',
    category: 'Self-Care',
    price: 28,
    rating: 4.7,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A soft, high-comfort throw blanket that works for couch nights, naps, and desk chairs.',
    benefits: ['Soft touch', 'Warm comfort', 'Living room staple'],
    notes: ['A perfect daily comfort layer', 'Matches the desk and home set'],
    reviews: [
      { name: 'Leah', rating: 5, comment: 'Soft, warm, and looks great on the couch.' },
      { name: 'Noah', rating: 4, comment: 'Perfect for reading and late-night work.' },
    ],
  },
  {
    id: 'carbon-tone-tint',
    name: 'Carbon Tone Wireless Earbuds',
    category: 'Electronics',
    price: 34,
    rating: 4.8,
    reviewsCount: 211,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518443895914-b8bce4f2a7fe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A compact wireless earbud set with quick pairing and clear everyday sound.',
    benefits: ['Quick pairing', 'Portable case', 'Clear sound'],
    notes: ['Best for commuting', 'Pairs with the desk setup'],
    reviews: [
      { name: 'Evan', rating: 5, comment: 'The battery life is solid and they fit well.' },
      { name: 'Kai', rating: 4, comment: 'Great for work calls and the gym.' },
    ],
  },
  {
    id: 'night-reset-serum',
    name: 'Night Reset Travel Kit',
    category: 'Travel',
    price: 38,
    rating: 4.9,
    reviewsCount: 174,
    image: 'https://images.unsplash.com/photo-1528575478445-5c7b2d0f7d19?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528575478445-5c7b2d0f7d19?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522262590532-cf7d6fbf3b29?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A compact travel kit for overnight stays, weekend trips, and carry-on convenience.',
    benefits: ['Travel ready', 'Compact case', 'All-in-one'],
    notes: ['Best for trips', 'Pairs with the bundle offer'],
    reviews: [
      { name: 'Zoe', rating: 5, comment: 'Perfect size for my carry-on and weekend bags.' },
      { name: 'Omar', rating: 5, comment: 'Everything I need without wasting space.' },
    ],
  },
  {
    id: 'replenish-cleanser-bundle',
    name: 'Replenish Cleanser Bundle',
    category: 'Bundles',
    price: 54,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'A value bundle for first-time buyers who want the essentials in one smart checkout.',
    benefits: ['Better value', 'Automatic re-order cues', 'Effortless consistency'],
    notes: ['Great for first-time buyers', 'Built for recurring purchase behavior'],
    reviews: [
      { name: 'Tara', rating: 5, comment: 'This bundle feels like the app is thinking ahead for me.' },
      { name: 'Mason', rating: 5, comment: 'Excellent starter set with no wasted steps.' },
    ],
  },
];

export const userProfile = {
  name: 'Mira',
  email: 'mira@example.com',
  vibe: 'Morning Routine',
  initials: 'M',
};

export function getProductById(productId) {
  return products.find((product) => product.id === productId) ?? products[0];
}

export function getRecommendedProducts() {
  return [products[3], products[0], products[1]];
}