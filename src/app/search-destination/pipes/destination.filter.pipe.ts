import { Pipe, PipeTransform } from '@angular/core';
import { DirectorySearchedText } from '../model/directory.searchtext.model';
import { DestinationService } from '../../service';

// // Startup
// import
// {
//     AppState
// } from '../../startup';


@Pipe({
    name: 'destinationFilter'
})
export class DestinationFilterPipe implements PipeTransform {

    constructor(
        public destinationService: DestinationService
    ) {

    }

    transform(destinationTypeList: any, searchText: any): DirectorySearchedText[] {
        //let filter = args[0].toLocaleLowerCase();
        let filterData: DirectorySearchedText[] = [];
        if (searchText && searchText.length > 1) {
            destinationTypeList.filter((destType) => {
                let filterColumnNames = destType.VisibleColumnNames;
                if (destType.Destinations['english']) {
                destType.Destinations['english'].filter((dest) => {
                    //for (let index = 0; index < filterColumnNames.length; index++) {
                    for (let index = 0; index <= 1; index++) { //0 for tags and 1 for first visible column
                        let data = new DirectorySearchedText();
                        if (dest[filterColumnNames[index]] && filterColumnNames[index] == 'Tags') {
                            let getTags = [];
                            getTags = dest.Tags.split(',').filter((tg) => {
                                let dataBySpace=[];
                                let dataArrayBySpace = tg.split(/[ ]+/);
                                while (dataArrayBySpace.length > 0) {
                                        var stringToMatch = dataArrayBySpace.join(' ');
                                        if (stringToMatch.trim().toLocaleLowerCase().startsWith(searchText.trim().toLocaleLowerCase())) {
                                            dataBySpace.push(dest[filterColumnNames[index]]);
                                            break;
                                        }
                                        dataArrayBySpace.splice(0, 1);
                                    }
                                // tg.split(/[ ]+/).filter((tgSpace)=>{
                                //      return tgSpace.trim().toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());
                                // });
                                return dataBySpace && dataBySpace.length>0;
                                //let getTags = dest.Tags.split('[,]{1}[\\s]?').filter((tg) => {
                                // return tg.trim().toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());
                                // return tg.trim().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase())!=-1;
                            });
                            if (getTags && getTags.length > 0) {
                                data.TagName = getTags.join(',');
                                data.IsSearchByTag = true;
                                data.Quicklink = dest.quicklink;
                                data.SearchedData = dest[filterColumnNames[1]];
                                filterData.push(data);
                                break;
                            }
                        }
                        else
                        if (dest[filterColumnNames[index]] && dest[filterColumnNames[index]].toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase())!=-1 && dest[filterColumnNames[index]].toLocaleLowerCase().indexOf('ci_') == -1)
                            // if (dest[filterColumnNames[index]] && dest[filterColumnNames[index]].toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase()) && dest[filterColumnNames[index]].toLocaleLowerCase().indexOf('ci_') == -1)
                             {
                                let dataBySpace = [];
                                let dataArrayBySpace = dest[filterColumnNames[index]].split(/[ ]+/);
                                while (dataArrayBySpace.length > 0) {
                                    var stringToMatch=dataArrayBySpace.join(' ');
                                    if (stringToMatch.trim().toLocaleLowerCase().startsWith(searchText.trim().toLocaleLowerCase())) {
                                        dataBySpace.push(dest[filterColumnNames[index]]);
                                        break;
                                    }
                                    dataArrayBySpace.splice(0, 1);
                                }
                                // let dataBySpace=dest[filterColumnNames[index]].split(/[ ]+/).filter((spaceData)=>{
                                //      return spaceData.trim().toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase());
                                // });
                                if (dataBySpace && dataBySpace.length>0 && filterColumnNames[index] != 'Tags') {
                                    data.IsSearchByTag = false;
                                    data.TagName = '';
                                    data.Quicklink = dest.quicklink;
                                    data.SearchedData = dest[filterColumnNames[index]];
                                    filterData.push(data);
                                    break;
                                }

                            }
                    }

                });
                }
            });
        }
        this.destinationService.directoryFilteredDataBySearchText = filterData;
        return filterData;
    }
}