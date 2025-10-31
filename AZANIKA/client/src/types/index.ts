export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional for security reasons
};

export type Order = {
  id: string;
  userId: string;
  productIds: string[];
  totalAmount: number;
  createdAt: string;
  status: 'pending' | 'completed' | 'canceled';
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  totalAmount: number;
};