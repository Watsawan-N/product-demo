export type ProductStatus = 'Active' | 'Inactive' | 'Out of Stock';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  status: ProductStatus;
  createdDate: string;
  updatedDate: string;
}

export const PRODUCT_CATEGORIES: string[] = [
  'Electronics',
  'Computer',
  'Mobile',
  'Home Appliance',
  'Accessories',
  'Office Equipment'
];

export const PRODUCT_STATUSES: ProductStatus[] = ['Active', 'Inactive', 'Out of Stock'];

export const PRODUCT_STORAGE_KEY = 'product-demo-products';
