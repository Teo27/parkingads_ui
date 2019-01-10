import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Ad} from '../classes/ad';
import { Observable } from 'rxjs';

const CACHE_SIZE = 1
const API_ENDPOINT = 'http://adservice.ws.dm.sof60.dk/api/Ad'

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private cache$: Observable<string>;
  
  constructor(private http: HttpClient) { }
  //https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html
  
  get ads() {
    if (!this.cache$) {
      this.cache$ = this.requestAds().pipe(
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }


  private requestAds() {
    return this.http.get<Ad>(API_ENDPOINT).pipe(
      map(response => response.text)
    );
  }


}
