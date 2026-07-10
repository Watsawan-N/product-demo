import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Product,
  ProductStatus,
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES
} from '../../models/product.model';
import {
  integerValidator,
  maxDecimalPlacesValidator,
  minNumberValidator,
  positiveNumberValidator
} from '../../validators/product-form.validators';

interface ProductFormGroup {
  name: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<string>;
  stockQuantity: FormControl<string>;
  status: FormControl<ProductStatus | ''>;
}

export interface ProductFormValue {
  name: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  status: ProductStatus;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() initialProduct: Product | null = null;
  @Input() submitting = false;
  @Output() formSubmit = new EventEmitter<ProductFormValue>();
  @Output() cancel = new EventEmitter<void>();

  readonly categories = PRODUCT_CATEGORIES;
  readonly statuses = PRODUCT_STATUSES;

  readonly productForm = new FormGroup<ProductFormGroup>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)]
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    price: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        positiveNumberValidator(),
        maxDecimalPlacesValidator(2)
      ]
    }),
    stockQuantity: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, minNumberValidator(0), integerValidator()]
    }),
    status: new FormControl<ProductStatus | ''>('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.resetFormValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialProduct'] && !changes['initialProduct'].firstChange) {
      this.resetFormValues();
    }
  }

  isInvalid(controlName: keyof ProductFormGroup): boolean {
    const control = this.productForm.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.focusFirstInvalidField();
      return;
    }

    const formValue = this.productForm.getRawValue();
    this.formSubmit.emit({
      name: formValue.name.trim(),
      description: formValue.description.trim(),
      category: formValue.category,
      price: Number(formValue.price),
      stockQuantity: Number(formValue.stockQuantity),
      status: formValue.status as ProductStatus
    });
  }

  reset(): void {
    this.resetFormValues();
  }

  private resetFormValues(): void {
    if (this.initialProduct) {
      this.productForm.reset(
        {
          name: this.initialProduct.name,
          description: this.initialProduct.description,
          category: this.initialProduct.category,
          price: this.initialProduct.price.toFixed(2),
          stockQuantity: String(this.initialProduct.stockQuantity),
          status: this.initialProduct.status
        },
        { emitEvent: false }
      );
    } else {
      this.productForm.reset(
        {
          name: '',
          description: '',
          category: '',
          price: '',
          stockQuantity: '',
          status: ''
        },
        { emitEvent: false }
      );
    }

    this.productForm.markAsPristine();
    this.productForm.markAsUntouched();
  }

  private focusFirstInvalidField(): void {
    const invalidControlSelectorMap: Array<[keyof ProductFormGroup, string]> = [
      ['name', '[data-testid="product-name-input"]'],
      ['description', '[data-testid="product-description-input"]'],
      ['category', '[data-testid="product-category-select"]'],
      ['price', '[data-testid="product-price-input"]'],
      ['stockQuantity', '[data-testid="product-stock-input"]'],
      ['status', '[data-testid="product-status-select"]']
    ];

    const firstInvalidSelector = invalidControlSelectorMap.find(([controlName]) =>
      this.productForm.controls[controlName].invalid
    )?.[1];

    if (!firstInvalidSelector) {
      return;
    }

    const targetElement = this.elementRef.nativeElement.querySelector<HTMLElement>(
      firstInvalidSelector
    );

    targetElement?.focus();
  }
}
