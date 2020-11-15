import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateBack('/on-boarding')
  }
  login(){
    this.navCtrl.navigateRoot('/tabs')
  }
  regisPage(){
    this.navCtrl.navigateBack('/register')
  }
}
