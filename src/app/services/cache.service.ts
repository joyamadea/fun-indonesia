import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: Storage) { }

  setLanguage(lang) {
    return this.storage.set('currLanguage', lang);
  }

  getLanguage() {
    return this.storage.get('currLanguage');
  }

}
