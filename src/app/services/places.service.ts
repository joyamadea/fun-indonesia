import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Places } from '../model/places';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private dbPath = '/places';
  placesRef: AngularFireList<Places> = null

  constructor(private db: AngularFireDatabase) { 
    this.placesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Places> {
    return this.placesRef;
  }
}
