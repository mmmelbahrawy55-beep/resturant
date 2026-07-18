export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: MenuCategory;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  isSeasonal?: boolean;
  allergens?: string[];
  available: boolean;
}

export type MenuCategory = 'BBQ' | 'PIZZA' | 'BURGERS' | 'PIES' | 'DRINKS' | 'DESSERTS';

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

const SAMPLE_MENU_ITEMS: MenuItem[] = [
  // BBQ Items
  {
    id: 'bbq-1',
    name: 'Prime Rib Cray',
    description: 'Overnight dry-aged prime rib with rosemary, garlic, and our signature BBQ sauce',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    category: 'BBQ',
    isPopular: true,
    isSeasonal: true,
    allergens: ['Dairy'],
    available: true,
  },
  {
    id: 'bbq-2',
    name: 'Smoked Brisket',
    description: 'Slow-smoked Texas-style beef brisket with pepper rub',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1555072956-5ce74783fee6',
    category: 'BBQ',
    isSpicy: true,
    allergens: [],
    available: true,
  },
  {
    id: 'bbq-3',
    name: 'Grilled Salmon Fillet',
    description: 'Wild-caught Alaskan salmon with citrus herb glaze',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72e8b2d1',
    category: 'BBQ',
    allergens: ['Fish', 'Sesame'],
    available: true,
  },
  // Pizza Items
  {
    id: 'pizza-1',
    name: 'Triple Chee-Dye Magic',
    description: 'Our signature pizza with three different cheeses, marinara, and extra virgin olive oil',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1604068549290-dea91821c1f8',
    category: 'PIZZA',
    isPopular: true,
    allergens: ['Dairy', 'Gluten'],
    available: true,
  },
  {
    id: 'pizza-2',
    name: 'Truffle Mushroom Deluxe',
    description: 'Wild mushroom, truffle oil, and goat cheese on handmade crust',
    price: 36.99,
    image: 'https://images.unsplash.com/photo-1593760276052-e72330998f62',
    category: 'PIZZA',
    isSpicy: false,
    allergens: ['Dairy', 'Gluten'],
    available: true,
  },
  {
    id: 'pizza-3',
    name: 'Seafood Paradise',
    description: 'Shrimp, calamari, and scallops with garlic butter sauce',
    price: 42.99,
    image: 'https://images.unsplash.com/photo-1563778913838-4b1a5d4f0c97',
    category: 'PIZZA',
    allergens: ['Fish', 'Shellfish', 'Dairy', 'Gluten'],
    available: true,
  },
  // Burger Items
  {
    id: 'burger-1',
    name: 'Gourmet Triple Patty',
    description: 'Three 100% angus beef patties with cheddar, bacon, and house-made BBQ',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1550547640-d942b31b2915',
    category: 'BURGERS',
    isPopular: true,
    isVegetarian: false,
    allergens: ['Dairy', 'Gluten'],
    available: true,
  },
  {
    id: 'burger-2',
    name: 'Smoky BBQ Cheese',
    description: 'Beef burger with smoked cheddar, pickles, and BBQ sauce',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1550317138-1008f7ee1f76',
    category: 'BURGERS',
    isSpicy: false,
    allergens: ['Dairy', 'Gluten'],
    available: true,
  },
  {
    id: 'burger-3',
    name: 'Garden Green Deluxe',
    description: 'Plant-based patty with avocado, lettuce, and herb aioli on multigrain bun',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1546793665-c746ff2d8f57',
    category: 'BURGERS',
    isVegetarian: true,
    allergens: ['Dairy', 'Gluten'],
    available: true,
  },
  // Pie Items
  {
    id: 'pie-1',
    name: 'Apple Crumble Square',
    description: 'Warm caramelized apples with cinnamon, topped with butter crumble',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1575920940282-0a4dd5e0c83c',
    category: 'PIES',
    isSeasonal: true,
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    available: true,
  },
  {
    id: 'pie-2',
    name: 'Chocolate Lava Cake',
    description: 'Rich chocolate cake with molten caramel center and vanilla bean ice cream',
    price: 31.99,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9588',
    category: 'PIZZA',
    isPopular: true,
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    available: true,
  },
  {
    id: 'pie-3',
    name: 'Pumpkin Spice Delight',
    description: 'Creamy pumpkin filling with spiced caramel and whipped cream',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1541014150216-9401db442a04',
    category: 'PIES',
    isSeasonal: true,
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    available: true,
  },
];

const SAMPLE_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    date: '2025-07-20',
    time: '19:00',
    guests: 4,
    specialRequests: 'Window seat preferred',
    status: 'CONFIRMED',
    createdAt: '2025-07-15T10:30:00Z',
  },
  {
    id: 'res-2',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '(555) 987-6543',
    date: '2025-07-21',
    time: '20:30',
    guests: 2,
    status: 'PENDING',
    createdAt: '2025-07-16T14:22:00Z',
  },
];

export default SAMPLE_MENU_ITEMS;
export { SAMPLE_RESERVATIONS };