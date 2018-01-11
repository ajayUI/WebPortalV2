// Angular and Third Party Modules, Libs etc
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BehaviorSubject } from 'rxjs/Rx';


/// Base
import {
    ServiceBase,
    UrlConstant
} from '../base';

@Injectable()
export class PortalParameterService extends ServiceBase {
    public initMapLegends : boolean;
    constructor(http: Http) {
        super(http, UrlConstant.PORTAL_PARAMETER_SERVICE_URL);
        this.initMapLegends = false;
    }
    // public getPortalParameters(host: string) {
    //     let url = this.encodeUrl(this.baseUrl + 'getbyhost?host=' + host);
    //     return this.http.get(url, this.options).map(res => res.json());
    // }

    public getPortalParameters() {
        let url = './assets/json/portalParameter.mock.json';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

}
