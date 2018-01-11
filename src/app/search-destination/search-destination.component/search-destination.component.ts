// Angular and Third Party Modules, Libs etc
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SearchDestinationProcessor } from '../search-destination.processor';
import { DestinationService, PortalParameterService, DirectionSearchCommunicationService } from '../../service';
import { AppConstant } from '../../base/constant/app.constant'

import { DirectionQuicklinks } from '../model/direction.quicklinks.model';

@Component({
    selector: 'search-destination',
    templateUrl: 'search-destination.component.html'
})


export class SearchDestination {



    public allDestinationTypesData: any[];


    private destinationData: any[];
    private startingPointText: string;
    private endPointText: string;

    private startingDirectionPointObject: any[];
    private endingDirectionPointObject: any[];
    public isMobileViewSearchBarExpand: boolean;
    public selectedDirectionVisibleColumns: any[];
    public selectedFromDirectionVisibleColumns: any[];
    public selectedToDirectionVisibleColumns: any[];

    public isDirectionSwapped: boolean;





    constructor(
        private searchDestinationProcessor: SearchDestinationProcessor,
        private destinationService: DestinationService,
        private portalParameterService: PortalParameterService,
        private directionSearchCommunicationService:DirectionSearchCommunicationService,
        public platform: Platform
    ) {
        this.init();
        this.getMockData();
        this.setUpSubscriber();

    }
    public getMockData() {
        // this.destinationService.getAllMockData()
        // .subscribe(
        // data => {
        //     this.destinationData = data.Response;
        // },
        // err => {
        //     console.log("Oops no menu data found!");
        // }
        // );
    }

    public init() {

        this.isMobileViewSearchBarExpand = false;
        this.startingPointText = '';
        this.endPointText = '';
        this.isDirectionSwapped = false;
        this.allDestinationTypesData = this.searchDestinationProcessor.allDestinationTypesData.getValue();
    }
    public getDirectoryData(location) {
        this.destinationService.isDirectionStepsVisible = false;
        if (location == AppConstant.FROM_DIRECTORY_LOCATION) {
            this.destinationService.locationInitiatedFrom = AppConstant.FROM_DIRECTORY_LOCATION;
        }
        if (location == AppConstant.TO_DIRECTORY_LOCATION) {
            this.destinationService.locationInitiatedFrom = AppConstant.TO_DIRECTORY_LOCATION;

        }

        this.destinationService.isDirctoryInitiatedFromDestinationInput.next(true);
        this.directionSearchCommunicationService.isSearchDestinationInitiated=false;

    }

    public setUpSubscriber() {

        this.searchDestinationProcessor.allDestinationTypesData.subscribe(data => {
            this.allDestinationTypesData = data;
        });

        this.destinationService.selectedDirectionVisibleColumns.subscribe(data => {

            if (data) {
                this.selectedDirectionVisibleColumns = data;
            }

        })

        this.destinationService.directionUpdateFromDirectionList.subscribe(result => {
            if (result) {
                console.log(JSON.stringify(result));


                //if (result.Location) {
                if (result) {

                    if (this.destinationService.locationInitiatedFrom == AppConstant.FROM_DIRECTORY_LOCATION) {

                        this.selectedFromDirectionVisibleColumns = this.selectedDirectionVisibleColumns;
                        console.log("from start " + JSON.stringify(this.selectedFromDirectionVisibleColumns));
                        //this.startingPointText = result.Location;
                        if(this.selectedDirectionVisibleColumns && !this.directionSearchCommunicationService.isSearchDestinationInitiated)
                        {
                        this.startingPointText = result[this.selectedDirectionVisibleColumns[0]];
                        }
                        else
                        {
                            this.startingPointText = result['SearchedData'];
                        }

                        this.destinationService.directoryStartingPoint = result;
                        this.startingDirectionPointObject = result;
                    }
                    if (this.destinationService.locationInitiatedFrom == AppConstant.TO_DIRECTORY_LOCATION) {
                        //this.endPointText = result.Location;
                        this.selectedToDirectionVisibleColumns = this.selectedDirectionVisibleColumns;
                        console.log("from end " + JSON.stringify(this.selectedToDirectionVisibleColumns));
                        if(this.selectedDirectionVisibleColumns && !this.directionSearchCommunicationService.isSearchDestinationInitiated)
                        {
                            this.endPointText = result[this.selectedDirectionVisibleColumns[0]]
                        }
                        else
                        {
                            this.endPointText = result['SearchedData'];
                        }

                        this.destinationService.directoryEndingPoint = result;
                        this.endingDirectionPointObject = result;
                    }

                    this.destinationService.isDirectoryInitiatedFromDestinationInputCompleted.next(true);

                }
                //alert(result);
            }
        })
    }

    public swapLocation() {
        //debugger;

        if (this.isDirectionSwapped == false) {
            let endPointObj = this.endingDirectionPointObject;
            let startPointObj = this.startingDirectionPointObject;

            if (endPointObj && startPointObj && this.selectedToDirectionVisibleColumns) {
                if(endPointObj['SearchedData'])
                {
                    this.startingPointText = endPointObj['SearchedData'];
                }
                else
                {
                    this.startingPointText = endPointObj[this.selectedToDirectionVisibleColumns[0]];
                }
                if(startPointObj['SearchedData'])
                {
                    this.endPointText = startPointObj['SearchedData'];
                }
                else
                {
                    this.endPointText = startPointObj[this.selectedFromDirectionVisibleColumns[0]];
                }
               
               
            }
            else if(endPointObj && startPointObj && !this.selectedToDirectionVisibleColumns)
            {
                this.startingPointText = endPointObj['SearchedData'];
                this.endPointText = startPointObj['SearchedData'];
            }
            this.startingDirectionPointObject = endPointObj;
            this.endingDirectionPointObject = startPointObj;
            this.isDirectionSwapped = true;
        }
        else {
            let startPointObj = this.endingDirectionPointObject;
            let endPointObj = this.startingDirectionPointObject;

            if (endPointObj && startPointObj && this.selectedToDirectionVisibleColumns) {

                if(endPointObj['SearchedData'])
                {
                    this.endPointText = endPointObj['SearchedData'];
                }
                else
                {
                    this.endPointText = endPointObj[this.selectedToDirectionVisibleColumns[0]];
                }
                if(startPointObj['SearchedData'])
                {
                    this.startingPointText = startPointObj['SearchedData']
                }
                else
                {
                    this.startingPointText = startPointObj[this.selectedFromDirectionVisibleColumns[0]]
                    
                }

            }
            else if(endPointObj && startPointObj && !this.selectedToDirectionVisibleColumns)
            {
                this.startingPointText = startPointObj['SearchedData']
                this.endPointText = endPointObj['SearchedData'];
            }

            this.startingDirectionPointObject = startPointObj;
            this.endingDirectionPointObject = endPointObj;
            this.isDirectionSwapped = false;
        }


    }


    public getDirections() {
        this.destinationService.directionQuicklinks = [];
        let directionQuicklinks = new DirectionQuicklinks();
        if (this.startingDirectionPointObject && this.endingDirectionPointObject) {
            directionQuicklinks.StartQuicklink = this.startingDirectionPointObject['quicklink'];
            directionQuicklinks.EndQuicklink = this.endingDirectionPointObject['quicklink'];

            this.destinationService.directionQuicklinks.push(directionQuicklinks);


            if (this.platform.is('mobileweb')) {
                this.isMobileViewSearchBarExpand = false;
                this.portalParameterService.initMapLegends = false;
            }
            else {
                this.portalParameterService.initMapLegends = true;
            }
            this.destinationService.initDirectionSteps.next(true);

        }
    }

    public clearStartingPoint() {
        this.startingPointText = '';
        this.directionSearchCommunicationService.isSearchDestinationInitiated=false;
    }

    public clearEndingPoint() {
        this.endPointText = '';
        this.directionSearchCommunicationService.isSearchDestinationInitiated=false;
    }
    public get toDestination(): string {
        if (this.endingDirectionPointObject) 
        {
            if(!this.endingDirectionPointObject['SearchedData'])
            {
                return this.endingDirectionPointObject[this.selectedDirectionVisibleColumns[0]];
            }
            else
            {
                return this.endingDirectionPointObject['SearchedData'];
            }
        }
     }
    public enableBlueSearchBar() {

        if (this.isMobileViewSearchBarExpand == false) {

            this.isMobileViewSearchBarExpand = true;
        }
        else {
            this.isMobileViewSearchBarExpand = false;
        }


    }

    public goToDestination(destinationData)
    {
        this.destinationService.directionUpdateFromDirectionList.next(destinationData);
        alert(destinationData.SearchedData);
        alert(destinationData.Quicklink);
    }

    public onKey(value){
    
        this.destinationService.filterDestinationText=value;
        if(value.length>1)
        {
        
        this.directionSearchCommunicationService.isSearchDestinationInitiated=true;
        this.destinationService.isDirectoryInitiatedFromDestinationInputCompleted.next(true);
        }
        else
        {
            this.directionSearchCommunicationService.isSearchDestinationInitiated=false;
        }

    }

    public get isSearchDestinationInitiated():boolean
    {
        return this.directionSearchCommunicationService.isSearchDestinationInitiated;
    }

}