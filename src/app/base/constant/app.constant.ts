// Constants
import { ValueConstant } from './value.constant';

export class AppConstant {
    public static ENVIRONMENT = {
        LOCAL: "LOCAL",
        DEV: 'DEV',
        STAGE: 'STAGE',
        PRODUCTION: 'PROD',
        URL_PARAMETER_KEY: 'env'
    };

    public static NO_TIMEOUT_URL_PARAM_KEY = "notimeout";

    public static COOKIE = {
        CLIENT_HOST_NAME: {
            KEY: 'host'
        },
        KIOSK_LOCATION: {
            KEY: 'location'
        }
    };

    public static LANGUAGE = {
        Arabic: "Arabic",
        Cantonese: "Cantonese",
        English: "English",
        French: "French",
        German: "German",
        Hindi: "Hindi",
        Japanese: "Japanese",
        Portuguese: "Portuguese",
        Russian: "Russian",
        Spanish: "Spanish",
        StandardChinese: "StandardChinese",
        Vietnamese: "Vietnamese"
    }
    public static DEFAULT_LANGUAGE: string = 'english';

    // public static OFFLINE_DATA_INTERVAL_SECONDS: number //USE CHECK_ONLINE_INTERVAL_SECONDS
    public static CHECK_ONLINE_INTERVAL_SECONDS: number = 30 * 60 * ValueConstant.MILLISECOND_TO_SECOND_CONVERSION_FACTOR;//30 minutes

    // public static RELOAD_TIMEOUT_SECONDS: number = 40; use RESET_TIMEOUT_SECONDS
    public static RESET_TIMEOUT_SECONDS: number = 40;
    public static RESET_TIMEOUT_POPUP_SECONDS: number = 5;

    public static DEFFERED_EXECUTION_DEFAULT_WAIT_TIME: number = 0;

    public static DIRECTION_STEPS_TIMEOUT_SECONDS:number = 10;


    // public static LOADER_TIMEOUT_SECONDS: number = 30; use LOADER.DISMISS_TIMEOUT_SECONDS
    public static LOADER = {
        DISMISS_TIMEOUT_SECONDS: 30 * ValueConstant.MILLISECOND_TO_SECOND_CONVERSION_FACTOR
    };

    public static KIOSK = {
        DEFAULT_ORIENTATION: 'north'
    };

    public static DEFAULT_TAB_INDEX: number = 0;

    public static HEADER_LOGO_IMAGE_COMMON_SUBSCRIPT: string = "-header-logo.png";

    // public static LATEST_APPCACHE_VERSION_ID_INTERVAL_SECONDS: use APPCACHE.VERSION_ID.CHECK_INTERVAL_SECONDS
    public static APPCACHE = {
        VERSION_ID: {
            CHECK_INTERVAL_SECONDS: 10 * ValueConstant.MILLISECOND_TO_SECOND_CONVERSION_FACTOR, //1 minute
            SHOW_ON_MIN_CLICKS_COUNT: 5
        }
    };

    public static SUBSCRIPTION = {
        CLEAR_TIME: {
            DEFAULT: 0 * ValueConstant.MILLISECOND_TO_SECOND_CONVERSION_FACTOR,
            TRANSLATION: 20 * ValueConstant.MILLISECOND_TO_SECOND_CONVERSION_FACTOR
        }
    };

    public static DATE = {
        COMPARE_OPTION: {
            TYPE: {
                VALUE: {
                    DATE_TIME: 'date-time',
                    DATE_ONLY: 'date-only',
                    TIME_ONLY: 'time-only'
                }
            }
        },
        MOMENT: {
            ADD_DATE_TIME: {
                MONTH_FORMAT: <any>'M'
            }
        }
    };

    public static SERVICE = {
        LANGUAGE_DATA_KEY: {
            ARABIC: "Arabic",
            CANTONESE: "Cantonese",
            ENGLISH: "English",
            FRENCH: "French",
            GERMAN: "German",
            HINDI: "Hindi",
            JAPANESE: "Japanese",
            PORTUGUESE: "Portuguese",
            RUSSIAN: "Russian",
            SPANISH: "Spanish",
            STANDARD_CHINESE: "StandardChinese",
            VIETNAMESE: "Vietnamese"
        },
        // public static REPORTING_OFFLINE_DATA_KEY: string; use REPORTING_OFFLINE_DATA_KEYNAME
        REPORTING_OFFLINE_DATA_KEY: 'Reporting_Offline_Data'
    }

    public static EVENT = {
        MONTHLY_CALENDAR: {
            GRID_HEADER: {
                left: 'prev, today, next',
                center: 'title',
                right: '' //'month,agendaWeek,agendaDay'
            },
            DURATION_RANGE_BOUND: 6
        },
        URL_SEPARATOR: ",",
        SOURCE_LOCATION: { RSS: "rss", LJ_API: "ljapi" },
        NAV_PARAMETER_KEY: 'event',
        DESCRIPTION_IMAGE: {
            IMAGE_TAG_INDEX: 0,
            IMAGE_PATH_INDEX: 1,
            IMG_TAG_SUBSTRING: '<img ',
            SRC_ATTRIBUTE_SUBSTRING: 'src="',
            URL_HTTP_SUBSTRING: 'http',
            IMAGE_SOURCE_WEBSITE: 'http://paloaltojcc.org'
        }
    };

    public static DOM_SANITIZER_TRANSFORM_TYPE = {
        STYLE: "style",
        HTML: "html"
    };

    public static DEFAULT_LOCATION_MARKER_INDEX : number  = 0;

    public static MIN_FLOOR_COUNT_FOR_DIRECTION_PATH_FLOOR_SWITCHING : number = 2; 

    public static LIVE_CONNECT_URL : string = "https://ljliveconnect.azurewebsites.net/Kiosk#";



    public static FROM_DIRECTORY_LOCATION :string = "from";
    public static TO_DIRECTORY_LOCATION :string = "to";


    public static DEFAULT_SLIDER_INDEX:number=0;
    public static NUMERIC_ONE:number=1;
    public static NUMERIC_ZERO:number=0;



}