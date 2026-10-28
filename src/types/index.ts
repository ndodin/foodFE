export type RegionId = 'north' | 'central' | 'south';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  averagePrice: string;
  distanceKm: number;
  openHours: string;
  phone: string;
  imageUrl?: string;
  signatureDishes: string[];
}

export interface Dish {
  id: string;
  name: string;
  vietnameseName: string;
  region: RegionId;
  city: string;
  description: string;
  originStory: string;
  ingredients: string[];
  flavorProfile: string;
  priceRange: string;
  imageUrl: string;
  illustrationType: 'pho' | 'bun-cha' | 'bun-bo' | 'mi-quang' | 'cao-lau' | 'com-tam' | 'banh-xeo' | 'banh-mi' | 'cha-muc' | 'banh-trang-nuong' | 'seafood' | 'pot';
  category: 'Noodles' | 'Rice' | 'Banh & Rolls' | 'Snacks' | 'Dessert';
  spiciness: number; // 0-5
  isFeatured?: boolean;
  restaurants: Restaurant[];
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  vietnameseName: string;
  cities: string[];
  description: string;
  landmark: string;
  signatureSpecialty: string;
}

export interface RecognitionResult {
  dish: Dish;
  confidence: number;
  alternativeGuesses: { dishId: string; dishName: string; confidence: number }[];
  detectedAt: string;
  sourceType: 'camera' | 'gallery' | 'esp32';
  previewUrl: string;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  memberSince: string;
  isLoggedIn: boolean;
  savedDishIds: string[];
  savedRestaurantIds: string[];
  recentSearches: string[];
}

export type BottomNavDestination = 'home' | 'search' | 'favorites' | 'account';
