// Angular and Third Party Modules, Libs etc
import { Subscription } from 'rxjs/Rx';

// Base
import { MultiLingualTextModel } from '../model/base/multi-lingual-text.model';

// Constants
import { ValueConstant } from './value.constant';

// Services
//import { LanguageService } from '../../service';

// Startup
//import { AppState } from '../../startup';

export class LabelConstant
{
    public static _language: string;

    private static _backButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Back');
    private static _btnSendEmailCaps: MultiLingualTextModel = new MultiLingualTextModel('SEND EMAIL');
    private static _buildingColumnTitle: MultiLingualTextModel = new MultiLingualTextModel('Building');
    private static _buttonLabelHome: MultiLingualTextModel = new MultiLingualTextModel("Home");
    private static _buttonLabelMainMenu: MultiLingualTextModel = new MultiLingualTextModel('Main Menu');
    private static _buttonLabelYes: MultiLingualTextModel = new MultiLingualTextModel("Yes");
    private static _destinationPopupMessage: MultiLingualTextModel = new MultiLingualTextModel("Directions are unavailable for this Destination");
    private static _directionLoaderMessage: MultiLingualTextModel = new MultiLingualTextModel("Directions are loading, please wait...");
    private static _directoryHeading: MultiLingualTextModel = new MultiLingualTextModel('Directory');
    private static _directoryTabTitle: MultiLingualTextModel = new MultiLingualTextModel('Directory');
    private static _emailPlaceholderText: MultiLingualTextModel = new MultiLingualTextModel("Enter Email Address Here");
    private static _errorGettingEventsErrorMessage: MultiLingualTextModel = new MultiLingualTextModel("Oops!!! could not load events");
    private static _eventColumnTitle: MultiLingualTextModel = new MultiLingualTextModel("Event");
    private static _eventDetailTitle: MultiLingualTextModel = new MultiLingualTextModel('Event Detail');
    private static _eventLoaderMessage: MultiLingualTextModel = new MultiLingualTextModel("Events are loading, Please Wait...");
    private static _getDirectionButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Get Directions');
    private static _homeTabTitle: MultiLingualTextModel = new MultiLingualTextModel('Home');
    private static _initialingApplicationMessage: MultiLingualTextModel = new MultiLingualTextModel("Setting up the environment for Kiosk");
    private static _isEmailIdBlank: MultiLingualTextModel = new MultiLingualTextModel('Enter your email');
    private static _labelName: MultiLingualTextModel = new MultiLingualTextModel('Name');
    private static _labelSearchForService: MultiLingualTextModel = new MultiLingualTextModel('Search for Services');
    private static _labelsearchInput: MultiLingualTextModel = new MultiLingualTextModel('What are you looking for?');
    private static _mapLoader: MultiLingualTextModel = new MultiLingualTextModel("Map is loading ...");
    private static _monthlyEventsTabTitle: MultiLingualTextModel = new MultiLingualTextModel('Monthly Calendar');
    private static _nextButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Next');
    private static _nextMonthButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Next Month');
    private static _noDirectionMessage: MultiLingualTextModel = new MultiLingualTextModel('Directions not available for this event');
    private static _noEventsMessage: MultiLingualTextModel = new MultiLingualTextModel('There are no events');
    private static _noMatchingText: MultiLingualTextModel = new MultiLingualTextModel('No matching results');
    private static _noPortalParametersErrorMessage: MultiLingualTextModel = new MultiLingualTextModel("Oops!!! portal parmeters are not loaded yet.");
    private static _noResultFound: MultiLingualTextModel = new MultiLingualTextModel('No results found');
    private static _ofLabel: MultiLingualTextModel = new MultiLingualTextModel("of");
    private static _playingLabel: MultiLingualTextModel = new MultiLingualTextModel('Playing');
    private static _previousButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Previous');
    private static _previousMonthButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Previous Month');
    private static _printButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Print');
    private static _replayMapButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Replay Map');
    private static _requiredEmailIdMessage: MultiLingualTextModel = new MultiLingualTextModel('Email Id is required');
    private static _InvalidEmailIdMessage: MultiLingualTextModel = new MultiLingualTextModel('Enter valid Email Id')
    private static _requiredEmailLength: MultiLingualTextModel = new MultiLingualTextModel('The username must have at least 5 characters');
    private static _sameDestinationPopupMessage: MultiLingualTextModel = new MultiLingualTextModel("You are already at your destination");
    private static _searchButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Search');
    private static _sendEmailButtonLabel: MultiLingualTextModel = new MultiLingualTextModel('Send as e-mail');
    private static _stepLabel: MultiLingualTextModel = new MultiLingualTextModel("Step");
    private static _stepNavigatingText: MultiLingualTextModel = new MultiLingualTextModel('Loading Directions');
    private static _suiteColumnTitle: MultiLingualTextModel = new MultiLingualTextModel('Room');
    private static _timeColumnTitle: MultiLingualTextModel = new MultiLingualTextModel('Time');
    private static _timeoutPopupHeading: MultiLingualTextModel = new MultiLingualTextModel("Do you need more time?");
    private static _todaysTabTitle: MultiLingualTextModel = new MultiLingualTextModel("Today's Events");
    private static _toLabel: MultiLingualTextModel = new MultiLingualTextModel("To");
    private static _searchInputPlaceholder: MultiLingualTextModel = new MultiLingualTextModel("What are you looking for ?");

     private static _viewDetailsButtonLanel: MultiLingualTextModel = new MultiLingualTextModel("View Details");



     public static _no_directionsAvailablePopupMessage: MultiLingualTextModel = new MultiLingualTextModel("Directions are not available for this destination, please see the details below for more information");

     public static _printMapLabel: MultiLingualTextModel = new MultiLingualTextModel("Print Map");
     
     public static _LocationLabel: MultiLingualTextModel = new MultiLingualTextModel("Location");
     

     public static _NoInternetConnectionLabel:MultiLingualTextModel = new MultiLingualTextModel("There is no internet connection");


     public static _PrintPopupCampusMapLabel:MultiLingualTextModel = new MultiLingualTextModel("Map will print below. This will just take a moment, please wait");


     public static _OnDirectionStepsIdlePopup:MultiLingualTextModel = new MultiLingualTextModel("Would you like a copy of these directions?");


     public static _CampusMapInstructionsHeading:MultiLingualTextModel = new MultiLingualTextModel("Instructions");

     public static _CampusMapInstructionsTextLineOne:MultiLingualTextModel = new MultiLingualTextModel("Choose a map from the list");

     public static _CampusMapInstructionsTextLineTwo:MultiLingualTextModel = new MultiLingualTextModel("Pinch to zoom and drag to move the map");

     public static _CampusMapInstructionsTextLineThree:MultiLingualTextModel = new MultiLingualTextModel("Touch the Print Map button to print visible area");


     public static _LiveConnectPageLabel:MultiLingualTextModel = new MultiLingualTextModel("Live Connect");
     

     public static get BACK_BUTTON_LABEL(): string
    {
        return LabelConstant._backButtonLabel[LabelConstant._language];
    }
    public static get BTN_SEND_EMAIL_CAPS(): string
    {
        return LabelConstant._btnSendEmailCaps[LabelConstant._language];
    }
    public static get BUILDING_COLUMN_TITLE(): string
    {
        return LabelConstant._buildingColumnTitle[LabelConstant._language];
    }
    public static get BUTTON_LABEL_HOME(): string
    {
        return LabelConstant._buttonLabelHome[LabelConstant._language];
    }
    public static get BUTTON_LABEL_MAIN_MENU(): string
    {
        return LabelConstant._buttonLabelMainMenu[LabelConstant._language];
    }
    public static get BUTTON_LABEL_YES(): string
    {
        return LabelConstant._buttonLabelYes[LabelConstant._language];
    }
    public static get DESTINATION_POPUP_MESSAGE(): string
    {
        return LabelConstant._destinationPopupMessage[LabelConstant._language];
    }
    public static get DIRECTION_LOADER_MESSAGE(): string
    {
        return LabelConstant._directionLoaderMessage[LabelConstant._language];
    }
    public static get DIRECTORY_HEADING(): string
    {
        return LabelConstant._directoryHeading[LabelConstant._language];
    }

    public static get DIRECTORY_TAB_TITLE(): string
    {
        return LabelConstant._directoryTabTitle[LabelConstant._language];
    }
    public static get EMAIL_PLACEHOLDER_TEXT(): string
    {
        return LabelConstant._emailPlaceholderText[LabelConstant._language];
    }
    public static get ERROR_GETTING_EVENTS_ERROR_MESSAGE(): string
    {
        return LabelConstant._errorGettingEventsErrorMessage[LabelConstant._language];
    }
    public static get EVENT_COLUMN_TITLE(): string
    {
        return LabelConstant._eventColumnTitle[LabelConstant._language];
    }
    public static get EVENT_DETAIL_TITLE(): string
    {
        return LabelConstant._eventDetailTitle[LabelConstant._language];
    }
    public static get EVENT_LOADER_MESSAGE(): string
    {
        return LabelConstant._eventLoaderMessage[LabelConstant._language];
    }
    public static get GET_DIRECTION_BUTTON_LABEL(): string
    {
        return LabelConstant._getDirectionButtonLabel[LabelConstant._language];
    }
    public static get HOME_TAB_TITLE(): string
    {
        return LabelConstant._homeTabTitle[LabelConstant._language];
    }
    public static get INITIALING_APPLICATION_MESSAGE(): string
    {
        return LabelConstant._initialingApplicationMessage[LabelConstant._language];
    }
    public static get IS_EMAIL_ID_BLANK(): string
    {
        return LabelConstant._isEmailIdBlank[LabelConstant._language];
    }
    public static get LABEL_NAME(): string
    {
        return LabelConstant._labelName[LabelConstant._language];
    }
    public static get LABEL_SEARCH_FOR_SERVICE(): string
    {
        return LabelConstant._labelSearchForService[LabelConstant._language];
    }
    public static get LABELSEARCH_INPUT(): string
    {
        return LabelConstant._labelsearchInput[LabelConstant._language];
    }
    public static get MAP_LOADER(): string
    {
        return LabelConstant._mapLoader[LabelConstant._language];
    }
    public static get MONTHLY_EVENTS_TAB_TITLE(): string
    {
        return LabelConstant._monthlyEventsTabTitle[LabelConstant._language];
    }
    public static get NEXT_BUTTON_LABEL(): string
    {
        return LabelConstant._nextButtonLabel[LabelConstant._language];
    }
    public static get NEXT_MONTH_BUTTON_LABEL(): string
    {
        return LabelConstant._nextMonthButtonLabel[LabelConstant._language];
    }
    public static get NO_DIRECTION_MESSAGE(): string
    {
        return LabelConstant._noDirectionMessage[LabelConstant._language];
    }
    public static get NO_EVENTS_MESSAGE(): string
    {
        return LabelConstant._noEventsMessage[LabelConstant._language];
    }
    public static get NO_MATCHING_TEXT(): string
    {
        return LabelConstant._noMatchingText[LabelConstant._language];
    }
    public static get NO_PORTAL_PARAMETERS_ERROR_MESSAGE(): string
    {
        return LabelConstant._noPortalParametersErrorMessage[LabelConstant._language];
    }
    public static get NO_RESULT_FOUND(): string
    {
        return LabelConstant._noResultFound[LabelConstant._language];
    }
    public static get OF_LABEL(): string
    {
        return LabelConstant._ofLabel[LabelConstant._language];
    }
    public static get PLAYING_LABEL(): string
    {
        return LabelConstant._playingLabel[LabelConstant._language];
    }
    public static get PREVIOUS_BUTTON_LABEL(): string
    {
        return LabelConstant._previousButtonLabel[LabelConstant._language];
    }
    public static get PREVIOUS_MONTH_BUTTON_LABEL(): string
    {
        return LabelConstant._previousMonthButtonLabel[LabelConstant._language];
    }
    public static get PRINT_BUTTON_LABEL(): string
    {
        return LabelConstant._printButtonLabel[LabelConstant._language];
    }
    public static get REPLAY_MAP_BUTTON_LABEL(): string
    {
        return LabelConstant._replayMapButtonLabel[LabelConstant._language];
    }
    public static get REQUIRED_EMAIL_ID_MESSAGE(): string
    {
        return LabelConstant._requiredEmailIdMessage[LabelConstant._language];
    }
    public static get INVALID_EMAILID_MESSAGE(): string
    {
        return LabelConstant._InvalidEmailIdMessage[LabelConstant._language];
    }

    public static get REQUIRED_EMAIL_LENGTH(): string
    {
        return LabelConstant._requiredEmailLength[LabelConstant._language];
    }
    public static get SAME_DESTINATION_POPUP_MESSAGE(): string
    {
        return LabelConstant._sameDestinationPopupMessage[LabelConstant._language];
    }
    public static get SEARCH_BUTTON_LABEL(): string
    {
        return LabelConstant._searchButtonLabel[LabelConstant._language];
    }
    public static get SEND_EMAIL_BUTTON_LABEL(): string
    {
        return LabelConstant._sendEmailButtonLabel[LabelConstant._language];
    }
    public static get STEP_LABEL(): string
    {
        return LabelConstant._stepLabel[LabelConstant._language];
    }
    public static get STEP_NAVIGATING_TEXT(): string
    {
        return LabelConstant._stepNavigatingText[LabelConstant._language];
    }
    public static get SUITE_COLUMN_TITLE(): string
    {
        return LabelConstant._suiteColumnTitle[LabelConstant._language];
    }
    public static get TIME_COLUMN_TITLE(): string
    {
        return LabelConstant._timeColumnTitle[LabelConstant._language];
    }
    public static get TIMEOUT_POPUP_HEADING(): string
    {
        return LabelConstant._timeoutPopupHeading[LabelConstant._language];
    }
    public static get TODAYS_TAB_TITLE(): string
    {
        return LabelConstant._todaysTabTitle[LabelConstant._language];
    }
    public static get TO_LABEL(): string
    {
        return LabelConstant._toLabel[LabelConstant._language];
    }
    public static get SEARCH_INPUT_POLACEHOLDER(): string
    {
        return LabelConstant._searchInputPlaceholder[LabelConstant._language];
    }

    public static get VIEW_DETAILS_BUTTON_LABEL(): string
    {
        return LabelConstant._viewDetailsButtonLanel[LabelConstant._language];
    }
    
    public static get NO_DIRECTIONS_AVAILABLE_POPUP_MESSAGE():string
    {
      return LabelConstant._no_directionsAvailablePopupMessage[LabelConstant._language];
    }

     public static get PRINT_MAP_LABEL():string
    {
      return LabelConstant._printMapLabel[LabelConstant._language];
    }

      public static get LOCATION_LABEL():string
    {
      return LabelConstant._LocationLabel[LabelConstant._language];
    }  

    public static get NO_INTERNET_CONNECTION_LABEL():string
    {
        return LabelConstant._NoInternetConnectionLabel[LabelConstant._language];
        
    } 

    public static get PRINT_POPUP_CAMPUSMAP_LABEL():string
    {
        return LabelConstant._PrintPopupCampusMapLabel[LabelConstant._language];
        
    } 

    public static get ON_DIRECTION_STEPS_IDLE_POPUP_MSG():string
    {
        return LabelConstant._OnDirectionStepsIdlePopup[LabelConstant._language];
    }

    public static get CAMPUS_MAP_INSTRUCTIONS_HEADING():string
    {
        return LabelConstant._CampusMapInstructionsHeading[LabelConstant._language];
    }

    public static get CAMPUS_MAP_INSTRUCTIONS_TEXT_LINE_ONE():string
    {
        return LabelConstant._CampusMapInstructionsTextLineOne[LabelConstant._language];
    }

    public static get CAMPUS_MAP_INSTRUCTIONS_TEXT_LINE_TWO():string
    {
        return LabelConstant._CampusMapInstructionsTextLineTwo[LabelConstant._language];
    }

    public static get CAMPUS_MAP_INSTRUCTIONS_TEXT_LINE_THREE():string
    {
        return LabelConstant._CampusMapInstructionsTextLineThree[LabelConstant._language];
    }
    
    public static get LIVE_CONNECT_PAGE_LABEL():string
    {
        return LabelConstant._LiveConnectPageLabel[LabelConstant._language];
    }
    




    
    
}