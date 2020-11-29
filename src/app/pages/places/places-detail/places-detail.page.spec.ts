import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicRatingModule } from 'ionic4-rating';
import { createTranslateLoader } from 'src/app/app.module';

import { PlacesDetailPage } from './places-detail.page';

describe('PlacesDetailPage', () => {
  let component: PlacesDetailPage;
  let fixture: ComponentFixture<PlacesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesDetailPage ],
      imports: [IonicModule.forRoot(),IonicStorageModule.forRoot(), HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        }), IonicRatingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
