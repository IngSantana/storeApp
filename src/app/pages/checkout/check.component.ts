import { Router } from '@angular/router';
import { Store } from './../../shared/interfaces/stores.interface';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { DataService } from 'src/app/shared/services/data.service';
import { NgForm } from '@angular/forms';
import { delay, switchMap } from 'rxjs/operators';
import { Product } from '../products/interface/product.interface';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {
  model={
    name: 'IdeasSantana',
    store: '',
    shippingAddress: '',
    city: ''
};
isDelivery= true;
cart: Product[] = [];
stores: Store[] = [];
  constructor(
     private dataSvc: DataService,
     private shoppingCarsSvc: ShoppingCartService,
     private productSvc: ProductsService,
     private router: Router
     ) {
       this.checkIfCartIsEmpty();
      }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void{
  this.isDelivery = value;
  }

  onSubmit({value: formData}: NgForm): void{
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap( res => console.log('Order =>', res)),
      switchMap(({id: orderId}) => {
         const details = this.prepareDetails();
         return this.dataSvc.saveDetailsOrder({details, orderId});
      }),
      tap( () => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap( () => this.shoppingCarsSvc.resetCart()) 
      )
      .subscribe()
  }

  getStores(): void {
  this.dataSvc.getStores()
    .pipe(
      tap(stores => this.stores = stores))
    .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }
  
  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = (stock - quantity);

      this.productSvc.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, productName, quantity }))
        )
        .subscribe()


    })
    return details;
  }

  private getDataCart(): void{
    this.shoppingCarsSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
        )
        .subscribe()
  }

  private checkIfCartIsEmpty(): void{

    this.shoppingCarsSvc.cartAction$
    .pipe(
      tap((products: Product[]) => {
        if(Array.isArray(products) && !products.length){
            this.router.navigate(['/products']);
        }
      })
      )
      .subscribe();
  }

}
