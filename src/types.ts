import type * as THREE from 'three';

export type Category = 
  | 'Smartphones'
  | 'Laptops'
  | 'Tablets'
  | 'Gaming'
  | 'Computer Components'
  | 'Accessories';

export interface ProductSpecifications {
  processor?: string;
  display?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  camera?: string;
  gpu?: string;
  weight?: string;
  refreshRate?: string;
  connectivity?: string;
  dimensions?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number; // in INR
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  specifications: ProductSpecifications;
  inStock: boolean;
  stockCount: number;
  modelType: 'laptop' | 'phone' | 'gpu' | 'monitor' | 'keyboard' | 'mouse' | 'headphones' | 'tablet';
  modelUrl?: string; // Optional for future .glb / .gltf external model
  colors: {
    name: string;
    hex: string;
    materialColor: number;
  }[];
  tag?: 'Bestseller' | 'New' | 'Flagship' | 'Trending';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
}

export interface ExplodedPart {
  name: string;
  mesh: THREE.Object3D;
  originalPos: { x: number; y: number; z: number };
  explodedPos: { x: number; y: number; z: number };
}
