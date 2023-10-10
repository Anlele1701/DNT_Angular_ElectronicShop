import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  ngOnInit() {}
  images = [
    {
      imageSrc: '/assets/client/AboutUs/image1-About.jpg',
      imageAlt: 'Cửa hàng Apple',
    },
    {
      imageSrc: '/assets/client/AboutUs/image2-About.jpg',
      imageAlt: 'Sản phẩm trưng bày',
    },
    {
      imageSrc: '/assets/client/AboutUs/image3-About.jpg',
      imageAlt: 'iphone 15 Promax',
    },
  ];
}
