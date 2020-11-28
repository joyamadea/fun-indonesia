import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AboutPage } from '../../modal/about/about.page';
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

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private authSrv: AuthService) { }

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

  logOut(){
    this.navCtrl.navigateRoot('/on-boarding');
  }

  ngOnInit() {
    this.authSrv.userDetails().subscribe(res => {
      console.log('res:',res);
      console.log('uid:', res.uid);
      if(res !== null){
        this.userEmail = res.email;
      } else{
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log(err);
    });
  }

}
