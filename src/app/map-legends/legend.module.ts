// Angular and Third Party Modules, Libs etc
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
// Custom Modules
// import { SharedModule } from '../module';

// Components
import {
    MapLegend
} from '../map-legends';

@NgModule({
   imports:[
    IonicModule
    //    SharedModule
   ],   
    declarations: [
        MapLegend
    ],
    exports: [
    IonicModule,
    MapLegend
    ]
})
export class LegendModule { }