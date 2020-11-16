import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ReviewsAddPage } from "../../review/reviews-add/reviews-add.page";

@Component({
  selector: "app-places-detail",
  templateUrl: "./places-detail.page.html",
  styleUrls: ["./places-detail.page.scss"],
})
export class PlacesDetailPage implements OnInit {
  activites = Array(3);
  facilities = Array(2);
  saved: boolean = false;
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(["/tabs/home"]);
  }
  gotoAllReview() {
    this.router.navigate(["/reviews"]);
  }

  async writeReview() {
    const modal = await this.modalCtrl.create({
      component: ReviewsAddPage,
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
