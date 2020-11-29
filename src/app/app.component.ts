import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CacheService } from './services/cache.service';
import { TranslatesService } from './services/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cache: CacheService,
    private translateService: TranslatesService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initLanguage();
  }

  async initLanguage() {
    const lang = await this.cache.getLanguage();
    if (lang === null || lang === undefined) {
      this.translateService.usedLang('en');
      this.cache.setLanguage('en');
    } else {
      this.translateService.usedLang(lang);
    }
  }
}
