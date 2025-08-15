import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-telainicial',
  templateUrl: './telainicial.page.html',
  styleUrls: ['./telainicial.page.scss'],
})
export class TelainicialPage implements OnInit {

  map: google.maps.Map;

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor() { }

  ionViewWillEnter(){
    this.exibirMapa();
  }

  exibirMapa(){
    const posicao = new google.maps.LatLng(-23.311412, -51.148092);
    const opcoes = {
      center: posicao,
      zoom: 15,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);
  }
  ngOnInit() {
  }

}
