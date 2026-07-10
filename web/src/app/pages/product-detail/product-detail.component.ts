import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductStatus } from '../../models/product.model';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  product?: Product;
  isDeleteDialogVisible = false;
  isLoading = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.isLoading = true;
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = productId ? this.productService.getProductById(productId) : undefined;
    this.isLoading = false;
  }

  goBack(): void {
    void this.router.navigate(['/products']);
  }

  goToEdit(): void {
    if (!this.product) {
      return;
    }

    void this.router.navigate(['/products', this.product.id, 'edit']);
  }

  openDeleteDialog(): void {
    this.isDeleteDialogVisible = true;
  }

  closeDeleteDialog(): void {
    this.isDeleteDialogVisible = false;
  }

  confirmDelete(): void {
    if (!this.product) {
      return;
    }

    this.productService.deleteProduct(this.product.id);
    this.closeDeleteDialog();
    this.notificationService.showSuccess('Product deleted successfully.');
    void this.router.navigate(['/products']);
  }

  getStatusBadgeClass(status: ProductStatus): string {
    switch (status) {
      case 'Active':
        return 'status-badge-active';
      case 'Inactive':
        return 'status-badge-inactive';
      case 'Out of Stock':
        return 'status-badge-out-of-stock';
      default:
        return 'bg-light text-dark';
    }
  }
}
