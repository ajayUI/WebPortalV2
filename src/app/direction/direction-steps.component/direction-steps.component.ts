import { Component, ViewChild } from '@angular/core';
import { NavParams, Platform, ModalController, Slides } from 'ionic-angular';

// Base
import {
    ComponentBase,
    DirectionListModel,
    DirectionMenuModel,
    DirectionGridSettingModel,
    ResponseStatusType,
    AppConstant,
    LabelConstant,
    ValueConstant,
    ErrorMessageConstant,
    ModelMapper,
    QuickLinkModel,
    CommonHelper,
    MultiLingualTextModel
} from '../../base';

import { WalkingDirectionStepViewModel } from '../model/walking-direction.view.model';

// Services and Processors
import { DestinationService } from '../../service';
import { DirectionProcessor } from '../direction.processor';

declare var jQuery: any;

@Component({
    selector: 'direction-steps',
    templateUrl: 'direction-steps.component.html'
})
export class DirectionStepsComponent {
    @ViewChild(Slides) slides: Slides;
    public stepsArray: any[];
    public stepsCounter: number;
    public walkingDirections: WalkingDirectionStepViewModel[];
    public walkingDirectionsObj: any[];
    public directionStepsTitle: any[];
    public shownGroup: any;
    public mobileDirectionSteps: any[];
    public isShowMobileStepsSlider:boolean;
    public initialSlide:number;


    constructor(
        private destinationService: DestinationService,
        private directionProcessor: DirectionProcessor,
        public platform:Platform
    ) {

        this.init();
        this.setUpSubscriber();

    }

    public init() {
        this.stepsArray = [];
        this.stepsCounter = 0;
        this.shownGroup = 0;
        this.isShowMobileStepsSlider=false;
        this.initialSlide=0;
        
       
    }
    public setUpSubscriber() {
        this.directionProcessor.walkingDirectionByFloor.subscribe(directions => {
            this.walkingDirections = [];
            this.stepsArray = [];
            this.stepsCounter = 0;
            this.walkingDirectionsObj = directions;
            this.directionStepsTitle = this.directionProcessor.directionLanguageKeys;
            let stepsLength = this.directionStepsTitle.length;

            if (directions) {
                let counter = 0;
                let forIndex = counter + 1;
                for (let key in directions) {
                    let languageKey = this.directionProcessor.directionLanguageKeys[forIndex - 1].OtherLanguageKey ? this.directionProcessor.directionLanguageKeys[forIndex - 1].OtherLanguageKey : this.directionProcessor.directionLanguageKeys[forIndex - 1].EnglishLanguageKey;
                    this.setWalkingDirections(directions[languageKey]);
                    counter++;
                    forIndex++;
                }
            }
        });



        this.destinationService.initDirectionSteps.subscribe(status =>{

             if(this.platform.is('mobileweb'))
             {
                this.showMap(this.stepsArray[0]);
             }

        })
    }

    public setWalkingDirections(directions) {
        let directionsToSteps = [];
        if (directions) {
            directions.forEach(element => {
                let walkDirection = new WalkingDirectionStepViewModel();
                walkDirection.description = this.handleIconAndBuildingText(element.Description);
                walkDirection.directionClass = this.getDirectionClass(element['Direction']);
                this.walkingDirections.push(walkDirection);
                directionsToSteps.push(walkDirection);
            });
            this.stepsArray.push(directionsToSteps);
            this.stepsCounter++;
        }

    }

    private getDirectionClass(direction) {
        if (typeof (direction) == "undefined" || direction === null || direction === "") {
            return "";
        }

        switch (direction) {
            case "RIGHT":
            case "IMMEDIATE RIGHT":
            case "SLIGHT RIGHT":
                return "right";
            case "SLIGHT LEFT":
            case "LEFT":
            case "IMMEDIATE LEFT":
                return "left";
            case "PARKING":
                return "parking";
            case "GO STRAIGHT":
            case "STRAIGHT":
            case "CONTINUE":
                return "straight";
            case "FLOOR-FLOOR":
                return "elevator";
            case "START":
                return "start";
            case "END":
            case "Arrive at Destination":
                return "end";
            case "BACK":
                return "back";
        }
    }

    private handleIconAndBuildingText(directionDescription) {
        if (directionDescription) {
            //replace building/suite
            if (directionDescription.indexOf('<|') != -1) {
                directionDescription = directionDescription.replace(/<\|/g, '<strong>').replace(/\|>/g, '</strong>');
            }
            //Add icon
            if (directionDescription.indexOf('<@') != -1) {
                let regexp = new RegExp('\<@(.*?)\@>', "g");
                let stringCollection = directionDescription.match(regexp);

                if (stringCollection) {
                    for (let i = 0; i < stringCollection.length; i++) {
                        let startPos = stringCollection[i].indexOf('<@') + 2;
                        let endPos = stringCollection[i].indexOf('@>', startPos);

                        let buildingText = stringCollection[i].substring(startPos, endPos);
                        //CI_cafeteria
                        if (buildingText.indexOf('CI') != -1) {
                            let ClassName = buildingText.split('_')[1].toLowerCase();
                            //let ClassName = stringCollection[i].substring(startPos, startPos + 1);

                            let textToReplace = '<span class ="destinations-icon icon-' + ClassName + '"></span>';
                            directionDescription = directionDescription.replace(stringCollection[i], textToReplace);
                        }
                        else {
                            let ClassName = stringCollection[i].substring(startPos, startPos + 1);
                            let textToReplace = '<span class ="map-style-icon icon-' + ClassName + '">' + buildingText + '</span>';
                            directionDescription = directionDescription.replace(stringCollection[i], textToReplace);
                        }
                    }
                }
            }
        }
        return directionDescription;
    }

    public get directionStepsNote(): string {
        return this.directionProcessor.directionSteps['Note'];
    }

    public toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    };
    public isGroupShown(group) {
        return this.shownGroup === group;
    };
    public showMap(step) {
        this.mobileDirectionSteps = step;
        if (this.platform.is('mobileweb')) {
            this.directionProcessor.isShowMobileStepsSlider=true;
            this.isShowMobileStepsSlider=true;
            this.destinationService.isShowMapLegendsButtonInMobile=true;
            setTimeout(() =>
            {         
                this.slides.slideTo(0, 1000);
            }, 1000);

        }
    }

    public get isShowStepsSlider():boolean
    {
        
        return this.directionProcessor.isShowMobileStepsSlider && this.platform.is('mobileweb') && this.isShowMobileStepsSlider;
    }

    public swipeEvent(event)
    {
        this.resetMobileStepsSlider();
    }

    public resetMobileStepsSlider()
    {
        this.isShowMobileStepsSlider = false;
        this.directionProcessor.isShowMobileStepsSlider = false;

    }



}