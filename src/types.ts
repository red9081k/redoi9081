export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  calories: number;
  category: 'main' | 'starter' | 'soup' | 'dessert' | 'beverage';
  image: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0: None, 1: Mild, 2: Medium, 3: Hot
  allergens: string[];
  isPopular?: boolean;
  isVegetarian?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number; // 1-5
  relativeTime: string;
  text: string;
  avatarUrl?: string;
  helpfulCount?: number;
}

export interface Branch {
  id: string;
  nameEn: string;
  nameAr: string;
  lat: number;
  lng: number;
  addressEn: string;
  addressAr: string;
  phone: string;
  hoursEn: string;
  hoursAr: string;
  imageUrl: string;
}

export interface ReservationParams {
  id?: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingType: 'vip' | 'family' | 'open';
  branchId: string;
  specialRequests?: string;
}
