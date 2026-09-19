export type StyleType =
  | 'Minimal'
  | 'Modern'
  | 'Corporate'
  | 'Creative'
  | 'Luxury'
  | 'Editorial'
  | 'Bold'
  | 'Dark'
  | 'Elegant';

export type LayoutType =
  | 'Grid'
  | 'Full Width'
  | 'Split Screen'
  | 'Editorial'
  | 'Landing Page';

export type ColorTheme =
  | 'Dark'
  | 'Light'
  | 'Green'
  | 'Red'
  | 'Blue'
  | 'Neutral'
  | 'Colorful';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
}

export interface TemplateFeature {
  id: string;
  name: string;
  iconName: string;
}

export interface TemplateReview {
  id: string;
  user: {
    id: string;
    username: string;
    fullName: string;
    avatar: string;
  };
  rating: number; // 1 to 5
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  tags: string[];
  style: StyleType;
  industry: string;
  layout: LayoutType;
  colorTheme: ColorTheme;
  features: string[];
  technologies: string[];
  thumbnail: string;
  previewImage: string;
  demoUrl?: string;
  demoContentHtml?: string; // Rich simulated site content for in-app iframe preview
  author: {
    name: string;
    agency?: string;
    avatar: string;
    verified: boolean;
  };
  price: number; // 0 for free
  isFree: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  responsive: boolean;
  ratingAvg: number;
  reviewsCount: number;
  downloadsCount: number;
  downloads?: number;
  viewsCount: number;
  perfectFor: string[];
  createdAt: string;
  updatedAt: string;
}

export type SortOption = 'popular' | 'newest' | 'updated' | 'alpha' | 'alphabetical' | 'rating';

export interface Collection {
  id: string;
  name: string;
  description: string;
  userId: string;
  templateIds: string[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  bio: string;
  website: string;
  github: string;
  linkedin: string;
  isStaff: boolean;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  styles: StyleType[];
  layouts: LayoutType[];
  features: string[];
  colorThemes: ColorTheme[];
  pricing: 'all' | 'free' | 'premium';
  sortBy: SortOption;
}

export interface AIRecommendation {
  query: string;
  category?: string;
  style?: StyleType;
  industry?: string;
  keywords: string[];
  features?: string[];
  explanation: string;
  matchedTemplateIds: string[];
}
