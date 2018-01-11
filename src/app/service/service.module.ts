// Angular and Third Party Modules, Libs etc
import { NgModule } from '@angular/core';

// Base
import { ModuleBase } from '../base';

// Services
import
{
    DestinationService,
    PortalParameterService,
    DirectionSearchCommunicationService

} from './service';

@NgModule({
    providers: [
        DestinationService,
        PortalParameterService,
        DirectionSearchCommunicationService
    ]
})
export class ServiceModule extends ModuleBase { }