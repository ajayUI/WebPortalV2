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

export class SvgMapConstant
{
    public static _language: string;

    public static DEFAULT_BBOX_PADDING: number = 0; // 20;
    public static DEFAULT_SVG_HEIGHT: number = 2500;
    public static DEFAULT_SVG_WIDTH: number = 5000;
    public static MIN_SCALE: number = 0.125;
    public static DEFAULT_MAP_SCALE: number = 1;
    public static MAX_SCALE: number = 2;
    public static MAX_WALKING_SCALE: number = 1;
    public static MAX_WALKING_SCALE_THUMBNAIL = 0.35;
    public static CIRCLE_RADIUS: number = 15; 
    public static TEXT_FONT_SIZE: number = 20;
    public static MAX_CONTENT_SCALE: number = 10;
    public static CONTENT_INNER_PADDING = 5;
    public static MESSAGE_BOX_CSS_CLASS: string = "location-marker-message-box";
    public static OUTER_CIRCLE_RADIUS:  25; 
    public static DIRECTION_PATH_MAP_START_INDEX: number = 1;
    public static DEFAULT_TRANSLATE_OFFSET:number = 1000000000000;

    public static SVG_MAP_CONTAINER_ID: string = 'map-box';
    public static SVG_MAP_AND_CONTENT_WRAPPER: string = '-wrapper';
    public static MAIN_SVG_ID_SUFFIX: string = '-mainSvg';
    public static SVG_ID_SUFFIX: string = '-svg';
    public static GEO_FENCE_ID_SUFFIX: string = '-GeoFences';
    public static CONTENT_ID_SUFFIX: string = '-Contents';
    public static PATH_GROUP_ID_SUFFIX: string = '-pathGroup';
    public static MAIN_PATH_ID_SUFFIX: string = '-mainpath';
    public static SLIDE_MOVER_ID_SUFFIX: string = '-slideMover';
    public static GROUP_OF_COMPASS_ID_SUFFIX: string = '-gCompass';
    public static COMPASS_ID_SUFFIX: string = '-Compass';
    public static COMPASS_ARROW_SVG: string = 'm13.847,0l-13.847,26.654l13.848,-5.063l14.152,5.156l-14.153,-26.747zm0,3.366l10.933,20.755l-10.933,-4.391v-16.364l0,0z';
    public static COMPASS_N_SVG: string = 'm4.943,50v-21.223h4.146l8.642,14.174v-14.174h3.959v21.223h-4.276l-8.511,-13.84v13.84h-3.96l0,0z';
    public static MESSAGE_BOX_SVG: string = 'M247,56.5H51.3c-5.5,0-9.8,4.7-9.8,10.2v18.8L27,96.4l14.5,10.1v16.2c0,5.5,4.3,9.8,9.8,9.8H247c5.5,0,9.5-4.3,9.5-9.8v-56C256.5,61.2,252.5,56.5,247,56.5z';
    public static MESSAGE_BOX_ARROW: string = '100,85 76,85 76,76 58.3,94.5 76,113 76,105 100,105';

    public static YOU_ARE_HERE_ID_SUFFIX: string = '-YouAreHere';
    public static ALERT_LOCATION_ID_SUFFIX: string = '-alertLocation';

    public static YOU_ARE_HERE_BASE_CIRCLE_CSS_CLASS: string = "location-marker-circle";
    public static YOU_ARE_HERE_MESSAGE_BOX_ARROW_FILL_COLOR: string = "#eb0009";
    public static YOU_ARE_HERE_MESSAGE_TEXT_FILL_COLOR: string = "#eb0009";
    public static ALERT_LOCATION_BASE_CIRCLE_CSS_CLASS: string = "location-marker-circle red";
    public static ALERT_LOCATION_MESSAGE_BOX_ARROW_FILL_COLOR: string = "#EE5B5B";
    public static ALERT_LOCATION_MESSAGE_TEXT_FILL_COLOR: string = "#EE5B5B";

    public static _youAreHereMessage: MultiLingualTextModel = new MultiLingualTextModel("You are here");
    public static _alertLocationMessage: MultiLingualTextModel = new MultiLingualTextModel("Alert zone");

    public static CAMPUS_MAP_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-campus-map';
    public static DIRECTION_MAP_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-dirction-map';

    // added for search map
    public static SEARCH_MAP_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-search-map';
    public static TODAY_EVENTS_LIST_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-today-events';
    public static TODAY_EVENTS_DETAIL_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-today-events-detail';
    public static MONTHLY_EVENTS_LIST_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-monthly-events';
    public static MONTHLY_EVENTS_DETAIL_CONTAINER_ID = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-monthly-events-detail';

    public static DIRECTION_THUMBNAIL_CONTAINER_ID_PREFIX = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-dirction-thumbnail-';
    public static DIRECTION_PRINT_CONTAINER_ID_PREFIX = SvgMapConstant.SVG_MAP_CONTAINER_ID + '-dirction-print-';

    public static SVG_MAP_SOURCE_TYPE_LOCATION_MARKER: string = "LOCATION_MARKER";
    public static SVG_MAP_SOURCE_TYPE_QUICKLINK: string = "QUICKLINK";
    public static SVG_MAP_SOURCE_TYPE_FLOOR_ID: string = "FLOOR_ID";
    public static SVG_MAP_SOURCE_TYPE_FLOOR_ID_SHORTEST_PATH: string = "SHORTEST_PATH";


    public static SVG_MAP_LOCATION_MARKER_TYPE_YOU_ARE_HERE: string = "YOU_ARE_HERE";
    public static SVG_MAP_LOCATION_MARKER_TYPE_ALERT_LOCATION: string = "ALERT_LOCATION";

    public static SVG_MAP_CENTER_TYPE_NONE: string = "NONE";
    public static SVG_MAP_CENTER_TYPE_QUICKLINK: string = "QUICKLINK";
    public static SVG_MAP_CENTER_TYPE_SHORTEST_PATH: string = "SHORTEST_PATH";

    public static SVG_MAP_NO_ROTATION: number = 0;

    public static SVG_MAP_LOCATION_MARKER_DEFAULT_ZOOM: number;

    public static ZOOM_BEHAVIOUR_EVENT_NAME: string = 'zoom';

    public static MAP_OVERLAY_CONTENT = {
        ICON: {},
        ARRANGEMENT_LAYOUT_TYPE: {
            ICON_AT_LEFT: '1',
            ICON_AT_RIGHT: '2',
            ICON_AT_TOP: '3',
            ICON_AT_BOTTOM: '4',
        }
    };

    public static SVG_DEFAULT_ORIGIN_POINT = {
        X: 0,
        Y: 0
    };
    
    public static SVG_MULTILINE_TEXT = {
        LABEL_PREFIX: '<tspan x="',
        LABEL_PREFIX_END: '" >',
        LABEL_SUFFIX: '</tspan>',
        LABEL_NEXT_LINE_FILLER_PREFIX: '</tspan><tspan  x="',
        LABEL_NEXT_LINE_FILLER_SUFFIX: '"  dy="1em">'
    };

    public static SVG_PATH = {
        START_CHARACTER: "M",
        LINE_TO_CONNECTOR: " L",
        X_Y_SEPARATOR: ',',
        POINT_SEPARATOR: ' ',
        DEFAULT_ZOOM_FACTOR: 1,
        MAX_ZOOM_FACTOR: 1,
        MIN_ZOOM_FACTOR: 0.0625,
        MAX_VIEW_PATH_RATIO: 3,
        MIN_VIEW_PATH_RATIO: 0.25,
        MIN_MAP_PATH_RATIO : 2
    };

    public static DIRECTION_INDICATOR_LEFT_PADDING = 50;


    public static get YOU_ARE_HERE_MESSAGE(): string
    {
        return SvgMapConstant._youAreHereMessage[SvgMapConstant._language];
    }
    public static get ALERT_LOCATION_MESSAGE_TEXT(): string
    {
        return SvgMapConstant._alertLocationMessage[SvgMapConstant._language];
    }
}