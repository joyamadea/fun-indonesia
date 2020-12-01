import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbPath = '/profile';
  profileRef: AngularFireList<Profile> = null;

  constructor(private fireAuth: AngularFireAuth, private db: AngularFireDatabase) {
   }  

   create(profile: Profile): any {
     return this.profileRef.push(profile);
   }

  registerUser(value) {
    return new Promise<any>((resolve,reject) => {
      this.fireAuth.createUserWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  loginUser(value){
    return new Promise<any>((resolve,reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  logoutUser(){
    return new Promise((resolve,reject) => {
      if (this.fireAuth.currentUser){
        this.fireAuth.signOut()
        .then(() => {
          console.log('Log Out');
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }

  userDetails(){
    return this.fireAuth.user;
  }
}
