import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DestinationService, PortalParameterService } from '../../app/service';

import { MapLegendsConfig } from '../../app/map-legends';

@Component({
  selector: 'directory-view',
  templateUrl: 'directory-view.component.html'
})
export class DirectoryViewComponent {
  lat: number = 28.4416569;
  lng: number = 77.310565;
  
  public initiateDirectory:boolean;
  public intitiateMapLegends: MapLegendsConfig;
  public showMapLegendsInMobile : boolean;


  constructor(
    public navCtrl: NavController,
    private destinationService:DestinationService,
    private portalParameterService:PortalParameterService
  ) {
    this.initiateDirectory=false;
    this.init();

  }
  
  
  init(){
    this.intitiateMapLegends = new MapLegendsConfig();
    this.intitiateMapLegends.isResetLegends.next(true);
    this.showMapLegendsInMobile = false;
    this.destinationService.isDirctoryInitiatedFromDestinationInput.subscribe(status =>{
      if(status)
      {
        this.initiateDirectory=true;

      }
      
      });

      this.destinationService.isDirectoryInitiatedFromDestinationInputCompleted.subscribe(status =>{
        if(status)
        {
          this.initiateDirectory=false;
        }
        
        });

  }
  public get isDirectionSetpsVisible():boolean
  {
      return this.destinationService.isDirectionStepsVisible;
  }

  public get isMapLegendsVisible():boolean
  {
    return this.portalParameterService.initMapLegends;
  } 

  public get isMapLegendsButtonVisible():boolean
  {
    return this.destinationService.isShowMapLegendsButtonInMobile;
  }


  public enableMobileLegendsInMobile()
  {
    this.showMapLegendsInMobile = true;
    this.intitiateMapLegends = new MapLegendsConfig();
    this.intitiateMapLegends.isResetLegends.next(true);
    this.portalParameterService.initMapLegends=true;
  }


}
