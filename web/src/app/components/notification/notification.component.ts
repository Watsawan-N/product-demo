import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NotificationMessage,
  NotificationService
} from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  readonly notification$: Observable<NotificationMessage | null>;

  constructor(private readonly notificationService: NotificationService) {
    this.notification$ = this.notificationService.notification$;
  }

  clearNotification(): void {
    this.notificationService.clear();
  }
}
