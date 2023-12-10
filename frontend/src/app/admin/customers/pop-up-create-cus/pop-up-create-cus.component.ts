import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-create-cus',
  templateUrl: './pop-up-create-cus.component.html',
  styleUrls: ['./pop-up-create-cus.component.css']
})
export class PopUpCreateCusComponent implements OnInit {
  user: any = null;

  constructor() {}

  ngOnInit(): void {
    this.onCreateKH();
  }
  onCreateKH() {}
}
