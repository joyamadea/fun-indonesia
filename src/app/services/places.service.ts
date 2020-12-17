import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Places } from '../model/places';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private dbPath = '/places';
  private cityPath = '/city';
  placesRef: AngularFireList<Places> = null
  cityRef: AngularFireList<Places> = null

  constructor(private db: AngularFireDatabase) { 
    this.placesRef = db.list(this.dbPath);
    this.cityRef = db.list(this.cityPath);
  }

  getAll(): AngularFireList<Places> {
    return this.placesRef;
  }

  getAllCity(): AngularFireList<Places> {
    return this.cityRef;
  }

  savePlace(place, userUID, key){
    console.log(place);
    return this.db.list('saved/'+userUID).set(key,place);
  }

  getAllSavedPlace(id):AngularFireList<Places>{
    return this.db.list('saved/'+id);
  }


}
