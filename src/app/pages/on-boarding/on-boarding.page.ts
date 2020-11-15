import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {

  constructor(public navCtrl : NavController) { }

  ngOnInit() {
  }

  registerPage(){
    this.navCtrl.navigateForward('/register')
  }

  loginPage(){
    this.navCtrl.navigateForward('/login')
  }
}
