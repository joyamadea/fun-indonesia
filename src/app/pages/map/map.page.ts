import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  umnPos: any = {
    lat: -6.256081,
    lng: 106.618755
  }
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.showMap(this.umnPos);
  }

  showMap(loc){
    const location = new google.maps.LatLng(loc.lat, loc.lng);
    const options = {
      center: location,
      zoom: 13,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    const marker = new google.maps.Marker({
      position: this.umnPos,
      map: this.map
    })
  }

}
