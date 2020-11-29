import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsAddPageRoutingModule } from './reviews-add-routing.module';

import { ReviewsAddPage } from './reviews-add.page';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsAddPageRoutingModule,
    IonicRatingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ReviewsAddPage]
})
export class ReviewsAddPageModule {}
