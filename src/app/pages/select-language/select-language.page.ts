import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'src/app/services/cache.service';
import { TranslatesService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.page.html',
  styleUrls: ['./select-language.page.scss'],
})
export class SelectLanguagePage implements OnInit {
  checkLanguage: any;

  constructor(public modalCtrl: ModalController,
    private cache: CacheService, private translateService: TranslatesService) { }

  async dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData(){
    this.checkLanguage = await this.translateService.getLang();
  }

  async changeLanguage(lang) {
    this.checkLanguage = lang;
    this.translateService.setLang(lang);
    this.translateService.usedLang(lang);
    await this.cache.setLanguage(lang);
    console.log(this.cache.getLanguage())
    this.dismiss()
    // this.toastService.toastSrv('CHANGE_LANGUAGE');
  }

}
