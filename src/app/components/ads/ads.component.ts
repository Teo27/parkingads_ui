import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {

  ads$: Observable<string>;

  constructor(private adsService: AdsService) { }

  ngOnInit() {
  	console.log("ADS:");
    this.ads$ = this.adsService.ads;
    console.log('test');
  }

}
