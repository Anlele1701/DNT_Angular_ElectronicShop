import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css'],
})
export class ProductItemsComponent {
  @Input() product: Product;
}
