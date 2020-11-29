import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SearchComponent } from "src/app/component/search/search.component";
import { PlacesService } from 'src/app/services/places.service';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, retry } from 'rxjs/operators';

@Component({
  selector: "app-places",
  templateUrl: "./places.page.html",
  styleUrls: ["./places.page.scss"],
})
export class PlacesPage implements OnInit {
  fakePlaces = Array(3);
  saved: boolean = false;
  places: any;
  constructor(private modalCtrl: ModalController, private router: Router, private placesService: PlacesService) {}

  ngOnInit() {
    this.placesService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(
        c => ({
          key: c.payload.key, ...c.payload.val()
        })
      ))
    ).subscribe(data => {
      this.places = data;
      console.log(this.places);
    })
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
