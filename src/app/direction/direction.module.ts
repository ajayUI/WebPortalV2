// Angular and Third Party Modules, Libs etc
import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';

// Components
import
{
    DirectionProcessor,
    DirectionListComponent,
    DirectionStepsComponent
} from '../direction';

import { DirectionFilterPipe } from './pipes/direction.filter.pipe';

@NgModule({
    imports: [
        IonicModule        
    ],
    declarations: [
        DirectionFilterPipe,
        DirectionListComponent,
        DirectionStepsComponent
        
    ],
    exports: [
        DirectionListComponent,
        DirectionStepsComponent
    ],
    providers: [
        DirectionProcessor
    ]
})
export class DirectionModule { }