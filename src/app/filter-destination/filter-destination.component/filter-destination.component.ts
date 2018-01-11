// Angular and Third Party Modules, Libs etc
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FilterDestinationProcessor } from '../filter-destination.processor';
import { DestinationService, PortalParameterService, DirectionSearchCommunicationService } from '../../service';
import { AppConstant } from '../../base/constant/app.constant'


@Component({
    selector: 'filter-destination',
    templateUrl: 'filter-destination.component.html'
})


export class FilterDestinationComponent {

    public allDestinationTypesData: any[];

    constructor(
        private filterDestinationProcessor: FilterDestinationProcessor,
        private destinationService: DestinationService,
        private portalParameterService: PortalParameterService,
        private directionSearchCommunicationService:DirectionSearchCommunicationService
    ) {
        this.init();
        this.setUpSubscriber();
    }
    public init() {
                this.allDestinationTypesData = this.filterDestinationProcessor.allDestinationTypesData.getValue();
    }

    public setUpSubscriber()
    {
        this.filterDestinationProcessor.allDestinationTypesData.subscribe(data => {
            this.allDestinationTypesData = data;
        });

    }

    public get destinationFilterText():string
    {
      return this.destinationService.filterDestinationText;
    }

    public goToDestination(destination)
    {
        console.log(JSON.stringify(destination));
        this.destinationService.directionUpdateFromDirectionList.next(destination);
        this.destinationService.filterDestinationText='';
    }
}