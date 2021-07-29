import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckComponent } from './check.component';

const routes: Routes = [{ path: '', component: CheckComponent }, { path: 'thank-you-page', loadChildren: () => import('./thank-you-page/thank-you-page.module').then(m => m.ThankYouPageModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckRoutingModule { }
