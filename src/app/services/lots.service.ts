import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {Marker} from '../classes/marker';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ParkingLot, ParkingLotBook } from '../classes/parking-lot';
import { Ad} from '../classes/ad';

@Injectable({
  providedIn: 'root'
})
export class LotsService {
  private lotsUrl = 'api/lots';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  public getMarkers(): Observable<Marker[]> {
    return this.http.get<Marker[]>(this.lotsUrl).pipe(
      tap( _ => this.log('fetched markers')),
      catchError(this.handleError('getMarkers', []))
    );
  }

  public getParkingLots(): Observable<ParkingLot[]>{
    return this.http.get<ParkingLot[]>('https://83.99.212.50:8182/getLots', this.httpOptions)
  }

  public bookLot(parkingLot: ParkingLotBook){
    return this.http.post('https://83.99.212.50:8182/saveBooking', parkingLot, this.httpOptions).pipe(
      catchError(this.handleError('bookLot', [])))
  }

  private log(message: string) {
    this.messageService.add(`LotsService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed ${error.message}`);
      return of(result as T);
    };
  }

  public getAds(): Observable<Ad[]>{
    console.log("getting ads");
    var ads = this.http.get<Ad[]>('https://83.99.212.50:8182/getAds', this.httpOptions);
    console.log(ads);
    return ads;
  }
}
