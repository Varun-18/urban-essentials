export enum Size {
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  XL = 'XL',
  XXL = 'XXL',
  OneSize = 'OneSize',
}

export interface ProductInterface {
  name: string;
  price: number;
  images: string[];
  description: string;
  stock: { [key in Size]?: number };
  rating: number;
  comingSoon: boolean;
  brand: string;
  size: Size[];
}
