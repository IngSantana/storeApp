import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/pages/products/services/products.service';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements OnInit {

  constructor(private productSvc: ProductsService) { }

  ngOnInit(): void {
    this.productSvc.getProducts();
  }

}
