// Angular and Third Party Modules, Libs etc
import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';

// Components
import
{
    SearchDestinationProcessor,
    SearchDestination
} from '../search-destination';

//import { DestinationFilterPipe } from './pipes/destination.filter.pipe';


@NgModule({
    imports: [
        IonicModule        
    ],
    declarations: [
  //      DestinationFilterPipe,
        SearchDestination
    ],
    exports: [
        SearchDestination
    ],
    providers: [
        SearchDestinationProcessor
    ]
})
export class SearchDestinationModule { }