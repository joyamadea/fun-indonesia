import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController, private authSrv: AuthService, private formBuilder: FormBuilder, private registerSrv: RegisterService, private toast: ToastController) { }

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string ='';
  currUid: any;

  validation_messages = {
    'username': [
      {type: 'required', message:'Username is required.'}
    ],
    'email': [
      {type: 'required', message:'Email is required.'},
      {type: 'pattern', message:'Enter a valid email.'}
    ],
    'password': [
      {type: 'required', message:'Password is required.'},
      {type: 'minlength', message:'Password must be at least 8 characters long.'}
    ]
  }
  
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      username: new FormControl ('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
    });
  }

  tryRegister(value){
    this.authSrv.registerUser(value).then(res => {
      this.errorMessage = '';
      this.successMessage = 'Your account has been created. Please log in.';
      this.authSrv.userDetails().subscribe(res =>{
        this.currUid = res.uid;
        this.inputDatabase(value);
      })
      this.toastSuccess();

    }, err => {
      this.toastFail();
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
    // this.inputDatabase(value);
  }

  inputDatabase(form){
    let obj = {
      username: form.username,
      picture: "null",
      uid: this.currUid
    }
    this.registerSrv.create(obj).then(res => {
      
      }).catch(error => console.log(error));
  }

  back(){
    this.navCtrl.navigateBack('/on-boarding')
  }

  loginPage(){
    this.navCtrl.navigateForward('/login')
  }
  
  async toastSuccess() {
    const toast = await this.toast.create({
      message: 'Register successful!',
      duration: 2000
    });
    toast.present();
  }

  async toastFail() {
    const toast = await this.toast.create({
      message: 'Register failed!',
      duration: 2000
    });
    toast.present();
  }
  
}
