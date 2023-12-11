import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './client/about-us/about-us.component';
import { PurchaseHistoryComponent } from './client/purchase-history/purchase-history.component';
import { MembershipClassComponent } from './client/membership-class/membership-class.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ProductCategoryComponent } from './client/product-category/product-category.component';
import { PersonalPageComponent } from './client/personal-page/personal-page.component';
import { OrderComponent } from './client/order/order.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { CompanyComponent } from './admin/company/company.component';
import { ProductComponent } from './admin/product/product.component';
import { FormCreateProductComponent } from './admin/form-create-product/form-create-product.component';
import { CategoryComponent } from './admin/category/category.component';
import { HomepageComponent } from './client/homepage/homepage.component';
import { VerifyEmailComponent } from './client/login-regis/verify-email/verify-email.component';
import { LoginRegisComponent } from './client/login-regis/login-regis.component';
import { ForgotPasswordComponent } from './client/login-regis/forgot-password/forgot-password.component';
import { ResetComponent } from './client/login-regis/forgot-password/reset/reset.component';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
import { PurchaseComponent } from './client/purchase/purchase.component';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { ContactComponent } from './client/contact/contact.component';
import { YourAccountComponent } from './client/your-account/your-account.component';
import { AuthGuard } from './admin/shared/auth.guard';
import { LoginNhanVienComponent } from './admin/login-nhan-vien/login-nhan-vien.component';
import { CompareProductComponent } from './client/compare-product/compare-product.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { DetailOrderAdminComponent } from './admin/order-management/detail-order-admin/detail-order-admin.component';
import { SearchpageComponent } from './client/searchpage/searchpage.component';
const routes: Routes = [
  { path: '', redirectTo: '/client/homepage', pathMatch: 'full' },
  // CLIENT
  {
    path: 'client',
    component: ClientLayoutComponent, //Trang layout client
    children: [
      { path: '', redirectTo: '/client/homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'purchase-history', component: PurchaseHistoryComponent },
      { path: 'membership-class', component: MembershipClassComponent },
      { path: 'product-detail', component: ProductDetailComponent },
      { path: 'personal', component: PersonalPageComponent },
      { path: 'order/:idKH/:idDH', component: OrderComponent },
      { path: 'category', component: ProductCategoryComponent },
      { path: 'category/:loaiSP/:tenSP', component: ProductDetailComponent },
      { path: 'category/:loaiSP', component: ProductCategoryComponent },
      { path: 'verify-email/:token', component: VerifyEmailComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'your-account', component: YourAccountComponent },
      { path: 'compare-products/:loaiSP', component: CompareProductComponent },
      { path: 'searchpage', component: SearchpageComponent },
    ],
  },
  // ADMIN
  {
    path: 'admin',
    component: SidebarComponent, // Trang layout admin
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }, // Component con
      { path: 'customer', component: CustomersComponent },
      { path: 'brands', component: CompanyComponent },
      { path: 'products/:nameProduct', component: ProductComponent },
      {
        path: 'createNewProduct/:nameProduct',
        component: FormCreateProductComponent,
      },
      { path: 'categories', component: CategoryComponent },
      { path: 'orders', component: OrderManagementComponent},
      { path: 'detail-order/:idKH/:idDH', component: DetailOrderAdminComponent},
      { path: 'edit-product/:loaiSP/:idSP', component:EditProductComponent}
    ],
  },
  { path: 'loginAdmin', component: LoginNhanVienComponent },
  { path: 'category/:loaiSP/:tenSP', component: ProductDetailComponent },
  { path: 'category/:loaiSP', component: ProductCategoryComponent },
  { path: 'personal', component: PersonalPageComponent },
  { path: 'order', component: OrderComponent },
  { path: 'regis-login', component: LoginRegisComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset/:tokenReset', component: ResetComponent },
  { path: 'verify-email/:token', component: VerifyEmailComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
