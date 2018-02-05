import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import {google} from "google-maps";
import { FormControl} from "@angular/forms";
import { AgmCoreModule ,MapsAPILoader } from '@agm/core';
import { NavController } from 'ionic-angular';
import { DestinationService, PortalParameterService, DirectionSearchCommunicationService, GeolocationService } from '../../app/service';
import { MapLegendsConfig } from '../../app/map-legends';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

//declare var google : google;


@Component({
  selector: 'directory-view',
  templateUrl: 'directory-view.component.html'
})
export class DirectoryViewComponent implements OnInit {
  public latitude: number;//= 26.2196205;
  public longitude: number; //=  84.35665929999999;
  public googleMapZoom:number;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  public initiateDirectory: boolean;
  public intitiateMapLegends: MapLegendsConfig;
  public showMapLegendsInMobile: boolean;


  constructor(
    public navCtrl: NavController,
    private destinationService: DestinationService,
    private portalParameterService: PortalParameterService,
    private directionSearchCommunicationService: DirectionSearchCommunicationService,
    private geolocationService: GeolocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.initiateDirectory = false;
    this.init();

  }
  ngOnInit() {
    this.intitiateMapLegends = new MapLegendsConfig();
    this.intitiateMapLegends.isResetLegends.next(true);
    this.showMapLegendsInMobile = false;
    this.destinationService.isDirctoryInitiatedFromDestinationInput.subscribe(status => {
      if (status) {
        this.initiateDirectory = true;

      }

    //  this.setCurrentLocation()

    });

    this.destinationService.isDirectoryInitiatedFromDestinationInputCompleted.subscribe(status => {
      if (status) {
        this.initiateDirectory = false;
      }

    });


      //create search FormControl
      this.searchControl = new FormControl();
    
      //set current position
      this.setCurrentPosition();

    console.log("directory view searched element " + this.searchElementRef.nativeElement);
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
    
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.googleMapZoom = 12;
          });
        });
      });




    // this.geolocationService.currentLocation.subscribe(currentLocation => {
    //   if (currentLocation) {

    //     this.latitude = currentLocation.coords.latitude;  //41.49932
    //     this.longitude = currentLocation.coords.longitude; //-81.69
    //     console.log(this.latitude);
    //     console.log(this.longitude);
    //   }
    // })

  }
  init() {


  }

  public setCurrentLocation() {

    return this.geolocationService.getCurrentLocation();

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.googleMapZoom = 12;
      });
    }
  }



  public get isDirectionSetpsVisible(): boolean {
    return this.destinationService.isDirectionStepsVisible;
  }

  public get isMapLegendsVisible(): boolean {
    return this.portalParameterService.initMapLegends;
  }

  public get isMapLegendsButtonVisible(): boolean {
    return this.destinationService.isShowMapLegendsButtonInMobile;
  }


  public enableMobileLegendsInMobile() {
    this.showMapLegendsInMobile = true;
    this.intitiateMapLegends = new MapLegendsConfig();
    this.intitiateMapLegends.isResetLegends.next(true);
    this.portalParameterService.initMapLegends = true;
  }

  public get isFilterDestinationInitiated(): boolean {
    return this.directionSearchCommunicationService.isSearchDestinationInitiated;
  }


}
