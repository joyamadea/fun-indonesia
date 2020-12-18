import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsAddPageRoutingModule } from './reviews-add-routing.module';

import { ReviewsAddPage } from './reviews-add.page';
import { IonicRatingModule } from 'ionic4-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsAddPageRoutingModule,
    IonicRatingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [ReviewsAddPage]
})
export class ReviewsAddPageModule {}
