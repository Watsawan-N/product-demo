import { Injectable } from '@angular/core';
import { PRODUCT_MOCK_DATA } from '../data/product-mock.data';
import { Product, PRODUCT_STORAGE_KEY } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Product[] {
    return this.readProducts();
  }

  getProductById(id: string): Product | undefined {
    return this.readProducts().find((product) => product.id === id);
  }

  createProduct(product: Product): Product {
    const products = this.readProducts();
    const createdProduct = this.cloneProduct(product);
    products.push(createdProduct);
    this.writeProducts(products);
    return createdProduct;
  }

  updateProduct(id: string, product: Product): Product {
    const products = this.readProducts();
    const currentProductIndex = products.findIndex((currentProduct) => currentProduct.id === id);

    if (currentProductIndex === -1) {
      throw new Error(`Product with id ${id} was not found.`);
    }

    const existingProduct = products[currentProductIndex];
    const updatedProduct: Product = {
      ...this.cloneProduct(product),
      id: existingProduct.id,
      createdDate: existingProduct.createdDate,
      updatedDate: product.updatedDate
    };

    products[currentProductIndex] = updatedProduct;
    this.writeProducts(products);
    return updatedProduct;
  }

  deleteProduct(id: string): void {
    const products = this.readProducts().filter((product) => product.id !== id);
    this.writeProducts(products);
  }

  initializeMockData(): void {
    const storage = this.getStorage();
    if (!storage) {
      return;
    }

    const storedValue = storage.getItem(PRODUCT_STORAGE_KEY);

    if (storedValue === null) {
      this.writeProducts(PRODUCT_MOCK_DATA);
      return;
    }

    try {
      const parsedValue: unknown = JSON.parse(storedValue);
      if (!this.isValidProductArray(parsedValue)) {
        throw new Error('Invalid local storage data.');
      }
    } catch {
      this.writeProducts(PRODUCT_MOCK_DATA);
    }
  }

  resetMockData(): void {
    this.writeProducts(PRODUCT_MOCK_DATA);
  }

  generateProductId(): string {
    const lastNumericId = this.readProducts()
      .map((product) => Number(product.id.replace('PRD-', '')))
      .filter((value) => Number.isFinite(value))
      .sort((left, right) => right - left)[0];

    const nextId = (lastNumericId ?? 0) + 1;
    return `PRD-${String(nextId).padStart(3, '0')}`;
  }

  private readProducts(): Product[] {
    const storage = this.getStorage();

    if (!storage) {
      return this.cloneProducts(PRODUCT_MOCK_DATA);
    }

    const storedValue = storage.getItem(PRODUCT_STORAGE_KEY);

    if (storedValue === null) {
      return this.cloneProducts(PRODUCT_MOCK_DATA);
    }

    try {
      const parsedValue: unknown = JSON.parse(storedValue);

      if (!this.isValidProductArray(parsedValue)) {
        throw new Error('Invalid product array.');
      }

      return this.cloneProducts(parsedValue);
    } catch {
      this.writeProducts(PRODUCT_MOCK_DATA);
      return this.cloneProducts(PRODUCT_MOCK_DATA);
    }
  }

  private writeProducts(products: Product[]): void {
    const storage = this.getStorage();

    if (!storage) {
      return;
    }

    storage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(this.cloneProducts(products)));
  }

  private getStorage(): Storage | null {
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }

  private isValidProductArray(value: unknown): value is Product[] {
    return Array.isArray(value) && value.every((item) => this.isValidProduct(item));
  }

  private isValidProduct(value: unknown): value is Product {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const candidate = value as Record<string, unknown>;

    return (
      typeof candidate['id'] === 'string' &&
      typeof candidate['name'] === 'string' &&
      typeof candidate['description'] === 'string' &&
      typeof candidate['category'] === 'string' &&
      typeof candidate['price'] === 'number' &&
      typeof candidate['stockQuantity'] === 'number' &&
      typeof candidate['status'] === 'string' &&
      typeof candidate['createdDate'] === 'string' &&
      typeof candidate['updatedDate'] === 'string'
    );
  }

  private cloneProducts(products: Product[]): Product[] {
    return products.map((product) => this.cloneProduct(product));
  }

  private cloneProduct(product: Product): Product {
    return { ...product };
  }
}
