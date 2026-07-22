import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Product,
  ProductStatus,
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES
} from '../../models/product.model';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';

type SortField = 'id' | 'name' | 'price' | 'stockQuantity' | 'updatedDate';
type SortDirection = 'asc' | 'desc';

interface ProductFilterState {
  searchTerm: string;
  category: string;
  status: ProductStatus | '';
  sortField: SortField;
  sortDirection: SortDirection;
  pageNumber: number;
  pageSize: number;
}

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListPageComponent implements OnInit {
  readonly categories = PRODUCT_CATEGORIES;
  readonly statuses = PRODUCT_STATUSES;
  readonly pageSizeOptions = [5, 10, 20];
  readonly defaultState: ProductFilterState = {
    searchTerm: '',
    category: '',
    status: '',
    sortField: 'id',
    sortDirection: 'asc',
    pageNumber: 1,
    pageSize: 5
  };

  state: ProductFilterState = { ...this.defaultState };
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  selectedProductForDelete: Product | null = null;
  isDeleteDialogVisible = false;
  isResetDialogVisible = false;
  isLoading = true;

  constructor(
    private readonly productService: ProductService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.state.pageSize));
  }

  get showingStart(): number {
    if (this.filteredProducts.length === 0) {
      return 0;
    }

    return (this.state.pageNumber - 1) * this.state.pageSize + 1;
  }

  get showingEnd(): number {
    if (this.filteredProducts.length === 0) {
      return 0;
    }

    return Math.min(this.state.pageNumber * this.state.pageSize, this.filteredProducts.length);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.allProducts = this.productService.getProducts();
    this.applyFilters();
    this.isLoading = false;
  }

  applyFilters(): void {
    const searchTerm = this.state.searchTerm.trim().toLowerCase();

    const filteredProducts = this.allProducts.filter((product) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        product.id.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm);
      const matchesCategory =
        this.state.category.length === 0 || product.category === this.state.category;
      const matchesStatus =
        this.state.status.length === 0 || product.status === this.state.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    this.filteredProducts = filteredProducts.sort((leftProduct, rightProduct) =>
      this.compareProducts(leftProduct, rightProduct, this.state.sortField, this.state.sortDirection)
    );

    if (this.state.pageNumber > this.totalPages) {
      this.state.pageNumber = this.totalPages;
    }

    const startIndex = (this.state.pageNumber - 1) * this.state.pageSize;
    const endIndex = startIndex + this.state.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  resetFilters(): void {
    this.state = { ...this.defaultState };
    this.applyFilters();
  }

  changePage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages) {
      return;
    }

    this.state.pageNumber = pageNumber;
    this.applyFilters();
  }

  onPageSizeChange(pageSize: string): void {
    this.state.pageSize = Number(pageSize);
    this.state.pageNumber = 1;
    this.applyFilters();
  }

  goToAddPage(): void {
    void this.router.navigate(['/products/add']);
  }

  goToDetailPage(productId: string): void {
    void this.router.navigate(['/products', productId]);
  }

  goToEditPage(productId: string): void {
    void this.router.navigate(['/products', productId, 'edit']);
  }

  openDeleteDialog(product: Product): void {
    this.selectedProductForDelete = product;
    this.isDeleteDialogVisible = true;
  }

  closeDeleteDialog(): void {
    this.selectedProductForDelete = null;
    this.isDeleteDialogVisible = false;
  }

  confirmDelete(): void {
    if (!this.selectedProductForDelete) {
      return;
    }

    this.productService.deleteProduct(this.selectedProductForDelete.id);
    this.closeDeleteDialog();
    this.loadProducts();
    this.notificationService.showSuccess('Product deleted successfully.');
  }

  openResetDialog(): void {
    this.isResetDialogVisible = true;
  }

  closeResetDialog(): void {
    this.isResetDialogVisible = false;
  }

  confirmResetMockData(): void {
    this.productService.resetMockData();
    this.closeResetDialog();
    this.resetFilters();
    this.loadProducts();
    this.notificationService.showSuccess('Mock data has been reset successfully.');
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

  private compareProducts(
    leftProduct: Product,
    rightProduct: Product,
    sortField: SortField,
    sortDirection: SortDirection
  ): number {
    const leftValue = leftProduct[sortField];
    const rightValue = rightProduct[sortField];

    let comparison = 0;

    if (typeof leftValue === 'number' && typeof rightValue === 'number') {
      comparison = leftValue - rightValue;
    } else {
      comparison = String(leftValue).localeCompare(String(rightValue), undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    }

    return sortDirection === 'asc' ? comparison : comparison * -1;
  }
}
