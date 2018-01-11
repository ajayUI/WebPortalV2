// Angular and Third Party Modules, Libs etc
import { Component } from '@angular/core';

// Base
import {
    ComponentBase,
    AppConstant,
    UrlConstant
} from '../../../base';

// Startup

@Component({
    selector: 'header-logo',
    templateUrl: 'header-logo.component.html'
})
export class HeaderLogoComponent extends ComponentBase {
    private currentVersion: string;
    private headerLogoImageUrl: string;

    constructor(
    ) {
        super();
        this.currentVersion = null;
        //this.headerLogoImageUrl = UrlConstant.AZURE_BLOB_URL + this.appConfig.clientId + AppConstant.HEADER_LOGO_IMAGE_COMMON_SUBSCRIPT;
    }

    // showVersion(clickCounts) {
    //     console.log(clickCounts);
    //     if (clickCounts >= AppConstant.APPCACHE.VERSION_ID.SHOW_ON_MIN_CLICKS_COUNT) {
    //         this.currentVersion = this.appConfig.appCacheVersion.getValue();
    //     }
    //     else {
    //         this.currentVersion = null;
    //     }
    // }
}