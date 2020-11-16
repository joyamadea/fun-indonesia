import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ReviewsAddPage } from "../reviews-add/reviews-add.page";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.page.html",
  styleUrls: ["./reviews.page.scss"],
})
export class ReviewsPage implements OnInit {
  fakeReviews = Array(5);
  constructor(private router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(["/places-detail/1"]);
  }
  async writeReview() {
    const modal = await this.modalCtrl.create({
      component: ReviewsAddPage,
    });
    return await modal.present();
  }
}
