import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './client/about-us/about-us.component';
import { PurchaseHistoryComponent } from './client/purchase-history/purchase-history.component';
import { MembershipClassComponent } from './client/membership-class/membership-class.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProductCategoryComponent } from './client/product-category/product-category.component';
import { PersonalPageComponent } from './client/personal-page/personal-page.component';
const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent },
  { path: 'membership-class', component: MembershipClassComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'admin', component: SidebarComponent },
  { path: 'category', component: ProductCategoryComponent },
  { path: 'personal', component: PersonalPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
