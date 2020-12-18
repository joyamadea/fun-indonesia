import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';

import { ConfirmationModalPage } from './confirmation-modal.page';

describe('ConfirmationModalPage', () => {
  let component: ConfirmationModalPage;
  let fixture: ComponentFixture<ConfirmationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationModalPage ],
      imports: [IonicModule.forRoot(),TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
