import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicModule } from '@ionic/angular';

import { PlacesPage } from './places.page';

describe('PlacesPage', () => {
  let component: PlacesPage;
  let fixture: ComponentFixture<PlacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacesPage ],
      imports: [IonicModule.forRoot()],
      providers: [ Geolocation ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
