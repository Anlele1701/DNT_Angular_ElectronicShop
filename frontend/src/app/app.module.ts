import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './client/about-us/about-us.component';
import { CarouselModule } from './component/carousel/carousel.module';
import { PurchaseHistoryComponent } from './client/purchase-history/purchase-history.component';
import { MembershipClassComponent } from './client/membership-class/membership-class.component';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { ProductCategoryComponent } from './client/product-category/product-category.component';
import { ProductItemsComponent } from './client/product-items/product-items.component';
import { PersonalPageComponent } from './client/personal-page/personal-page.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
import { PurchaseComponent } from './client/purchase/purchase.component';
import { LoginRegisComponent } from './client/login-regis/login-regis.component';
import { OrderComponent } from './client/order/order.component';
import { CompanyComponent } from './admin/company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './admin/product/product.component';
import { FormCreateProductComponent } from './admin/form-create-product/form-create-product.component';
import { DienThoaiFormComponent } from './admin/thongSoForm/dien-thoai-form/dien-thoai-form.component';
import { LapTopFormComponent } from './admin/thongSoForm/lap-top-form/lap-top-form.component';
import { ChuotFormComponent } from './admin/thongSoForm/chuot-form/chuot-form.component';
import { ManHinhFormComponent } from './admin/thongSoForm/man-hinh-form/man-hinh-form.component';
import { TaiNgheFormComponent } from './admin/thongSoForm/tai-nghe-form/tai-nghe-form.component';
import { BanPhimFormComponent } from './admin/thongSoForm/ban-phim-form/ban-phim-form.component';
import { CategoryComponent } from './admin/category/category.component';
import { VerifyEmailComponent } from './client/login-regis/verify-email/verify-email.component';
import { VerifyNotiComponent } from './client/login-regis/verify-noti/verify-noti.component';
import { HomepageComponent } from './client/homepage/homepage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgotPasswordComponent } from './client/login-regis/forgot-password/forgot-password.component';
import { ResetComponent } from './client/login-regis/forgot-password/reset/reset.component';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditProductComponent } from './admin/product/edit-product/edit-product.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ContactComponent } from './client/contact/contact.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { API } from './services/API.service';
import { LoginNhanVienComponent } from './admin/login-nhan-vien/login-nhan-vien.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { DetailOrderAdminComponent } from './admin/order-management/detail-order-admin/detail-order-admin.component';
import { EditOrderAdminComponent } from './admin/order-management/edit-order-admin/edit-order-admin.component';
import { YourAccountComponent } from './client/your-account/your-account.component';
import { EditOrderComponent } from './client/order/edit-order/edit-order.component';
import { CancelOrderComponent } from './client/order/cancel-order/cancel-order.component';
import { CompareProductComponent } from './client/compare-product/compare-product.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { PopUpCreateCusComponent } from './admin/customers/pop-up-create-cus/pop-up-create-cus.component';
import { PopUpCusDetailComponent } from './admin/customers/pop-up-cus-detail/pop-up-cus-detail.component';
import { PopUpEditCusInfoComponent } from './admin/customers/pop-up-edit-cus-info/pop-up-edit-cus-info.component';
import { SearchpageComponent } from './client/searchpage/searchpage.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutUsComponent,
    PurchaseHistoryComponent,
    MembershipClassComponent,
    HeaderComponent,
    FooterComponent,
    ProductCategoryComponent,
    ProductItemsComponent,
    PersonalPageComponent,
    ShoppingCartComponent,
    PurchaseComponent,
    ProductDetailComponent,
    LoginRegisComponent,
    CompanyComponent,
    ProductComponent,
    FormCreateProductComponent,
    DienThoaiFormComponent,
    LapTopFormComponent,
    ChuotFormComponent,
    ManHinhFormComponent,
    TaiNgheFormComponent,
    BanPhimFormComponent,
    CategoryComponent,
    OrderComponent,
    CompanyComponent,
    VerifyEmailComponent,
    VerifyNotiComponent,
    HomepageComponent,
    ResetComponent,
    EditProductComponent,
    ForgotPasswordComponent,
    ResetComponent,
    YourAccountComponent,
    ContactComponent,
    ClientLayoutComponent,
    CustomersComponent,
    OrderManagementComponent,
    DetailOrderAdminComponent,
    EditOrderAdminComponent,
    EditOrderComponent,
    CancelOrderComponent,
    LoginNhanVienComponent,
    PopUpCreateCusComponent,
    PopUpCusDetailComponent,
    PopUpEditCusInfoComponent,
    CompareProductComponent,
    SearchpageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [API],
  bootstrap: [AppComponent],
})
export class AppModule {}
