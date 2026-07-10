import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ConfirmationDialogData {
  productId?: string;
  productName?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() message = '';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Input() dialogTestId = 'confirmation-dialog';
  @Input() confirmButtonTestId = 'confirm-button';
  @Input() cancelButtonTestId = 'cancel-button';
  @Input() dialogData?: ConfirmationDialogData;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
