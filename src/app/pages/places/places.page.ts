import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SearchComponent } from "src/app/component/search/search.component";
import { PlacesService } from 'src/app/services/places.service';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, retry } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TranslatesService } from 'src/app/services/translate.service';
import { AngularFireDatabase } from '@angular/fire/database';

declare var google: any;
@Component({
  selector: "app-places",
  templateUrl: "./places.page.html",
  styleUrls: ["./places.page.scss"],
})
export class PlacesPage implements OnInit {
  fakePlaces = Array(3);
  saved: boolean = false;
  places: any;
  locationList = [];
  checkLanguage: any;
  cityInfo: any;

  constructor(private modalCtrl: ModalController, private router: Router, private placesService: PlacesService,
    private geolocation: Geolocation, private translateService: TranslatesService, private db: AngularFireDatabase) {}

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getPlaces();
    // this.languageCheck();
  }

  // async languageCheck(){
  //   this.checkLanguage = await this.translateService.getLang();
  // }

  async getPlaces(){
    this.checkLanguage = await this.translateService.getLang();
    this.placesService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({
          key: c.payload.key, ...c.payload.val()
        })
      ))
    ).subscribe(data => {
      this.places = data;
      // this.locationList
      this.geolocation
        .getCurrentPosition()
        .then((position) => {
          this.places.forEach((element, index) => {
            // if(this.checkLanguage == 'en'){
            //   this.db.object('/city/' + element.city).valueChanges().subscribe(data => {
            //     this.cityInfo = data;
            //     console.log(this.cityInfo);
            //   })
            // }
            // this.languageCheck(element.key, element.city);
            const latLngA = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const latLngB = new google.maps.LatLng(element.lat, element.lng);
            let distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);

            if (distance < 1000) {
              distance = distance.toFixed(0);
              this.places["distance"] = distance + ' m';
              
            } else {
              distance = (distance / 1000).toFixed(2);
              this.places[index]["distance"] = distance + ' km';
            }
          
          });
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(this.places);
    });
  }

  async goSearch() {
    const modal = await this.modalCtrl.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

  gotoPlace(id) {
    this.router.navigate(["/places-detail", id]);
  }

  clicked() {
    if (this.saved) {
      this.saved = false;
    } else {
      this.saved = true;
    }
  }
}
