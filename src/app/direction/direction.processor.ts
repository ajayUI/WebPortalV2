// Angular and Third Party Modules, Libs etc
import { Injectable, ElementRef } from '@angular/core';
import { NavController, NavParams, Tabs, ModalController } from 'ionic-angular';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';

import { DestinationService} from '../service';

import {WalkingDirectionKeys} from './model/walking-direction.language.key.model';
import {WalkingDirectionStepViewModel} from './model/walking-direction.view.model';


// Base
import
{
    DirectionInfoModel
} from '../base';

@Injectable()
export class DirectionProcessor  
{


    public isResetDirectoryList: BehaviorSubject<boolean>;
    public isResetGreetVideo: BehaviorSubject<boolean>;
    public isCloseEmailModalPopup: BehaviorSubject<boolean>;
    public thumbnailsLength: BehaviorSubject<number>;;
    public toDestinationLabel: string;
    public resetMapLegends: BehaviorSubject<boolean>;
    public lastBackSelectedDestination: any = {};
    public lastVisitedMenuLevel: number = 0;
    public backButtonEnableFromDirectonSteps:boolean=false;
    public backButtonINMenuIfSingleLevel:boolean=true;

    public lastVisitedId:number;
    public lastVisitedClickId:number;
    public lastVisitedParentId:number;
    public lastVisitedDisplayOrder:number;
    public lastVisitedMenuLabel:string;
    public lastVisitedIsShowMenu:boolean;

    public selectedVisibleColumns:any[];


    public directionSteps:any[];
    public startEndQuicklinks:any[];
    public directionLanguageKeys: WalkingDirectionKeys[];
    public walkingDirectionByFloor: BehaviorSubject<DirectionInfoModel[]>;
    
    public isShowMobileStepsSlider:boolean;
    
    // public isDirectionStepsVisible:boolean;


    constructor(
        private modalCtrl:ModalController,
        private destinationService:DestinationService
        )
    {
        this.init();
        this.setUpSubscriber();
    }

    private init()
    {
        this.walkingDirectionByFloor = new BehaviorSubject<DirectionInfoModel[]>(null);  
        this.destinationService.isDirectionStepsVisible=false;
        this.isShowMobileStepsSlider=false;
    }

    public setUpSubscriber()
    {
        this.destinationService.initDirectionSteps.subscribe(status=>{
            if(status)
            {
                this.isShowMobileStepsSlider=false;
                this.directionSteps=[];
                this.destinationService.getDirectionStepsMockData()
                .subscribe(
                data => {
                    this.directionLanguageKeys=[];
                    this.directionSteps = data;
                    let counter = 0;
                    for (let key in data.WalkingDirections)
                    {
                        let obj = new WalkingDirectionKeys();
                        obj.EnglishLanguageKey = key;
                        this.directionLanguageKeys.push(obj);
                        //this.mapService.mapLoadedCountInPrint[counter]=false;
                        counter++;
                    }
                    //startEndQuicklinks = this.destinationService.directionQuicklinks;

                    
                    
                    this.enableDirectionSteps(data);

                },
                err => {
                    console.log("Oops no menu data found!");
                }
                );
            }
        })

    }

    public enableDirectionSteps(direction){
        let forIndex = 2;
        let languageKey = this.directionLanguageKeys[forIndex - 1].OtherLanguageKey ? this.directionLanguageKeys[forIndex - 1].OtherLanguageKey : this.directionLanguageKeys[0].EnglishLanguageKey;
        //this.walkingDirectionByFloor.next(direction.WalkingDirections[languageKey]);
        this.walkingDirectionByFloor.next(direction.WalkingDirections);
        this.destinationService.isDirectionStepsVisible=true;
    }

    

} 