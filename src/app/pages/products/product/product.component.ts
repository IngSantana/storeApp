
import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interface/product.interface';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductComponent implements OnInit {
 @Input() product!: Product;
 @Output() addToCartClick = new EventEmitter<Product>();
  constructor() { }
  
  ngOnInit(): void {

    }

    onClick(): void {
      this.addToCartClick.emit(this.product)}
}
