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
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


const customNotifierOptions: NotifierOptions = {
  position: {
        horizontal: {
            position: 'right',
            distance: 12
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10
        }
    },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    AngularFontAwesomeModule,
     NotifierModule.withConfig(customNotifierOptions),
    //HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
