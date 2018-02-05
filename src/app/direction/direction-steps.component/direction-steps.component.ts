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
    public isShowMobileStepsSlider: boolean;
    public initialSlide: number;
    public isShowPrevSliderButton: boolean;
    public isShowNextSliderButton: boolean;
    public currentFloorIndex: number;
    public isEndOfAllDirectionsOfFloors: boolean;
    public isStartOfAllDirectionsOfFloors:boolean;


    constructor(
        private destinationService: DestinationService,
        private directionProcessor: DirectionProcessor,
        public platform: Platform
    ) {

        this.init();
        this.setUpSubscriber();

    }

    public init() {
        this.stepsArray = [];
        this.stepsCounter = AppConstant.NUMERIC_ZERO;
        this.shownGroup = AppConstant.NUMERIC_ZERO;
        this.isShowMobileStepsSlider = false;
        this.initialSlide = AppConstant.NUMERIC_ZERO;
        this.currentFloorIndex = AppConstant.NUMERIC_ZERO;
        this.isShowPrevSliderButton = false;
        this.isShowNextSliderButton = true;
        this.isEndOfAllDirectionsOfFloors = false;
        this.isStartOfAllDirectionsOfFloors=true;


    }
    public setUpSubscriber() {
        this.directionProcessor.walkingDirectionByFloor.subscribe(directions => {
            this.walkingDirections = [];
            this.stepsArray = [];
            this.stepsCounter = AppConstant.NUMERIC_ZERO;
            this.walkingDirectionsObj = directions;
            this.directionStepsTitle = this.directionProcessor.directionLanguageKeys;
            let stepsLength = this.directionStepsTitle.length;

            if (directions) {
                let counter = AppConstant.NUMERIC_ZERO;
                let forIndex = counter + AppConstant.NUMERIC_ONE;
                for (let key in directions) {
                    let languageKey = this.directionProcessor.directionLanguageKeys[forIndex - 1].OtherLanguageKey ? this.directionProcessor.directionLanguageKeys[forIndex - 1].OtherLanguageKey : this.directionProcessor.directionLanguageKeys[forIndex - 1].EnglishLanguageKey;
                    this.setWalkingDirections(directions[languageKey]);
                    counter++;
                    forIndex++;
                }
            }
        });



        this.destinationService.initDirectionSteps.subscribe(status => {

            if (this.platform.is('mobileweb')) {
                this.showMap(this.stepsArray[AppConstant.NUMERIC_ZERO], AppConstant.NUMERIC_ZERO, null);
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
    public showMap(step, index, direction) {
        console.log("#############   " + index)
        let lastPreviousSlideIndex = step.length - AppConstant.NUMERIC_ONE;
        this.currentFloorIndex = index;
        this.mobileDirectionSteps = step;

        if (this.platform.is('mobileweb')) {
            this.directionProcessor.isShowMobileStepsSlider = true;
            this.isShowMobileStepsSlider = true;
            this.destinationService.isShowMapLegendsButtonInMobile = true;
            setTimeout(() => {
                if(direction == 'next')
                {
                    console.log('under next');
                    this.slides.slideTo(AppConstant.DEFAULT_SLIDER_INDEX, AppConstant.NUMERIC_ZERO);
                }
                if (direction=='prev')
                {
                    console.log('under prev');
                    this.slides.slideTo(lastPreviousSlideIndex, AppConstant.NUMERIC_ZERO);
                }
                else
                {
                    console.log('under else');
                    this.slides.slideTo(AppConstant.DEFAULT_SLIDER_INDEX, AppConstant.NUMERIC_ZERO);
                }
            }, 400);

        }
    }

    public get isShowStepsSlider(): boolean {
        return this.directionProcessor.isShowMobileStepsSlider && this.platform.is('mobileweb') && this.isShowMobileStepsSlider;
    }

    public swipeEvent(event) {
        this.resetMobileStepsSlider();
    }

    public resetMobileStepsSlider() {
        this.isShowMobileStepsSlider = false;
        this.directionProcessor.isShowMobileStepsSlider = false;
        this.isEndOfAllDirectionsOfFloors = false;
        //  this.isShowNextSliderButton=true;

    }
    public setEndOfSlides() {
        //  this.isShowNextSliderButton=false;
        let totalFloorsLength = this.stepsArray.length;
        if (this.currentFloorIndex + AppConstant.NUMERIC_ONE < totalFloorsLength) {
            let currentFloorIndex = this.currentFloorIndex + AppConstant.NUMERIC_ONE;
            let currentStep = this.stepsArray[currentFloorIndex];
            this.showMap(currentStep, currentFloorIndex, 'next');
        }
        else {
            this.isEndOfAllDirectionsOfFloors = true;
        }

    }
    public setStartOfSlides() {
        // console.log('from prev floor index' + this.currentFloorIndex);
        // // this.isShowPrevSliderButton=false;
        // let totalFloorsLength = this.stepsArray.length;
        // if (this.currentFloorIndex >1) {
        //     let currentFloorIndex = this.currentFloorIndex - AppConstant.NUMERIC_ONE;
        //     let currentStep = this.stepsArray[currentFloorIndex];
        //     this.showMap(currentStep, currentFloorIndex);
        // }
        // else {
        //     this.isStartOfAllDirectionsOfFloors = true;
        // }

    }

    public getPrev() {
        console.log("is start status" + this.isStartOfAllDirectionsOfFloors);
        console.log('is this beginning' + this.slides.isBeginning());

        if(this.slides.isBeginning() && this.currentFloorIndex!=0)
        {
            console.log ('in switching preious floor');
            let currentFloorIndex = this.currentFloorIndex - AppConstant.NUMERIC_ONE;
            let currentStep = this.stepsArray[currentFloorIndex];
            this.showMap(currentStep, currentFloorIndex, 'prev');
        }
        if (this.slides.isBeginning() && this.currentFloorIndex==0)
        {
            console.log ('this is the first slide of first floor');
            alert('this is the first slide of first floor');
        }
        if(!this.slides.isBeginning())
        {
            console.log ('this is not the first slide');
            this.slides.slidePrev();
        }
        // if (!this.isStartOfAllDirectionsOfFloors) {
        // }
        // else
        // {
        //     alert('this is the first step of first floor ')
        // }
        

        //this.isShowNextSliderButton=true;

    }

    public getNext() {
        if (!this.isEndOfAllDirectionsOfFloors) {
            this.slides.slideNext();
            this.isShowPrevSliderButton = true;
        }
        else {
            alert('dsfgdgdfgdfgdfgdf');
        }
    }


}