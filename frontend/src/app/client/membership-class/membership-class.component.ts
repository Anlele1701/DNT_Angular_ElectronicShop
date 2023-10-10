import { Component } from '@angular/core';

@Component({
  selector: 'app-membership-class',
  templateUrl: './membership-class.component.html',
  styleUrls: ['./membership-class.component.css'],
})
export class MembershipClassComponent {
  activeIndex = 3;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
}
