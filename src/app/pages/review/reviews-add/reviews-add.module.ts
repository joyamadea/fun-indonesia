import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsAddPageRoutingModule } from './reviews-add-routing.module';

import { ReviewsAddPage } from './reviews-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsAddPageRoutingModule
  ],
  declarations: [ReviewsAddPage]
})
export class ReviewsAddPageModule {}
