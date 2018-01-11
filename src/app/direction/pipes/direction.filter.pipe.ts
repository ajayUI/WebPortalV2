import { Pipe, PipeTransform } from '@angular/core';
import { DestinationService } from '../../service';
import { DirectionProcessor } from '../direction.processor';

// // Startup
// import
// {
//     AppState
// } from '../../startup';


@Pipe({
    name: 'directionFilter'
})
export class DirectionFilterPipe implements PipeTransform {

    constructor(
        public destinationService: DestinationService,
        public directionProcessor:DirectionProcessor
    ) {

    }

    transform(destinationTypeList: any, searchText: any): any[] {
               return destinationTypeList.filter((item) => {
                   return item[this.directionProcessor.selectedVisibleColumns[0]].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
               });    
        
           
    }
}