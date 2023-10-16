import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './client/about-us/about-us.component';
import { PurchaseHistoryComponent } from './client/purchase-history/purchase-history.component';
import { MembershipClassComponent } from './client/membership-class/membership-class.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProductCategoryComponent } from './client/product-category/product-category.component';
import { PersonalPageComponent } from './client/personal-page/personal-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CustomersComponent } from './admin/customers/customers.component';
const routes: Routes = [
  // CLIENT
  { path: 'about-us', component: AboutUsComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent },
  { path: 'membership-class', component: MembershipClassComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'category', component: ProductCategoryComponent },
  { path: 'personal', component: PersonalPageComponent },
  // ADMIN
  {
    path: 'admin',
    component: SidebarComponent, // Trang layout admin
    children: [ // Component con
      { path: 'dashboard', component: DashboardComponent }, 
      {path: 'customers', component: CustomersComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
