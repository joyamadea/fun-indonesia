import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  

  constructor(private navCtrl:NavController, private authSrv: AuthService, private formBuilder: FormBuilder, private toast: ToastController, private cache: CacheService) { }


  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }
  validation_messages = {
    'email': [
      {type: 'required', message:'Email is required.'},
      {type: 'pattern', message:'Enter a valid email.'}
    ],
    'password': [
      {type: 'required', message:'Password is required.'},
    ]
  }

  loginUser(value){
    this.authSrv.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.toastSuccess();
      this.navCtrl.navigateForward('/tabs')
      this.cache.setLoggedin(true);
    }, err => {
      this.toastFail();
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  back(){
    this.navCtrl.navigateBack('/on-boarding')
  }

  regisPage(){
    this.navCtrl.navigateForward('/register')
  }

  async toastSuccess() {
    const toast = await this.toast.create({
      message: 'Login successful!',
      duration: 2000
    });
    toast.present();
  }
  async toastFail() {
    const toast = await this.toast.create({
      message: 'Login failed!',
      duration: 2000
    });
    toast.present();
  }


}
