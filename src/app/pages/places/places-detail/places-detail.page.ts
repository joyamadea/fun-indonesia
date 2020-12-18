import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { PlacesService } from 'src/app/services/places.service';
import { ReviewsAddPage } from "../../review/reviews-add/reviews-add.page";
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslatesService } from 'src/app/services/translate.service';
import { AuthService } from "src/app/services/auth.service";
import { mapboxgl } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { ReviewService } from "src/app/services/review.service";
declare var mapboxgl: any;
@Component({
  selector: "app-places-detail",
  templateUrl: "./places-detail.page.html",
  styleUrls: ["./places-detail.page.scss"],
})
export class PlacesDetailPage implements OnInit {
  fakeActivity = Array(3);
  fakeFacilities = Array(2);
  fakeReview = Array(3);
  saved: boolean = false;
  placeId: any;
  detail: any = [];
  base: any = [];
  activities: any = [];
  checkLanguage: any;
  userUID:any;
  savedID:any;
  key:any;
  places:any = [];
  map: any;
  review: any = [];

  constructor(private router: Router, private modalCtrl: ModalController, public activatedRoute: ActivatedRoute, private authSrv:AuthService,
    private placesService: PlacesService, private db: AngularFireDatabase, private translateService: TranslatesService, private reviewService: ReviewService,
    private navCtrl: NavController) {}

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox_token;
    
  }
  
  ionViewWillEnter(){
    this.getSaved();
    this.languageCheck();
    this.getPlaces();
    this.getReviews();
  }

  getSaved(){
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        return;
      }
      this.placeId = paramMap.get("id");
      this.authSrv.userDetails().subscribe(res =>{
        if (res !== null) {
          this.userUID = res.uid;
          //check if its already saved
          this.placesService.getAllSavedPlace(this.userUID).snapshotChanges().pipe(
            map(changes => changes.map(
              c => ({
                key: c.payload.key, ...c.payload.val()
              })
            ))
          ).subscribe(data => {
            this.savedID = data;
            //console.log(this.savedID);
            for(let saved of this.savedID){
              if(saved.placeID==this.placeId){
                this.saved = true; //mark it as true
                //this.key=saved.key;
                //console.log('place is saved');
                console.log('key '+this.key);
              }
            }

          });
        } 
      });
    });
  }

  getPlaces(){
    this.placesService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({
          key: c.payload.key, ...c.payload.val()
        })
      ))
    ).subscribe(data => {
      this.places = data;
      for(let currPlace of this.places){
        if(currPlace.key==this.placeId){
          //this.saved = true; //mark it as true
          this.key=currPlace.key;
          //console.log('place is saved');
          console.log('key '+this.key);
        }
      }
    });
  }

  getReviews(){
    // console.log(this.placeId);
    // this.reviewService.getAll(this.placeId).snapshotChanges().pipe(
    //   map(changes => changes.map(
    //     c => ({
    //       key: c.payload.key, ...c.payload.val()
    //     })
    //   ))
    // ).subscribe(data => {
    //   console.log(data);
    //   this.review = data;
    // });
  }

  showMap(lng, lat){
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 13 // starting zoom
    })
    console.log(map);

    var marker = new mapboxgl.Marker({
      color: '#d90000'
    })
    .setLngLat([lng, lat])
    .addTo(map);
  }

  async languageCheck(){
    this.checkLanguage = await this.translateService.getLang();
    if(this.checkLanguage == 'en'){
      this.getDetailEn();
    } else {
      this.getDetailId();
    }
    
  }

  goBack() {
    this.router.navigate(["/tabs/home"]);
  }

  async getDetailEn(){
    await this.db.object('/details/en/' + this.placeId).valueChanges().subscribe(data => {
      this.detail = data;
      this.activities = this.detail.activity.split(', ');
      console.log(this.detail);
    })

    await this.db.object('/places/' + this.placeId).valueChanges().subscribe((data: any) => {
      this.base = data;
      this.showMap(data.lng, data.lat);
    })
  }

  async getDetailId(){
    await this.db.object('/details/id/' + this.placeId).valueChanges().subscribe(data => {
      this.detail = data;
      this.activities = this.detail.activity.split(', ');
      console.log(this.detail);
    })

    await this.db.object('/places/' + this.placeId).valueChanges().subscribe((data: any) => {
      this.base = data;
      this.showMap(data.lng, data.lat);
    })
  }

  gotoAllReview() {
    this.router.navigate(["/reviews", this.placeId]);
  }

  async writeReview() {
    const modal = await this.modalCtrl.create({
      component: ReviewsAddPage,
      componentProps: {
        place: this.placeId
      }
    });
    return await modal.present();
  }

  save() {
    if (this.saved) {
      this.saved = false;
      this.db.object('/saved/'+this.userUID+'/'+ this.key).remove();
      console.log('key for delete: '+this.key);
    } else {
      this.saved = true;

    }
    console.log("clicked");
  }
}
