import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
})
export class PurchaseHistoryComponent {
  activeIndex = 1;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
}
