import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { PlacesService } from 'src/app/services/places.service';
import { ReviewsAddPage } from "../../review/reviews-add/reviews-add.page";
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslatesService } from 'src/app/services/translate.service';

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
  detail: any;
  base: any;
  activities: any;
  checkLanguage: any;
  constructor(private router: Router, private modalCtrl: ModalController, public activatedRoute: ActivatedRoute,
    private placesService: PlacesService, private db: AngularFireDatabase, private translateService: TranslatesService) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        return;
      }
      this.placeId = paramMap.get("id");
      console.log(this.placeId);
    });
    

    this.languageCheck();
    
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

    await this.db.object('/places/' + this.placeId).valueChanges().subscribe(data => {
      this.base = data;
      console.log(this.base);
    })
  }

  async getDetailId(){
    await this.db.object('/details/id/' + this.placeId).valueChanges().subscribe(data => {
      this.detail = data;
      this.activities = this.detail.activity.split(', ');
      console.log(this.detail);
    })

    await this.db.object('/places/' + this.placeId).valueChanges().subscribe(data => {
      this.base = data;
      console.log(this.base);
    })
  }


  gotoAllReview() {
    this.router.navigate(["/reviews"]);
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
    } else {
      this.saved = true;
    }
    console.log("clicked");
  }
}
