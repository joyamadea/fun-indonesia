import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { PlacesPage } from './places.page';
import { TranslateModule } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesPageRoutingModule,
    TranslateModule
  ],
  providers: [ Geolocation ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
