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
import { CacheService } from 'src/app/services/cache.service';
import { AuthService } from "src/app/services/auth.service";

declare var google: any;
@Component({
  selector: "app-places",
  templateUrl: "./places.page.html",
  styleUrls: ["./places.page.scss"],
})
export class PlacesPage implements OnInit {
  fakePlaces = Array(3);
  saved: boolean;
  places: any;
  locationList = [];
  checkLanguage: any;
  cityInfo: any;
  userUID:any;
  tosavePlaceName:any;
  tosavePlaceCity:any;
  tosavePlacePicture:any;
  tosaveLat:any;
  tosaveLng:any;
  tosaveRating:any;
  savedPlace:any;
  isLoggedIn: any;

  constructor(private modalCtrl: ModalController, private router: Router, private placesService: PlacesService,
    private geolocation: Geolocation, private translateService: TranslatesService, private db: AngularFireDatabase, private authSrv:AuthService, private cache: CacheService) {}


  ngOnInit() {
    this.authSrv.userDetails().subscribe(res =>{
      if (res !== null) {
        this.userUID = res.uid;  
        this.getPlaces();

      } 
    });
    
  }

  ionViewWillEnter(){
    this.getPlaces();
    this.cache.getLoggedin().then(res => {
      this.isLoggedIn = res;
      console.log(this.isLoggedIn);
    });
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

      this.placesService.getAllSavedPlace(this.userUID).snapshotChanges().pipe(
        map(changes => changes.map(
          c => ({
            key: c.payload.key, ...c.payload.val()
          })
        ))
      ).subscribe(data => {
        this.savedPlace = data;
        for(let currPlace of this.savedPlace){
          for(let place of this.places){
            if(currPlace.key==place.key){
              //this.saved = true; //mark it as true
              place.saved=true;
              console.log('placekey '+place.key);
              console.log('currplacekey '+currPlace.key);
            } else if(currPlace.key!=place.key){
              place.saved=false;
            }
          }
        }
      });

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

  defaultFav(id){
    document.getElementById(id).click();
  }

  clicked(place,key) {
    if (place.saved) {
      this.db.object('/saved/'+this.userUID+'/'+ key).remove();
      place.saved=false;
    } else {
      //console.log(key);
      place.saved=true;
      this.db.object('/places/' + key).valueChanges().subscribe(data => {
        this.tosavePlaceName = data['name'];
        this.tosavePlacePicture = data['picture'];
        this.tosavePlaceCity = data['city'];
        this.tosaveLat = data['lat'];
        this.tosaveLng = data['lng'];
        this.tosaveRating = data['rating'];

        let obj = {
          placeID: key,
          name:this.tosavePlaceName,
          city:this.tosavePlaceCity,
          picture:this.tosavePlacePicture,
          lat:this.tosaveLat,
          lng:this.tosaveLng,
          rating:this.tosaveRating
        }
        //console.log(obj);
        this.placesService.savePlace(obj, this.userUID, key);
      });

    }
  }
}
