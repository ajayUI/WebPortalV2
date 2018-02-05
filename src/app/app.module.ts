import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

// Custom Modules
import {
  ServiceModule,
  DirectionModule,
  SearchDestinationModule,
  FilterDestinationModule,
  LegendModule 
  
} from './module';

import { MyApp } from './app.component';

import { DirectoryViewComponent } from '../pages/directory-view/directory-view.component';
import { EventComponent } from '../pages/event/event.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    DirectoryViewComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    ServiceModule,
    HttpModule,
   // MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCheckboxModule,
    AgmCoreModule,
    DirectionModule,
    SearchDestinationModule,
    FilterDestinationModule,
    LegendModule,
    IonicModule.forRoot(MyApp, {}, { links: [] }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyANio5KPAb9akbls96bx6_CfNzAT13rXvI',
      libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DirectoryViewComponent,
    EventComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
