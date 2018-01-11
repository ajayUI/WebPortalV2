// Constants
import { UrlConstant } from './url.constant';

export class TabConstant
{
    public static SPLASH_SCREEN_TAB_COMPONENT_NAME: string = "SplashScreenTabComponent";
    public static DIRECTORY_TAB_COMPONENT_NAME: string = "DirectoryTabComponent";
    public static SEARCH_DIRECTORY_TAB_COMPONENT_NAME: string = "SearchDirectoryTabComponent";
    public static TODAY_EVENTS_TAB_COMPONENT_NAME: string = "TodayEventsTabComponent";
    public static MONTHLY_EVENTS_TAB_COMPONENT_NAME: string = "MonthlyEventsTabComponent";
    public static CAMPUS_MAP_TAB_COMPONENT_NAME: string = "CampusMapTabComponent";

    public static SPLASH_SCREEN_TAB_COMPONENT_MAPPING_NAME: string = "SplashScreenComponent";
    public static DIRECTORY_TAB_COMPONENT_MAPPING_NAME: string = "DirectoryViewComponent";
    public static SEARCH_DIRECTORY_TAB_COMPONENT_MAPPING_NAME: string = "SearchComponent";
    public static TODAY_EVENTS_TAB_COMPONENT_MAPPING_NAME: string = "TodaysPage";
    public static MONTHLY_EVENTS_TAB_COMPONENT_MAPPING_NAME: string = "MonthlyPage";
    public static CAMPUS_MAP_TAB_COMPONENT_MAPPING_NAME: string = "CampusComponent";

    public static LIVE_CONNECT_TAB_COMPONENT_MAPPING_NAME: string = "LiveConnectComponent";

    public static ION_TAB_ELEMENT_TEMPLATE_REFERENCE: string = "navTabs";

    public static VISIBLE_TAB_CLASS_NAME: string = "show-tab";

    public static TAB_TRACKER_ATTRIBUTE_NAME: string = "data-component";

    public static SPLASH_SCREEN_LOGO_IMAGE_COMMON_SUFFIX: string = "-splashs-screen-logo.png";
    public static SPLASH_SCREEN_BACKGROUND_IMAGE_STYLE_CLIENT_ID_PLACEHOLDER: string = "[client_id]";
    public static SPLASH_SCREEN_BACKGROUND_IMAGE_STYLE: string = "background: #2e7ebb url('" + UrlConstant.AZURE_BLOB_URL + TabConstant.SPLASH_SCREEN_BACKGROUND_IMAGE_STYLE_CLIENT_ID_PLACEHOLDER + "-splash-home-screen.png') no-repeat center center fixed";


    public static START_TAB_INDEX: number = 0;

    public static TabInfoProperty = {
        COMPONENT: 'component',
        TITLE: 'title',
        POSITION: 'position',
        SHOW_TAB: 'showtab',
        PAGE_TITLE: 'pagetitle',
        TAB_ICON: 'tabicon',
        SHOW_ICON: 'showicon'
    };
}