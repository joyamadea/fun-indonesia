import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewsAddPage } from './reviews-add.page';

describe('ReviewsAddPage', () => {
  let component: ReviewsAddPage;
  let fixture: ComponentFixture<ReviewsAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
