import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Marker} from '../classes/marker';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService 
//implements InMemoryDbService 
{
  constructor() { }
/*
  createDb() {
    const lots: Marker[] = [
      {
        lat: 51.673858,
        lng: 7.815982,
        label: 'A',
        draggable: true
      },
      {
        lat: 51.373858,
        lng: 7.215982,
        label: 'B',
        draggable: false
      },
      {
        lat: 51.723858,
        lng: 7.895982,
        label: 'C',
        draggable: true
      }
    ];
    return {lots};
  }

  genId(markers: Marker[]): number {
    // TODO This is wrong
    return markers.length > 0 ? Math.max(...markers.map(marker => marker.lat)) + 1 : 11;
  }
  */
}
