import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
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
    CompanyComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CarouselModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
