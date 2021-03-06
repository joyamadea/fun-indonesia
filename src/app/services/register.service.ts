import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Profile } from '../model/profile';

@Injectable({

  providedIn: 'root'
})
export class RegisterService {
  private dbPath = '/profile';
  profileRef: AngularFireList<Profile> = null;

  constructor(private db: AngularFireDatabase) {
    // this.profileRef = db.list(this.dbPath);
   }

   create(profile: Profile): any{
     console.log(profile);
     this.profileRef = this.db.list(this.dbPath);
     return this.profileRef.push(profile);
   }
}
