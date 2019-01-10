import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import { ParkingLotMapComponent } from './components/parking-lot-map/parking-lot-map.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './services/in-memory-data.service';
import { AdsComponent } from './components/ads/ads.component';
import { RequestCacheService } from './services/request-cache.service';
import { CachingInterceptorService } from './services/caching-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ParkingLotMapComponent,
    MessagesComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCR20VSagXszK3XAeTAPa3HxNqA-vUJ7-4'
    }),
    AgmJsMarkerClustererModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
