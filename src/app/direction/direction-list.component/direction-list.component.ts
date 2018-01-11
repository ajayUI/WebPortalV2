// Angular and Third Party Modules, Libs etc
import { Component, ViewChild } from '@angular/core';
import { NavParams, Platform, ModalController } from 'ionic-angular';

// Base
import
{
    ComponentBase,
    DirectionListModel,
    DirectionMenuModel,
    DirectionGridSettingModel,
    ResponseStatusType,
    AppConstant,
    LabelConstant,
    ValueConstant,
    ErrorMessageConstant,
    ModelMapper,
    QuickLinkModel,
    CommonHelper,
    MultiLingualTextModel
} from '../../base';

// Services and Processors
import { DestinationService } from '../../service';
import { DirectionProcessor } from '../direction.processor';

declare var jQuery: any;

@Component({
    selector: 'direction-list',
    templateUrl: 'direction-list.component.html'
})
export class DirectionListComponent extends ComponentBase
{

    public listTitle: string;
    public directionList: DirectionListModel[];
    public selectedDestination: DirectionListModel;
    public previousBackSelectedDestination: any = {};
    public menuCurrentLevel: number = 0;
    public menuList: DirectionMenuModel[];
    public childrenCount: any;
    public typeOfList: string;
    public listIcon: string;
    public toChangeView: number;
    public destinationLabel: string;
    public destinationList: any;
    public filteredList: any;
    public visibleColumns = [];
    public visibleColumnsWidth = [];
    public visibleColumnsAttributes = [];
    public showColumnNames: any[];
    public skipColumns: any;
    public columnDefs: any[];
    public listData = [];
    public currentLanguage: string;
    public isBackButtonVisible: boolean;
    public filterColumn: string;
    public filteredListLength: number;
    public isFilterData: boolean;
    public styleColumnData: any[] = ["Dept#", "Bldg#", "Room", "Building", "Details"];
    public showDirectionList: boolean;
    public detailPopupClass: string;
    public displayDataPopup: any;
    public viewDetailsButtonLanel: string;
    public toHideMenuCollection: any[]=[];
    public lastVisitedDirectionQuicklink:any;
    public menuLength:number;
    public searchDirection:string;

    public selectedMenuLabel:string;
    
    public previousMenuLabel:any={};
    public previousMenuLabelText:string;
    public showBackLabel:boolean;


    // public showPreviousLabelText:string;



    constructor(
        public navParams: NavParams,
        public destinationService: DestinationService,
        public platform: Platform,
        public directionProcessor: DirectionProcessor
    )
    {
        super();
        this.init();
        this.setupSubscriptions();
        
    }

    public init()
    {
        this.showDirectionList = true;
        this.listTitle = LabelConstant.DIRECTORY_TAB_TITLE;
        this.viewDetailsButtonLanel = LabelConstant.VIEW_DETAILS_BUTTON_LABEL;
        this.showBackLabel=false;
        this.searchDirection="";
        this.typeOfList = "MenuLabel";
        this.detailPopupClass = 'no-display';
        this.reset();
    }

    private setupSubscriptions()
    {
        // this.directionProcessor.isResetDirectoryList.subscribe(status =>
        // {
        //     if (status)
        //     {
        //         this.menuCurrentLevel = 0;
        //         this.showDirectionList = false;
        //         this.reset();
        //         setTimeout(() => { this.showDirectionList = true; }, 100);
        //     }
        // });

    }


    public reset()
    {
        this.isBackButtonVisible = true;
        this.isFilterData = true;
        this.toChangeView = 0;
        this.menuCurrentLevel = 0;
        this.previousMenuLabelText='';
        this.destinationService.getAllMockData()
        .subscribe(
        data => {
            this.destinationService.directionMenu = data.Response;
            this.getDirectionList();
        },
        err => {
            console.log("Oops no menu data found!");
        }
        );
    }

    public getDirectionList()
    {
        //this.currentLanguage = this.appState.language.getValue().toLowerCase();
        this.currentLanguage='english';
        this.menuList = ModelMapper.directionMenuListMap(this.destinationService.directionMenu);
       // this.getDirectionList();
         //= ModelMapper.directionMenuListMap(this.destinationService.directionMenu);


        //this.destinationService.directionsData[this.currentLanguage];
        //this.menuList = this.destinationService.directionMenu;
        let directionMenu = new DirectionMenuModel();

        let directionList = new DirectionListModel();
        directionList.parentId = 0;
        this.fillDirectory(directionList);
        this.setChildrenCount();
        this.selectedDestination = directionList;
        this.isMenuVisible(this.selectedDestination)
        //this.filterDataByKeyboard('');
    }

    public isMenuVisible(selectedDestination)
    {
        
        this.previousBackSelectedDestination[this.menuCurrentLevel] = selectedDestination;
        this.previousMenuLabel[this.menuCurrentLevel] = '';

       //this.directionProcessor.lastBackSelectedDestination[this.menuCurrentLevel] = selectedDestination;

        this.menuLength = selectedDestination.direction.length;
        if (selectedDestination.direction.length == 1)
        {
            let Id = this.selectedDestination.direction[0].id;
            let clickId = this.selectedDestination.direction[0].clickId;
            let parentId = this.selectedDestination.direction[0].parentId;
            let displayOrder = this.selectedDestination.direction[0].displayOrder;
            let menuLabel = this.selectedDestination.direction[0].menuLabel;
            //   this.currentDirectoryObject = { Id: Id, clickId: clickId, parentId: parentId, DisplayOrder: DisplayOrder, menuLabel: menuLabel }
            this.goToDirectory(Id, clickId, parentId, displayOrder, menuLabel, false)
            this.isBackButtonVisible = false;
            //this.directionProcessor.backButtonINMenuIfSingleLevel = false;

        }
        else
        {
            this.isBackButtonVisible = false;
           // this.directionProcessor.backButtonINMenuIfSingleLevel = false;
            let menuLngth = this.selectedDestination.direction.length;
            for (let menuList = 0; menuList < menuLngth; menuList++)
            {

                if (this.selectedDestination.direction[menuList].menuLabel)
                {
                    this.selectedDestination.direction[menuList].menuLabel = new MultiLingualTextModel(this.selectedDestination.direction[menuList].menuLabel);

                }

            }

        }

    }

    public goToDirectory(id: number, clickId: number, parentId: number, DisplayOrder: number, menuLabel: string, isShowMenu: boolean,lastDestination:boolean=false): void
    {
        if(this.menuLength>1)
        {
           // this.appState.setAppDirtyAndResetTimer();         
        }
        this.showBackLabel = false;
        this.directionProcessor.lastVisitedId = id;
        this.directionProcessor.lastVisitedClickId = clickId;
        this.directionProcessor.lastVisitedParentId = parentId;
        this.directionProcessor.lastVisitedDisplayOrder = DisplayOrder;
        this.directionProcessor.lastVisitedMenuLabel = menuLabel;
        this.directionProcessor.lastVisitedIsShowMenu = isShowMenu;

         if(!lastDestination)
        {
        this.menuCurrentLevel = this.menuCurrentLevel + 1;
        }
        this.directionProcessor.toDestinationLabel = menuLabel;
        this.selectedMenuLabel = menuLabel;
        this.toChangeView = 1;
        this.listIcon = "list";


        let list = new DirectionListModel();
        list.parentId = id;
        this.fillDirectory(list);
        this.selectedDestination = list;
        this.previousBackSelectedDestination[this.menuCurrentLevel] = this.selectedDestination;
        this.previousMenuLabel[this.menuCurrentLevel] = menuLabel;


        if(!lastDestination)
        {
                this.directionProcessor.lastBackSelectedDestination[this.menuCurrentLevel] = 
                this.selectedDestination;
        
        }
 
        if (isShowMenu)
        {
            this.toChangeView = 0;

        }
        else
        {
            this.toChangeView = 1;
        }

        this.isBackButtonVisible = true;
        this.directionProcessor.backButtonINMenuIfSingleLevel = true;
        if (this.selectedDestination.direction.length > ValueConstant.ARRAY_EMPTY_LENGTH)
        {

            let menuLength = this.selectedDestination.direction.length;
            for (let menuSubList = 0; menuSubList < menuLength; menuSubList++)
            {

                if (this.selectedDestination.direction[menuSubList].menuLabel)
                {

                    this.selectedDestination.direction[menuSubList].menuLabel = new MultiLingualTextModel(this.selectedDestination.direction[menuSubList].menuLabel);

                }
            }

        }
        else
        {
            this.toChangeView = DisplayOrder;
            this.listIcon = "icon";
            let destinationTypeObject = null;
            this.menuList.forEach(element =>
            {
                if (element.clickId == clickId)
                {
                    destinationTypeObject = element;
                    return false;
                }
            });


            if (destinationTypeObject)
            {
                this.destinationList = [];

                destinationTypeObject.destinations.forEach(element =>
                {
                    if (element.Language == undefined)
                    {
                        element.Language = "English";
                    }
                    if (element.Language.toLowerCase() == this.currentLanguage)
                    {
                        if (element.Language.toLowerCase() == this.currentLanguage)
                        {
                            this.destinationList.push(JSON.parse(JSON.stringify(element)));
                            return false;
                        }
                    }
                });
                this.filteredList = this.destinationList;
                //this.destinationLabel = menuLabel;
                this.destinationLabel = new MultiLingualTextModel(menuLabel).translatedText;
                this.typeOfList = "List";
                this.visibleColumns = destinationTypeObject.visibleColumnNames.split(',');
                this.directionProcessor.selectedVisibleColumns = this.visibleColumns;
                
                this.destinationService.selectedDirectionVisibleColumns.next(this.visibleColumns);

                this.visibleColumnsAttributes = destinationTypeObject.visibleColumnAttributes;
                //console.log('visible column attributes : ' + JSON.stringify(this.visibleColumnsAttributes));
                this.visibleColumnsWidth = [];


                if (!(JSON.stringify(this.visibleColumnsAttributes) === JSON.stringify({})))
                {
                    for (let widthColumn = 0; widthColumn < this.visibleColumns.length; widthColumn++)
                    {
                        //console.log(widthColumn);
                        // console.log("width for each column : " + this.visibleColumns[widthColumn] + " ::::: "+ this.visibleColumnsAttributes[this.visibleColumns[widthColumn]].DisplayWidth);
                        if (this.visibleColumnsAttributes[this.visibleColumns[widthColumn]].DisplayWidth)
                        {
                            this.visibleColumnsWidth.push(this.visibleColumnsAttributes[this.visibleColumns[widthColumn]].DisplayWidth);
                        }
                    }
                }

                let coulmn = [];
                this.showColumnNames = [];
                let ClassName;
                let columnLength = this.styleColumnData.length;
                let lengthOfDestinations = this.destinationList.length;
                for (let i = 0; i < lengthOfDestinations; i++)
                {

                    for (let j = 0; j < columnLength; j++)
                    {
                        let columnKey = this.styleColumnData[j];

                        //let columnClassName = columnKey.charAt(0).toLowerCase();
                        let columnClassName = columnKey.toLowerCase();

                        if (columnKey == "Details")
                        {
                            //console.log("In details : " + this.destinationList[i][columnKey]);
                            if (this.destinationList[i][columnKey] && this.destinationList[i][columnKey].length > 70)
                            {
                                this.destinationList[i][columnKey] = "<div class='detail-text'>" + this.destinationList[i][columnKey] + "</div><span class='button-detail'>" + this.viewDetailsButtonLanel + "</span>";

                            }
                        }

                        if (this.destinationList[i][columnKey] && this.destinationList[i][columnKey].indexOf('<span') == -1)
                        {
                            if (this.destinationList[i][columnKey].toLowerCase().indexOf('ci_') != -1)
                            {
                                ClassName = this.destinationList[i][columnKey].split('_')[1].toLowerCase();
                                this.destinationList[i][columnKey] = "<span class='destinations-icon icon-" + ClassName + "'></span>";
                            }
                            else
                            {
                                ClassName = columnClassName;
                                this.destinationList[i][columnKey] = "<span class='map-style-icon-suite icon-" + ClassName + "'>" + this.destinationList[i][columnKey] + "</span>";
                            }
                        }
                    }
                }


                for (let key in this.destinationList)
                {
                    for (let innerKey in this.destinationList[key])
                    {
                        if ((innerKey != 'Building') && (innerKey != 'Suite') && (innerKey != 'Room') && (innerKey != 'ID') && (innerKey != 'quicklink') && (innerKey != 'Room  Number') && (innerKey != 'Dept#') && (innerKey != 'Bldg#'))
                        {
                            if (this.destinationList[key][innerKey])
                            {
                            }
                        }
                    }
                    //}
                }


                this.skipColumns = ['ID', 'quicklink', 'ShowDisplayText', 'DisplayText', 'Details', 'Language', 'Tags'];
                let visibleColumnLength = this.visibleColumns.length;
                for (var j = 0; j < this.visibleColumns.length; j++)
                {
                    var firstColumn = true;

                    let gridSetting = new DirectionGridSettingModel();
                    gridSetting.headerName = this.visibleColumns[j];
                    gridSetting.field = this.visibleColumns[j];
                    gridSetting.cellRenderer = function (params)
                    {      // Function cell renderer
                        return params.value;
                    };
                    //console.log("Column width : " + this.visibleColumnsWidth[j]);
                    gridSetting.width = this.visibleColumnsWidth[j];


                    this.showColumnNames.push(gridSetting);
                }
                for (let j = 0, len = this.showColumnNames.length; j < len; j++)
                {
                    this.showColumnNames[j].headerName = new MultiLingualTextModel(this.showColumnNames[j].headerName).translatedText;
                }
                this.listData = this.destinationList;
                this.columnDefs = this.showColumnNames;
                this.toChangeView = 1;
            }
        }
      
    }
    
    fillDirectory(list: DirectionListModel)
    {
        this.menuList.forEach(element =>
        {
            if (element.parentId == list.parentId)
            {
                if (this.toHideMenuCollection.indexOf(element.menuLabel) == -1)
                {
                    let directionMenu = new DirectionMenuModel();
                    directionMenu.id = element.id;
                    directionMenu.parentId = element.parentId;
                    directionMenu.actionId = element.actionId;
                    directionMenu.clickId = element.clickId;
                    directionMenu.displayOrder = element.displayOrder;
                    directionMenu.menuLabel = element.menuLabel;
                    directionMenu.visibleColumnNames = element.visibleColumnNames;
                    directionMenu.visibleColumnAttributes = element.visibleColumnAttributes;
                    directionMenu.destinations = element.destinations;

                    list.direction.push(directionMenu);
                    return false;
                }
            }
        });


        this.filteredList = list.direction;
        this.typeOfList = "MenuLabel";

        //localStorage.removeItem('filteredData');
        localStorage.setItem('filteredData', JSON.stringify(list.direction));
    }

    setChildrenCount(reload: boolean = false)
    {
        if (!this.childrenCount || this.childrenCount.length == 0 || reload)
        {
            this.childrenCount = {};
            this.menuList.forEach(element =>
            {
                this.childrenCount[element.parentId] = (this.childrenCount[element.parentId] || 0) + 1;
            });
        }
    }

    private onRowClicked($event)
    {
        // let QuickLinkAndDestinationTitle = new QuickLinkModel($event.node.data.quicklink, $event.node.data[this.showColumnNames[0].field]);
        // this.appState.setAppDirtyAndResetTimer();
        // this.directionProcessor.getDirectionsBetweenQuicklinks
        //     (this.kioskConfig.location, QuickLinkAndDestinationTitle);
        // let screentype = 'DIRECTORY';
        // let eventtype = 'DESTINATIONCLICK';
        // this.directionProcessor.sendReportLogData(screentype, eventtype, QuickLinkAndDestinationTitle.toDestinationTitle, QuickLinkAndDestinationTitle.quicklink);
    }

    public changeView(lastDestination)
    {
        this.showBackLabel = true;
        this.selectedMenuLabel='';

        this.searchDirection='';
        if(this.directionProcessor.backButtonEnableFromDirectonSteps)
        {
            lastDestination = this.directionProcessor.lastBackSelectedDestination;
        }
        
        if(lastDestination)
        {
            this.menuCurrentLevel = this.directionProcessor.lastVisitedMenuLevel;
        }
        this.menuCurrentLevel = this.menuCurrentLevel - 1;
        this.directionProcessor.backButtonEnableFromDirectonSteps=false;
        if (this.menuCurrentLevel == 0)
        {
            this.previousMenuLabelText='';
            //this.appState.setAppDirtyAndResetTimer();
            this.toChangeView = 0;
            this.getDirectionList();
        }
        else
        {
            if(lastDestination)
            {
                this.selectedDestination = lastDestination[this.menuCurrentLevel];
                this.previousMenuLabelText=this.previousMenuLabel[this.menuCurrentLevel].translatedText;
             }
            else
                {
            this.selectedDestination = this.previousBackSelectedDestination[this.menuCurrentLevel];
            this.previousMenuLabelText=this.previousMenuLabel[this.menuCurrentLevel].translatedText;


            }

            //this.appState.setAppDirtyAndResetTimer();
            this.toChangeView = 0;
            this.isBackButtonVisible = true;
            this.directionProcessor.backButtonINMenuIfSingleLevel = true;
            // if (this.selectedDestination.direction.length > ValueConstant.ARRAY_EMPTY_LENGTH)
            // {
            //     let menuLength = this.selectedDestination.direction.length;
            //     for (let menuSubList = 0; menuSubList < menuLength; menuSubList++) {

            //         if(this.selectedDestination.direction[menuSubList].menuLabel)
            //         {
            //              console.log('MenuLabel:'+this.selectedDestination.direction[menuSubList].menuLabel);
            //             this.selectedDestination.direction[menuSubList].menuLabel =  new MultiLingualTextModel(this.selectedDestination.direction[menuSubList].menuLabel);
            //         }
            //     }
            // }
        }

    }
    
        ngAfterViewInit()
        {
        // let backFromDirectionStepsSubscriber =
                
        // this.directionProcessor.backFromDirectionStepsToMenus.subscribe(status =>
        // {
        //     if (status == true || status == false)
        //     {

        //            this.goToDirectory(this.directionProcessor.lastVisitedId, this.directionProcessor.lastVisitedClickId, this.directionProcessor.lastVisitedParentId, this.directionProcessor.lastVisitedDisplayOrder, this.directionProcessor.lastVisitedMenuLabel, this.directionProcessor.lastVisitedIsShowMenu,true);

        //            this.directionProcessor.backButtonEnableFromDirectonSteps=true;
                   
             
        //     }
        // });
        // this.subscriptions.push(backFromDirectionStepsSubscriber);
        }


    public getDirection(direction)
    {
        // alert(direction.quicklink);
        // alert(direction[this.visibleColumns[0]]);

        this.destinationService.directionUpdateFromDirectionList.next(direction);
    }

    public showDetailPopup(event)
    {
        var target = event.target || event.srcElement || event.currentTarget;
        var currentItem = target.closest('ion-item');
        var currentTitle="";
        if(currentItem.attributes.title)
        {
         currentTitle=currentItem.attributes.title.nodeValue;
        }

        if(currentTitle!="opened")
        {
            target.setAttribute('name','arrow-dropup-circle');
            target.classList.remove('ion-md-arrow-dropdown-circle');
            target.classList.add('ion-md-arrow-dropup-circle');
            currentItem.setAttribute("title", "opened");
        }
        else
        {
            target.setAttribute('name','arrow-dropdown-circle');
            target.classList.remove('ion-md-arrow-dropup-circle');
            target.classList.add('ion-md-arrow-dropdown-circle');
            currentItem.setAttribute("title", "closed");
        }
    }    


    
    public get toLabel(): string
    {
        return LabelConstant.TO_LABEL;
    }
    public get backButtonLabel(): string
    {
        return LabelConstant.BACK_BUTTON_LABEL;
    }
    public get noResultFound(): string
    {
        return LabelConstant.NO_RESULT_FOUND;
    }
        public get directoryLabel(): string
    {
        return LabelConstant.DIRECTORY_HEADING;
    }


    filterItems(){
        let searchTerm = this.searchDirection;
        console.log(searchTerm);
               return this.filteredList.filter((item) => {
                   return item[this.visibleColumns[0]].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
               });    
        
           }
    public clearSearchFilter()
    {
        this.searchDirection='';
    }


    public goToMainMenu()
    {
        this.reset();
    }
}


