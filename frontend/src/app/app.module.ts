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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutUsComponent,
    PurchaseHistoryComponent,
    MembershipClassComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
    ProductItemsComponent,
    PersonalPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CarouselModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
