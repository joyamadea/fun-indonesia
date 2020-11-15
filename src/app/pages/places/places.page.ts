import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SearchComponent } from "src/app/component/search/search.component";

@Component({
  selector: "app-places",
  templateUrl: "./places.page.html",
  styleUrls: ["./places.page.scss"],
})
export class PlacesPage implements OnInit {
  fakePlaces = Array(3);
  constructor(private modalCtrl: ModalController, private router: Router) {}

  ngOnInit() {}

  async goSearch() {
    const modal = await this.modalCtrl.create({
      component: SearchComponent,
    });
    return await modal.present();
  }

  gotoPlace(id) {
    this.router.navigate(["/places-detail", id]);
  }
}
