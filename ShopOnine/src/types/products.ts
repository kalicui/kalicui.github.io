// EXPORTS: IProduct, ICartItem, Platform, Category

export type Platform = 'pinduoduo' | 'taobao' | 'douyin' | 'jd';

export type Category = 'featured' | 'clothing' | 'digital' | 'food' | 'home' | 'beauty' | 'baby';

export interface IProduct {
  id: string;
  name: string;
  platform: Platform;
  category: Category;
  price: number;
  image: string;
  description: string;
}

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  platform: string;
  quantity: number;
  image: string;
}
