import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { ProductFormValue } from '../../shared/product-form/product-form.component';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddPageComponent {
  isSubmitting = false;

  constructor(
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  onSubmit(formValue: ProductFormValue): void {
    this.isSubmitting = true;

    const timestamp = new Date().toISOString();
    const newProduct: Product = {
      id: this.productService.generateProductId(),
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      price: formValue.price,
      stockQuantity: formValue.stockQuantity,
      status: formValue.status,
      createdDate: timestamp,
      updatedDate: timestamp
    };

    const createdProduct = this.productService.createProduct(newProduct);
    this.notificationService.showSuccess('Product created successfully.');
    this.isSubmitting = false;
    void this.router.navigate(['/products', createdProduct.id]);
  }

  onCancel(): void {
    void this.router.navigate(['/products']);
  }
}
