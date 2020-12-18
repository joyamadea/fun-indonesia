import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { ReviewsAddPage } from "../reviews-add/reviews-add.page";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.page.html",
  styleUrls: ["./reviews.page.scss"],
})
export class ReviewsPage implements OnInit {
  fakeReviews = Array(5);
  id: any;
  constructor(private router: Router, private modalCtrl: ModalController, private navCtrl: NavController,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      // console.log(param.get('id'));
      this.id = param.get('id');
    })
  }

  goBack() {
    
    this.router.navigate(["/places-detail/"+this.id]);
  }
  async writeReview() {
    const modal = await this.modalCtrl.create({
      component: ReviewsAddPage,
      componentProps: {
        place: this.id
      }
    });
    return await modal.present();
  }
}
