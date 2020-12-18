import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { IonicRatingModule } from 'ionic4-rating';
import { createTranslateLoader } from 'src/app/app.module';

import { ReviewsAddPage } from './reviews-add.page';

describe('ReviewsAddPage', () => {
  let component: ReviewsAddPage;
  let fixture: ComponentFixture<ReviewsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsAddPage ],
      imports: [IonicModule.forRoot(), IonicRatingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          }
        }),]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
