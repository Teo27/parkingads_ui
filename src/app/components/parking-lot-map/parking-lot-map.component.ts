import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {AgmMap, MouseEvent, AgmInfoWindow} from '@agm/core';
import {Marker} from '../../classes/marker';
import {LotsService} from '../../services/lots.service';
import { ParkingLot, ParkingLotBook } from 'src/app/classes/parking-lot';
import { Ad} from 'src/app/classes/ad';

@Component({
  selector: 'app-parking-lot-map',
  templateUrl: './parking-lot-map.component.html',
  styleUrls: ['./parking-lot-map.component.scss']
})
export class ParkingLotMapComponent implements OnInit {
  public markers: Marker[] = [];
  private ads: Ad[] = []
  private emailText: string
  private infoWindow;
  private adText: string
  private imageURL: string
  private adTitle: string
  public zoom = 8;
  lat: number;
  lng: number;

  @ViewChild(AgmMap) agmMap: AgmMap;
  constructor(private lotsService: LotsService) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setStartPosition.bind(this));
    } else {
      this.lat = 0;
      this.lng = 0;
    }
  }

  setStartPosition(position): void {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

  ngOnInit() {
    //this.getMarkers();
    this.getParkingLots()
    this.getAds()

  }

  getAds(){
    this.lotsService.getAds().subscribe(data => this.ads= data)
  }

  getMarkers() {
    this.lotsService.getMarkers().subscribe(markers => this.markers = markers);
  }

  getParkingLots(){
    let self = this
    this.lotsService.getParkingLots().subscribe(data => {
      data.forEach(function (value){
        let marker = new Marker
        marker.lat = value.latitude
        marker.lng = value.longitude
        marker.lotData = value

        self.markers.push(marker)
      })
    })
  }

  clickedMarker(label: string, index: number, infoWindow) {
    console.log(`clicked the marker: ${label || index}`);
    //let infoWindow = new AgmInfoWindow
    if (this.infoWindow) {
      this.infoWindow.close();
   }
   this.infoWindow = infoWindow
   this.loadAd()
  }

  loadAd() {
    
    let i = Math.floor(Math.random() * this.ads['ads'].length)
    console.log(i)
    this.adText = this.ads['ads'][i].text
    this.imageURL = this.ads['ads'][i].img
    this.adTitle = this.ads['ads'][i].title
    console.log(this.ads['ads'][i])
    
    //throw new Error("Method not implemented.");
  }

  mapClicked($event: MouseEvent) {
    console.log('clicked the map');
    if (this.infoWindow) {
      this.infoWindow.close();
   }
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  bookLot(parkingLot: ParkingLot){
    console.log(parkingLot)
    console.log(this.emailText)
    let booking = new ParkingLotBook
    booking = parkingLot
    booking.email = this.emailText
    this.lotsService.bookLot(booking).subscribe()
  }

}
