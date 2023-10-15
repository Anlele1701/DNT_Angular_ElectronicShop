import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css'],
})
export class PersonalPageComponent {
  activeIndex = 1;
  onClickBtnMenu(index: number) {
    this.activeIndex = index;
  }
}
