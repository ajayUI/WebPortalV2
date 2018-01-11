// Angular and Third Party Modules, Libs etc
import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';

// Components
import
{
    FilterDestinationProcessor,
    FilterDestinationComponent
} from '../filter-destination';



import { DestinationFilterPipe } from './pipes/destination.filter.pipe';


@NgModule({
    imports: [
        IonicModule        
    ],
    declarations: [
        DestinationFilterPipe,
        FilterDestinationComponent
    ],
    exports: [
        FilterDestinationComponent
    ],
    providers: [
        FilterDestinationProcessor
    ]
})
export class FilterDestinationModule { }