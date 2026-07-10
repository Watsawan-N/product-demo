import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { ProductFormValue } from '../../shared/product-form/product-form.component';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditPageComponent implements OnInit {
  product?: Product;
  isLoading = true;
  isSubmitting = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = productId ? this.productService.getProductById(productId) : undefined;
    this.isLoading = false;
  }

  onSubmit(formValue: ProductFormValue): void {
    if (!this.product) {
      return;
    }

    this.isSubmitting = true;

    const updatedProduct: Product = {
      ...this.product,
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      price: formValue.price,
      stockQuantity: formValue.stockQuantity,
      status: formValue.status,
      updatedDate: new Date().toISOString()
    };

    const savedProduct = this.productService.updateProduct(this.product.id, updatedProduct);
    this.notificationService.showSuccess('Product updated successfully.');
    this.isSubmitting = false;
    void this.router.navigate(['/products', savedProduct.id]);
  }

  onCancel(): void {
    if (!this.product) {
      void this.router.navigate(['/products']);
      return;
    }

    void this.router.navigate(['/products', this.product.id]);
  }

  goBackToList(): void {
    void this.router.navigate(['/products']);
  }
}
