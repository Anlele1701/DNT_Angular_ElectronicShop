import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.models';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent {
  products: Product[] = [
    {
      imgPath: '../../../assets/client/Shared/Banphim.png',
      name: 'DAREU EK87',
      description:
        'Nhỏ gọn, có đèn RGB với hơn 8 chế độ. Đầy đủ phím và tính năng.',
      price: 100000,
    },
    {
      imgPath: '../../../assets/client/Shared/Banphim.png',
      name: 'DAREU EK87',
      description:
        'Nhỏ gọn, có đèn RGB với hơn 8 chế độ. Đầy đủ phím và tính năng.',
      price: 100000,
    },
    {
      imgPath: '../../../assets/client/Shared/Banphim.png',
      name: 'DAREU EK87',
      description:
        'Nhỏ gọn, có đèn RGB với hơn 8 chế độ. Đầy đủ phím và tính năng.',
      price: 100000,
    },
  ];
}
