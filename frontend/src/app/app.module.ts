import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutUsComponent,
    PurchaseHistoryComponent,
    MembershipClassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CarouselModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
