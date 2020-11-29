import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslatesService {

  constructor(public translate: TranslateService) { }

  setLang(lang){
    this.translate.setDefaultLang(lang);
  }

  usedLang(lang){
    this.translate.use(lang);
  }

  getLang(){
    return this.translate.currentLang;
  }

  translateMessage(message) {
    return new Promise((resolve, reject) => {
      this.translate.get(message).subscribe((value) => {
        resolve(value);
      });
    });
  }
}
