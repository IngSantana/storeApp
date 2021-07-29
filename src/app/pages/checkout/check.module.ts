
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckRoutingModule } from './check-routing.module';
import { CheckComponent } from './check.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DetailsComponent } from './details/details.component';



@NgModule({
  declarations: [
    CheckComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CheckRoutingModule,
    FormsModule,
    MaterialModule

    
  ]
})
export class CheckModule { }
