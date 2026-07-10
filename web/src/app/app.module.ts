import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProductAddPageComponent } from './pages/product-add/product-add.component';
import { ProductDetailPageComponent } from './pages/product-detail/product-detail.component';
import { ProductEditPageComponent } from './pages/product-edit/product-edit.component';
import { ProductListPageComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './shared/product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    HeaderComponent,
    NotificationComponent,
    ProductAddPageComponent,
    ProductDetailPageComponent,
    ProductEditPageComponent,
    ProductListPageComponent,
    ProductFormComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
