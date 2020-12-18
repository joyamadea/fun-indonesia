import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: "app-reviews-add",
  templateUrl: "./reviews-add.page.html",
  styleUrls: ["./reviews-add.page.scss"],
})
export class ReviewsAddPage implements OnInit {
  rating: any = 0;
  validations_form: FormGroup;
  errorMessage: string = '';
  formValue: any;
  uid: any;
  placeId: any;

  @Input() place;
  constructor(private modalCtrl: ModalController, private authService: AuthService, private formBuilder: FormBuilder, public activatedRoute: ActivatedRoute,
    private reviewService: ReviewService) {}

  ngOnInit() {
    this.fetchData();
    this.validations_form = this.formBuilder.group({
      rating: new FormControl('', Validators.compose([
        Validators.required
      ])),
      review: new FormControl('',Validators.compose([
        Validators.required
      ]))
    })
  }
  validation_messages = {
    'rating': [
      {type: 'required', message:'Rating is required.'}
    ],
    'review': [
      {type: 'required', message:'Review is required.'},
    ]
  }

  async fetchData(){
    await this.authService.userDetails().subscribe(res => {
      this.uid = res.uid
    });

    await this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        return;
      }
      this.placeId = paramMap.get("id");
      console.log("place id" + this.placeId);
    });
    // console.log(this.uid);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  
  onRateChange(event: any){
    console.log(event);
  }

  addReview(value){
    this.formValue = value;
    this.formValue["uid"] = this.uid;
    console.log(value);
    this.reviewService.create(value, this.place);
    this.dismiss();
  }
}
