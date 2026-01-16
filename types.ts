
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory?: string;
  tier?: string;
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  name: string;
  isAdmin: boolean;
  orderHistory: Order[];
  giftCards: GiftCard[];
  rewardsPoints: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'shipped';
  items: CartItem[];
  customerEmail: string;
}

export interface GiftCard {
  code: string;
  balance: number;
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
