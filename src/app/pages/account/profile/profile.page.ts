import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CacheService } from 'src/app/services/cache.service';
import { AboutPage } from '../../modal/about/about.page';
import { ConfirmationModalPage } from '../../modal/confirmation-modal/confirmation-modal.page';
import { OnBoardingPage } from '../../on-boarding/on-boarding.page';
import { SelectLanguagePage } from '../../select-language/select-language.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string;
  userID: string;
  isLoggedIn: any;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private authSrv: AuthService,
    private cache: CacheService) { }

  ionViewWillEnter(){
    this.cache.getLoggedin().then(res => {
      this.isLoggedIn = res;
      console.log(this.isLoggedIn);
    });
  }

  login(){
    this.navCtrl.navigateForward('login');
  }

  register(){
    this.navCtrl.navigateForward('register');
  }

  async presentModalAbout() {
    const modal = await this.modalCtrl.create({
      component: AboutPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalLanguage() {
    const modal = await this.modalCtrl.create({
      component: SelectLanguagePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async confirmLogout(){
    const modal = await this.modalCtrl.create({
      component: ConfirmationModalPage,
      cssClass: 'confirm-modal-css',
      componentProps: {
        type: 'logout'
      }
    });
    modal.onDidDismiss().then((res) => {
      if (res.data === true) {
        this.authSrv.logoutUser();
        this.cache.setLoggedin(false);
        this.navCtrl.navigateRoot('');
      }
    });
    modal.present();
    
  }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      // console.log('res:',res);
      // console.log('uid:', res.uid);
      if(res !== null){
        this.userEmail = res.email;
        console.log(res.email);
      } else{
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log(err);
    });
  }

}
