import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController, private authSrv: AuthService, private formBuilder: FormBuilder) { }

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string ='';

  validation_messages = {
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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ]))
    })
  }

  tryRegister(value){
    this.authSrv.registerUser(value).then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created. Please log in.';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

  back(){
    this.navCtrl.navigateBack('/on-boarding')
  }
  loginPage(){
    this.navCtrl.navigateForward('/login')
  }
  
  
}
