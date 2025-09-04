export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  discountPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  inStock: boolean;
}
