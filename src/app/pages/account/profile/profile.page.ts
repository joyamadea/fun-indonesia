import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CacheService } from 'src/app/services/cache.service';
import { AboutPage } from '../../modal/about/about.page';
import { ConfirmationModalPage } from '../../modal/confirmation-modal/confirmation-modal.page';
import { OnBoardingPage } from '../../on-boarding/on-boarding.page';
import { SelectLanguagePage } from '../../select-language/select-language.page';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string;
  userID: string;
  isLoggedIn: any;
  photo: any;
  loadingIonic: any;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private authSrv: AuthService,
    private cache: CacheService,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController,
    private storage: AngularFireStorage) { }

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

  // CHANGE PHOTO PROFILE
  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile pic',
      buttons: [
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            this.getPicture();
          },
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async getPicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    this.photo = image.dataUrl;
    console.log(image);
    this.updatePhotoProfile();
    // this.updatePhotoProfile(image);
    // this.getBlobFile(image.webPath).then((data: any) => {
    //   console.log(data);
    //   // this.thumbnail = false;
    //   this.presentLoading().then(() => {
    //     this.updatePhotoProfile(data);
    //   });
    // });
  }
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    this.photo = image.dataUrl;
    console.log(this.photo);
    this.updatePhotoProfile();
    // this.getBlobFile(image.webPath).then((data: any) => {
    //   // this.thumbnail = false;
    //   this.presentLoading().then(() => {
    //     this.updatePhotoProfile(data);
    //   });
    // });
  }

  dataUrltoFile(dataUrl, filename){
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n]  = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }

  async presentLoading() {
    this.loadingIonic = await this.loadingCtrl.create({
      message: 'Uploading Picture..',
      duration: 15000,
    });
    await this.loadingIonic.present();
  }

  updatePhotoProfile() {
    const file = this.dataUrltoFile(this.photo, 'file');
    console.log(file);
    const filePath = '/profile/test1.jpg';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(res => {
      this.storage.ref(filePath).getDownloadURL().subscribe((res: any) => {
        console.log(res);
      })
    });
    
  }

}
