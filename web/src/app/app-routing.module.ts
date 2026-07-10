import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddPageComponent } from './pages/product-add/product-add.component';
import { ProductDetailPageComponent } from './pages/product-detail/product-detail.component';
import { ProductEditPageComponent } from './pages/product-edit/product-edit.component';
import { ProductListPageComponent } from './pages/product-list/product-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductListPageComponent },
  { path: 'products/add', component: ProductAddPageComponent },
  { path: 'products/:id', component: ProductDetailPageComponent },
  { path: 'products/:id/edit', component: ProductEditPageComponent },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
