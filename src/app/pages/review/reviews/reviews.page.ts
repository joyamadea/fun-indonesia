import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { ReviewsAddPage } from "../reviews-add/reviews-add.page";
import { map } from 'rxjs/operators';
import { ReviewService } from "src/app/services/review.service";
import { AuthService } from "src/app/services/auth.service";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.page.html",
  styleUrls: ["./reviews.page.scss"],
})
export class ReviewsPage implements OnInit {
  fakeReviews = Array(5);
  id: any;
  review:any;
  currUser:any;
  tempUsername:any;
  revUsername:any[]=[];
  constructor(private router: Router, private modalCtrl: ModalController, private navCtrl: NavController,
    private route: ActivatedRoute, private reviewService:ReviewService, private authSrv:AuthService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      // console.log(param.get('id'));
      this.id = param.get('id');
      this.getReview();
    });
  }

  ionViewWillEnter(){
 
  }
  getReview(){
    this.reviewService.getAllReview(this.id).snapshotChanges().pipe(
      map(changes => changes.map(
           c => ({
             key: c.payload.key, ...c.payload.val()
           })
         ))
       ).subscribe(data => {
         //console.log(data);
         this.review = data;
         //console.log(this.review);
         for(let rev of this.review){
          //console.log(rev);
          this.authSrv.getUser(rev.uid).snapshotChanges().pipe(
            map(changes => changes.map(
              c => ({
                key: c.payload.key, ...c.payload.val()
              })
            ))
          ).subscribe(data => {
            this.currUser=data;
            //console.log(this.currUser);
            for(let a of this.currUser){
              let userkey=a.key;
              console.log('key:'+userkey);
              this.db.object('/profile/'+userkey).valueChanges().subscribe(res => {
                this.tempUsername=res['username'];
                //console.log(this.tempUsername);
                this.revUsername.push(this.tempUsername);    
              });
            }
          });
  
          //console.log('final arr:'+this.revUsername);  
         }
       });
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
