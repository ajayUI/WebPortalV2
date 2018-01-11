// Angular and Third Party Modules, Libs etc
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DirectorySearchedText } from '../search-destination/model/directory.searchtext.model';
import { Observable, BehaviorSubject, AsyncSubject } from 'rxjs/Rx';
// Base
import { DirectionQuicklinks } from '../search-destination/model/direction.quicklinks.model';

import
{
    ServiceBase,
    AppConstant,
    UrlConstant
 } from '../base';

@Injectable()
export class DestinationService extends ServiceBase {
    public directionsData:any;
    public directionMenu:any;
    public directoryFilteredDataBySearchText:DirectorySearchedText[]=[];
    public isDirctoryInitiatedFromDestinationInput: BehaviorSubject<boolean>;
    public isDirectoryInitiatedFromDestinationInputCompleted:BehaviorSubject<boolean>;
    public directionUpdateFromDirectionList:BehaviorSubject<any>;
    public directoryStartingPoint:any[];
    public directoryEndingPoint:any[];
    public locationInitiatedFrom:string;
    public initDirectionSteps : BehaviorSubject<boolean>;
    public directionQuicklinks:DirectionQuicklinks[];
    public isDirectionStepsVisible:boolean;
    public isShowMapLegendsButtonInMobile:boolean;
    public selectedDirectionVisibleColumns:BehaviorSubject<any>;
    public filterDestinationText:string;




    
    public constructor(http: Http) {
        super(http);
        this.directoryFilteredDataBySearchText = []; 
        this.directionQuicklinks=[]; 
        this.isDirctoryInitiatedFromDestinationInput=new BehaviorSubject<boolean>(false);  
        this.isDirectoryInitiatedFromDestinationInputCompleted=new BehaviorSubject<boolean>(false);
        this.initDirectionSteps = new BehaviorSubject<boolean>(false);     
        this.directionUpdateFromDirectionList=new BehaviorSubject<any>(null);
        this.selectedDirectionVisibleColumns = new BehaviorSubject<any>(null);
        this.directoryStartingPoint= [];
        this.directoryEndingPoint= [];
        this.locationInitiatedFrom=AppConstant.TO_DIRECTORY_LOCATION;
        this.isDirectionStepsVisible = false;
        this.isShowMapLegendsButtonInMobile= false;
        this.filterDestinationText='';


    }

    // getAllDirectory(destinationTypeID: number, clientid: number, pageSize: number)
    // {
    //     let url = this.encodeUrl(this.baseUrl + '?clientdestinationtypeid=' + destinationTypeID + '&clientid=' + clientid + '&filter=&sorting=&startindex=0&pagesize=' + pageSize);
    //     let response = this.http.get(url, this.options).map(res => res.json())
    //     return response;
    // }

    // getDirectoryList(clientid)
    // {
    //     let url = this.encodeUrl(this.baseUrl + 'getdestinationtypes?clientid=' + clientid);
    //     let response = this.http.get(url, this.options).map(res => res.json());
    //     return response;
    // }
    public getAllMockData(){
        let url = './assets/json/destination.mock.json';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    public getDirectionStepsMockData(){
        let url = './assets/json/umc.mock.json';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    // public getQuicklinkFromEventLocation(location: string, language:string)
    // {
    //     let quicklink = null;
    //     let txtRoom = location.replace('-', '');
    //     //first search from directory data
    //     this.directionsData.some(element =>
    //     {
    //         if (element.VisibleColumnNames.indexOf('Room') != -1)
    //         {
    //             element.Destinations[language].some(dest =>
    //             {
    //                 if (dest.Room)
    //                 {
    //                     if (txtRoom.indexOf(dest.Room) != -1)
    //                     {
    //                         quicklink = dest.quicklink;
    //                         return true;
    //                     }
    //                 }
    //             });
    //         }
    //         if (quicklink)
    //         {
    //             return true;
    //         }
    //     });
    //     return quicklink;
    // }
}