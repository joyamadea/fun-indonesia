import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-reviews-add",
  templateUrl: "./reviews-add.page.html",
  styleUrls: ["./reviews-add.page.scss"],
})
export class ReviewsAddPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
