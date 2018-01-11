// Angular and Third Party Modules, Libs etc
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, AsyncSubject } from 'rxjs/Rx';

import
{
    ServiceBase,
    AppConstant,
    UrlConstant
 } from '../base';

@Injectable()
export class DirectionSearchCommunicationService extends ServiceBase {
    
    public isSearchDestinationInitiated:boolean=false;
    public constructor(http: Http) {
        super(http);
        this.init();
    }
    init()
    {

    }

}