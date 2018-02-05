// Angular and Third Party Modules, Libs etc
import { NgModule } from '@angular/core';

// Base
import { ModuleBase } from '../base';

// Services
import
{
    DestinationService,
    PortalParameterService,
    DirectionSearchCommunicationService,
    GeolocationService

} from './service';

@NgModule({
    providers: [
        DestinationService,
        PortalParameterService,
        DirectionSearchCommunicationService,
        GeolocationService
    ]
})
export class ServiceModule extends ModuleBase { }