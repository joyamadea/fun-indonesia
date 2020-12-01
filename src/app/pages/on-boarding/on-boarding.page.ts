import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {

  constructor(public navCtrl : NavController, private storage: Storage) { }

  ngOnInit() {
    this.storage.set('boarding', true);
  }

  registerPage(){
    this.navCtrl.navigateForward('/register')
  }

  loginPage(){
    this.navCtrl.navigateForward('/login')
  }
}
