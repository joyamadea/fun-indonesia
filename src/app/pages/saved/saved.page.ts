import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PlacesService } from 'src/app/services/places.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

declare var google: any;

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {

  savedPlace:any;
  userUID:any;
  constructor(private placesService: PlacesService, private authSrv:AuthService, 
    private geolocation: Geolocation, private router: Router,  private db: AngularFireDatabase) { }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res =>{
      if (res !== null) {
        this.userUID = res.uid;
        console.log(this.userUID);
        this.placesService.getAllSavedPlace(this.userUID).snapshotChanges().pipe(
          map(changes => changes.map(
            c => ({
              key: c.payload.key, ...c.payload.val()
            })
          ))
        ).subscribe(data => {
          this.savedPlace = data;
          this.geolocation
        .getCurrentPosition()
        .then((position) => {
          this.savedPlace.forEach((element, index) => {
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
              this.savedPlace["distance"] = distance + ' m';
              
            } else {
              distance = (distance / 1000).toFixed(2);
              this.savedPlace[index]["distance"] = distance + ' km';
            }
          
          });
        })
        .catch((err) => {
          console.log(err);
        });
          console.log(this.savedPlace);
        });    
      }
    });
    
  }

  gotoPlace(id) {
    this.router.navigate(["/places-detail", id]);
  }

  clicked(key) {
    this.db.object('/saved/'+this.userUID+'/'+ key).remove();
  }

}
