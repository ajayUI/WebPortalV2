// Constant
import { TabConstant } from '../../constant/tab.constant';

export enum NavTabComponentType {
    // Todo: Update the text value to match with component name
    // This change will also affect the old version of 
    // kiosk v3 application
    splashScreenTabComponent = <any>TabConstant.SPLASH_SCREEN_TAB_COMPONENT_MAPPING_NAME,
    directoryTabComponent = <any>TabConstant.DIRECTORY_TAB_COMPONENT_MAPPING_NAME,
    searchDirectoryTabComponent = <any>TabConstant.SEARCH_DIRECTORY_TAB_COMPONENT_MAPPING_NAME,
    todayEventsTabComponent = <any>TabConstant.TODAY_EVENTS_TAB_COMPONENT_MAPPING_NAME,
    monthlyEventsTabComponent = <any>TabConstant.MONTHLY_EVENTS_TAB_COMPONENT_MAPPING_NAME,
    campusMapTabComponent = <any>TabConstant.CAMPUS_MAP_TAB_COMPONENT_MAPPING_NAME,
    liveConnectTabComponent = <any>TabConstant.LIVE_CONNECT_TAB_COMPONENT_MAPPING_NAME,
}