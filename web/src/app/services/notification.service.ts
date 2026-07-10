import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'error';

export interface NotificationMessage {
  type: NotificationType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly notificationSubject = new BehaviorSubject<NotificationMessage | null>(null);
  private dismissTimeoutId?: number;

  readonly notification$: Observable<NotificationMessage | null> =
    this.notificationSubject.asObservable();

  showSuccess(message: string): void {
    this.showNotification({ type: 'success', message });
  }

  showError(message: string): void {
    this.showNotification({ type: 'error', message });
  }

  clear(): void {
    if (this.dismissTimeoutId) {
      window.clearTimeout(this.dismissTimeoutId);
      this.dismissTimeoutId = undefined;
    }

    this.notificationSubject.next(null);
  }

  private showNotification(notification: NotificationMessage): void {
    this.clear();
    this.notificationSubject.next(notification);
    this.dismissTimeoutId = window.setTimeout(() => this.clear(), 4000);
  }
}
