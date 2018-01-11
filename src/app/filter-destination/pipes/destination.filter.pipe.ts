import { Pipe, PipeTransform } from '@angular/core';
import { DestinationService } from '../../service';

// // Startup
// import
// {
//     AppState
// } from '../../startup';


// Base
import {
    DirectorySearchedText,
    FilterDestinationByMenuLabel
} from '../../base';
import { prepareProfile } from 'selenium-webdriver/firefox';



@Pipe({
    name: 'destinationFilter'
})
export class DestinationFilterPipe implements PipeTransform {

    // private previousMenuLabel:string=''; 
    // private flag:boolean=false; 
    constructor(
        public destinationService: DestinationService
    ) {

    }

    transform(destinationTypeList: any, searchText: any): FilterDestinationByMenuLabel[] {
        //let filter = args[0].toLocaleLowerCase();
        let filterData: DirectorySearchedText[] = [];

        if (searchText && searchText.length > 1) {
            destinationTypeList.filter((destType) => {
                let filterColumnNames = destType.VisibleColumnNames;
                let menuLabel = '';
                if (destType.Destinations['english']) {
                    destType.Destinations['english'].filter((dest) => {
                        menuLabel = destType.MenuLabel;
                        //for (let index = 0; index < filterColumnNames.length; index++) {
                        for (let index = 0; index <= 1; index++) { //0 for tags and 1 for first visible column
                            let data = new DirectorySearchedText();
                            if (dest[filterColumnNames[index]] && filterColumnNames[index] == 'Tags') {
                                let getTags = [];
                                getTags = dest.Tags.split(',').filter((tg) => {
                                    let dataBySpace = [];
                                    let dataArrayBySpace = tg.split(/[ ]+/);
                                    while (dataArrayBySpace.length > 0) {
                                        var stringToMatch = dataArrayBySpace.join(' ');
                                        if (stringToMatch.trim().toLocaleLowerCase().startsWith(searchText.trim().toLocaleLowerCase())) {
                                            dataBySpace.push(dest[filterColumnNames[index]]);
                                            break;
                                        }
                                        dataArrayBySpace.splice(0, 1);
                                    }
                                    return dataBySpace && dataBySpace.length > 0;
                                });
                                if (getTags && getTags.length > 0) {
                                    data.TagName = getTags.join(',');
                                    data.IsSearchByTag = true;
                                    data.Id = dest.ID;
                                    data.quicklink = dest.quicklink;
                                    data.SearchedData = dest[filterColumnNames[1]];
                                    data.MenuLabel = menuLabel;
                                    filterData.push(data);
                                    break;
                                }
                            }
                            else
                                if (dest[filterColumnNames[index]] && dest[filterColumnNames[index]].toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) != -1 && dest[filterColumnNames[index]].toLocaleLowerCase().indexOf('ci_') == -1)
                                {
                                    let dataBySpace = [];
                                    let dataArrayBySpace = dest[filterColumnNames[index]].split(/[ ]+/);
                                    while (dataArrayBySpace.length > 0) {
                                        var stringToMatch = dataArrayBySpace.join(' ');
                                        if (stringToMatch.trim().toLocaleLowerCase().startsWith(searchText.trim().toLocaleLowerCase())) {
                                            dataBySpace.push(dest[filterColumnNames[index]]);
                                            break;
                                        }
                                        dataArrayBySpace.splice(0, 1);
                                    }
                                    if (dataBySpace && dataBySpace.length > 0 && filterColumnNames[index] != 'Tags') {
                                        data.IsSearchByTag = false;
                                        data.TagName = '';
                                        data.Id = dest.ID;
                                        data.quicklink = dest.quicklink;
                                        data.SearchedData = dest[filterColumnNames[index]];
                                        data.MenuLabel = menuLabel;
                                        filterData.push(data);
                                        break;
                                    }

                                }
                        }

                    });
                }
            });
        }
        return this.filterDataByMenuLabel(filterData);
        //this.destinationService.directoryFilteredDataBySearchText = filterData;
        //return filterData;
    }


    filterDataByMenuLabel(filterData) {
        let filterDataByCategory: FilterDestinationByMenuLabel[] = [];
        let filteredDataDictionary = {};

        filterData.forEach(element => {
            if (!filteredDataDictionary[element.MenuLabel]) {
                filteredDataDictionary[element.MenuLabel] = [];
            }
            filteredDataDictionary[element.MenuLabel].push(element);
        });

        Object.keys(filteredDataDictionary).forEach(element => {
            let menu = new FilterDestinationByMenuLabel();
            menu.Category = element;
            menu.FilteredData = filteredDataDictionary[element];
            filterDataByCategory.push(menu);
        })

        return filterDataByCategory;
    }

}

export class DirectoryListFilteredByLanguageViewModel {

    public MenuLabelKeys: any;

    public MenuLabelDictionary: any;
}