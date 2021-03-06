// Angular and Third Party Modules, Libs etc
import { Injectable, ElementRef } from '@angular/core';
import { NavController, NavParams, Tabs, ModalController } from 'ionic-angular';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';

import { DestinationService} from '../service';

import { DirectorySearchedText } from './model/directory.searchtext.model';
import { DirectoryListFilteredByLanguage } from './model/directory.list.filteredby.language.model';

declare var jQuery:any;

@Injectable()
export class SearchDestinationProcessor  
{
    public allDestinationTypesData: BehaviorSubject<DirectoryListFilteredByLanguage[]>;

    constructor(
        private modalCtrl:ModalController,
        private destinationService:DestinationService
        )
    {
        this.init();
        this.setMockDestinationsModelFilterByLanguage();
        //this.setMockData();
        this.initSubscriber();

        //this.setDestinationTypesData();
    }

    private init()
    {
        this.allDestinationTypesData = new BehaviorSubject<DirectoryListFilteredByLanguage[]>(null);
    }

    // public setMockData()
    // {
    //     this.destinationService.getAllMockData()
    //     .subscribe(
    //     data => {
    //         this.allDestinationTypesData = data;
    //        // return this.allDestinationTypesData;
    //     },
    //     err => {
    //         console.log("Oops no data found!");
    //     }
    //     );

    // }

    private initSubscriber()
    {
        // this.appState.language.subscribe(langChange =>
        // {
            //this.allDestinationTypesData = 
            // this.destinationService.getAllMockData()
            // .subscribe(
            // data => {
            //     this.allDestinationTypesData = data;
            //     console.log('got data!!!!');
            // },
            // err => {
            //     console.log("Oops no data found!");
            // }
            // );
            
            //this.destinationService.directionsData;
        // });
        
    }



    

    public getDirectoryFilteredDataBySearchText(): DirectorySearchedText[]
    {
        return this.destinationService.directoryFilteredDataBySearchText;
    }


    private setMockDestinationsModelFilterByLanguage()
    {
        this.destinationService.directionsData = [];
        this.destinationService.getAllMockData()
        .subscribe(
        data => {

                // if (data)
                // {
                //     this.isInitDirectionCompleted.next(true);
                // }
                // Storing data of directions 
                let responseData = data.Response;
                let allDestinationTypesData: DirectoryListFilteredByLanguage[] = [];
                this.destinationService.directionMenu = data.Response;
                for (let index = 0; index < responseData.length; index++)
                {
                    let destinationList = responseData[index].Destinations;

                    let directionsData = [];
                    let directoryListFilteredByLanguageData = new DirectoryListFilteredByLanguage();
                    directoryListFilteredByLanguageData.MenuLabel = data.Response[index].MenuLabel;
                    // directoryListFilteredByLanguageData.VisibleColumnNames=data.Response[index].VisibleColumnNames.split(',');
                    directoryListFilteredByLanguageData.VisibleColumnNames = [];
                    directoryListFilteredByLanguageData.VisibleColumnNames.push('Tags');
                    let columnList = directoryListFilteredByLanguageData.VisibleColumnNames.concat(data.Response[index].VisibleColumnNames.split(','));
                    directoryListFilteredByLanguageData.VisibleColumnNames = columnList;
                    if (destinationList.length > 0 && destinationList[0].Language)
                    {
                        for (let innerIndex: number = 0; innerIndex < destinationList.length; innerIndex++)
                        {
                            let currentLanguageKey = destinationList[innerIndex].Language.toLowerCase();
                            if (!directionsData[currentLanguageKey])
                            {
                                directionsData[currentLanguageKey] = [];
                            }
                            directionsData[currentLanguageKey].push(destinationList[innerIndex]);
                        }
                    }
                    else
                    {
                        for (let innerIndex: number = 0; innerIndex < destinationList.length; innerIndex++)
                        {
                            let currentLanguageKey = 'english'; //this.appState.language.getValue().toLowerCase();
                            //this.destinationService.directionsData[currentLanguageKey] = this.destinationService.directionsData[currentLanguageKey] || [];
                            //if (destinationList[innerIndex].quicklink) {
                            if (!directionsData[currentLanguageKey])
                            {
                                directionsData[currentLanguageKey] = [];
                            }
                            directionsData[currentLanguageKey].push(destinationList[innerIndex]);
                            //}
                        }
                    }
                    directoryListFilteredByLanguageData.Destinations = directionsData;
                    //directionsData[this.appState.language.getValue().toLowerCase()];
                    allDestinationTypesData.push(directoryListFilteredByLanguageData);
                }
                this.destinationService.directionsData = allDestinationTypesData;
                this.setDestinationTypesData();
            });
    }

    private setDestinationTypesData()
    {
        this.allDestinationTypesData.next(this.destinationService.directionsData);
    }


} 