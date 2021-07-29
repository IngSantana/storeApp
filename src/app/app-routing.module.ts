
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroSliderComponent } from './shared/components/hero/hero-slider/hero-slider.component';

const routes: Routes = [
  {
    path: 'initial',
    component:  HeroSliderComponent
  },

  { path: '', redirectTo: 'initial', pathMatch: 'full' },

  {
    path: 'products', 
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/check.module').then(m => m.CheckModule) },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }