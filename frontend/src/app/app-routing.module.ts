import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './client/about-us/about-us.component';
import { PurchaseHistoryComponent } from './client/purchase-history/purchase-history.component';
import { MembershipClassComponent } from './client/membership-class/membership-class.component';

const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent },
  { path: 'membership-class', component: MembershipClassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
