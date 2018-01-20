// Angular and Third Party Modules, Libs etc
import { Component, ViewChild, Input } from '@angular/core';
import { NavController, Slides, Platform } from 'ionic-angular';

//Service
import { PortalParameterService, DestinationService } from '../../service';

// Base
import {
    ComponentBase,
    ResponseStatusType,
    AppConstant,
    ValueConstant,
    UrlConstant,
    MultiLingualTextModel,
    ErrorMessageConstant
} from '../../base';

import { MapLegendsConfig } from '../map-legend.config';

@Component({
    selector: 'map-legends',
    templateUrl: 'map-legend.component.html'
})
export class MapLegend extends ComponentBase {
     @Input()
    public legendsConfig: MapLegendsConfig;
    public mapLegends: any[];
    public sliderOptions:any;
    public isNextLegensdButtonShow:boolean;
    public isPrevLegensdButtonShow:boolean;
    public showNextPrevDisabledButton:boolean;
    public sliderDirection:string;

      @ViewChild(Slides) slides: Slides;

    constructor(
        private portalParameterService:PortalParameterService,
        private destinationService:DestinationService,
        private platform:Platform
        
    ) {
        super();
        this.setupLegends()

}
  ngAfterContentInit()
{
    let subscribeMapLegends = this.legendsConfig.isResetLegends.subscribe(status => {
      if (status) {
        this.setupLegends()
        this.resetLegends();
       

      }
    });
    this.subscriptions.push(subscribeMapLegends);
}

    resetLegends()
    {
        this.slides.update();
       //  this.isPrevLegensdButtonShow=false;
      
           
    }
    setupLegends()
    {
        let legendsData = [];
        
        this.portalParameterService.getPortalParameters().subscribe(data =>{
            legendsData = data.legendArray;
            this.inititateLegends(legendsData);
        })


        //legendsData = this.tabConfig.legendArray;
        // this.isNextLegensdButtonShow=false;
        // this.isPrevLegensdButtonShow=false;
        // this.showNextPrevDisabledButton=false;
    //     this.setLegendsTypeAndIcon(legendsData);
       
    //    this.sliderOptions = {
    //     continuous : true
    //     };
    //     this.setLegendsTypeAndIcon(legendsData);


       
    //     this.sliderOptions = {
    //         slidesperview: ValueConstant.MAP_LEGENDS_DEFAULT_NO_TO_DISPLAY,
    //         autoplay: 2500,
    //         initialslide: 0,
    //         loop: false,
    //         speed: 10000
    // };
  
}

    inititateLegends(legends)
    {
        this.sliderDirection='horizontal';
        this.isNextLegensdButtonShow=false;
        this.isPrevLegensdButtonShow=false;
        this.showNextPrevDisabledButton=false;
        this.setLegendsTypeAndIcon(legends);
        
        this.sliderOptions = {
         continuous : true
         };
         let sliderDirection
         this.setLegendsTypeAndIcon(legends);
         if (this.platform.is('mobileweb')) {
            this.sliderDirection='vertical';
         }
         else
         {
            this.sliderDirection='horizontal';
         }
         this.sliderOptions = {
             slidesperview: 12,
             autoplay: 2500,
             initialslide: 0,
             loop: false,
             direction:this.sliderDirection,
             speed: 10000
     };
    }

    setLegendsTypeAndIcon(legendsData)
    {
        this.mapLegends = [];
        for (var key in legendsData) {
          // language translation
          let textKey = new MultiLingualTextModel(key)
          //this.languageTranslate.translateText(KioskInfo.Language, key);
          this.mapLegends.push({ type: legendsData[key], text: textKey });
         }
         if(this.mapLegends.length>ValueConstant.MAP_LEGENDS_DEFAULT_NO_TO_DISPLAY)
         {
            this.isNextLegensdButtonShow=true;
          
         }
         setTimeout(() =>
        {         
            this.slides.slideTo(0, 1000);
        }, 600);
        
       
    }

    
    // public get changeBackground(): any {

    // // return { 'background': 'transparent url(' + UrlConstant.AZURE_BLOB_URL + this.appConfig.clientId + '-sprite-legend.png) no-repeat 0 0' };   
    // }
    nextSlide()
    {
       
       let currentIndex = this.slides.getActiveIndex()+1 ;
       let totalLengthOflegends = ValueConstant.MAP_LEGENDS_DEFAULT_NO_TO_DISPLAY+currentIndex;

            if(totalLengthOflegends<=this.mapLegends.length)
             {
                 //console.log("totalLengthOflegends : " + totalLengthOflegends);
                this.slides.slideTo(currentIndex, 500);

                if(this.slides.isEnd())
                {
                   // console.log('this is end');
                }
                else{
                 //   console.log('this is not last slide');
                }
                //this.mapLegends.length-1
                if(totalLengthOflegends==this.mapLegends.length)
                {
                 this.isNextLegensdButtonShow = false;   
                 this.isPrevLegensdButtonShow = true;
                }
             }
             else{
                 this.isPrevLegensdButtonShow = true;
                 this.isNextLegensdButtonShow = false;
                
                
             }
             this.isPrevLegensdButtonShow = true;
     }
     prevSlide()
    {
        let prevIndex = this.slides.getActiveIndex()-1 ;
        if(prevIndex>=0)
        {
          this.slides.slideTo(prevIndex, 500);
          this.isNextLegensdButtonShow=true;
           if(prevIndex==0)
           {
            this.isPrevLegensdButtonShow = false;
           }
        }
        else{
              
        }
       
            
     }

     public get isMapLegendsVertical()
     {
         return this.destinationService.isShowMapLegendsButtonInMobile;
     }

     public hideLegends()
     {
        this.portalParameterService.initMapLegends=false;
     }




   }

   