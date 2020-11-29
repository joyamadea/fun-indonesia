import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesDetailPageRoutingModule } from './places-detail-routing.module';

import { PlacesDetailPage } from './places-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesDetailPageRoutingModule,
    TranslateModule,
    IonicRatingModule
  ],
  declarations: [PlacesDetailPage]
})
export class PlacesDetailPageModule {}
