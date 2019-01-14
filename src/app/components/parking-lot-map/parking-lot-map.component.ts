import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {AgmMap, MouseEvent, AgmInfoWindow} from '@agm/core';
import {Marker} from '../../classes/marker';
import {LotsService} from '../../services/lots.service';
import { ParkingLot, ParkingLotBook } from 'src/app/classes/parking-lot';
import { Ad} from 'src/app/classes/ad';
import {NotifierService} from 'angular-notifier';
import {Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-parking-lot-map',
  templateUrl: './parking-lot-map.component.html',
  styleUrls: ['./parking-lot-map.component.scss']
})
export class ParkingLotMapComponent implements OnInit {
  public markers: Marker[] = [];
  private ads: Ad[] = [];
  private emailText: string;
  private infoWindow;

  private thumbAdType: string;
  private thumbImgUrl: string = "";
  private thumbAdTitle: string;

  private notifier: NotifierService;

  public bannerAdType: string;
  public bannerAdUrl: string = "https://www.bu.edu/globalprograms/files/2015/05/banner-placeholder.png";

  public zoom = 8;
  lat: number;
  lng: number;

  @ViewChild(AgmMap) agmMap: AgmMap;
  constructor(private lotsService: LotsService, notifierService: NotifierService, private sanitizer: DomSanitizer) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setStartPosition.bind(this));
    } else {
      this.lat = 0;
      this.lng = 0;
    }
    this.notifier = notifierService;
  }

  setStartPosition(position): void {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

  ngOnInit() {
    //this.getMarkers();
    this.getParkingLots();
    this.getAds();
  }

  /**
   * Hide oldest notification
   */
  hideOldestNotification(): void {
      this.notifier.hideOldest();
  }

  /**
   * Hide newest notification
   */
  hideNewestNotification(): void {
      this.notifier.hideNewest();
  }

  /**
   * Hide all notifications at once
   */
  hideAllNotifications(): void {
      this.notifier.hideAll();
  }

  getAds(){
    this.lotsService.getAds().subscribe(data => {

      var receivedArray = [{}];
      if(data.hasOwnProperty("ads")) {
        receivedArray = data["ads"];
        receivedArray.length = 5;
        for(var key in receivedArray) {
          var incomingAd = receivedArray[key];
          if(incomingAd.hasOwnProperty("type")) {
            this.ads.push({
            "type":incomingAd["type"],
            "text":incomingAd["text"],
            "title":incomingAd["title"],
            "bannerimg":incomingAd["bannerimg"],
            "thumbimg":incomingAd["thumbimg"]
            });
          }
        }
      }
      
      let i = Math.floor(Math.random() * this.ads.length);
      this.bannerAdUrl = this.ads[i].bannerimg;
      
      this.bannerAdType = this.ads[i].type;
    });
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
    if(this.ads.length > 0) {
      let i = Math.floor(Math.random() * this.ads.length);
      this.thumbAdType = this.ads[i].type;
      this.thumbImgUrl = this.ads[i].thumbimg;
      this.thumbAdTitle = this.ads[i].title;
      console.log(this.ads[i]);
    }
    
    
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

    if(parkingLot.free_count < 1) {
      this.notifier.notify("error", "Parking lot has no more free places");
      return;
    }

    console.log(parkingLot);
    console.log(this.emailText);
    let booking = new ParkingLotBook;

    booking.lotname = parkingLot.name;
    booking.is_open = parkingLot.is_open;
    booking.is_payment_active = parkingLot.is_payment_active;
    booking.lat = parkingLot.latitude;
    booking.lng = parkingLot.longitude;
    booking.max_count = parkingLot.max_count;
    booking.free_count = parkingLot.free_count;
    booking.email = this.emailText;

    this.lotsService.bookLot(booking).subscribe();

    this.notifier.notify("success", "Request sent, confirmation email incoming");
  }

}
