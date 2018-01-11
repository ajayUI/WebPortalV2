// Constant
import { AppConstant } from './app.constant';
import { ValueConstant } from './value.constant';

export class UrlConstant {
    private static getParameterByName(name: string, url: string = ValueConstant.STRING_EMPTY): string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return ValueConstant.STRING_EMPTY;
        return decodeURIComponent(results[2].replace(/\+/g, ValueConstant.STRING_SPACE));
    }

    private static BACKEND_SERVICE_URLS = {
        DEV: "https://ljrestservice-dev.azurewebsites.net/",
        STAGE: "https://ljrestservicestaging.azurewebsites.net/",
        PROD: "https://ljrestservice.azurewebsites.net/"
    };

    private static AZURE_BLOB_URLS = {
        DEV: "https://ljimageblob.blob.core.windows.net/wayfinder-common/dev-common/",
        STAGE: "https://ljimageblob.blob.core.windows.net/wayfinder-common/stage-common/",
        PROD: "https://ljimageblob.blob.core.windows.net/wayfinder-common/common/"
    };

    private static forceEnvKey: string = (UrlConstant.getParameterByName(AppConstant.ENVIRONMENT.URL_PARAMETER_KEY) || '').toUpperCase();

    private static forceEnvBackendServiceUrl: string = UrlConstant.forceEnvKey ? UrlConstant.BACKEND_SERVICE_URLS[UrlConstant.forceEnvKey] : null;

    private static forceEnvAzureBlobUrl: string = UrlConstant.forceEnvKey ? UrlConstant.AZURE_BLOB_URLS[UrlConstant.forceEnvKey] : null;

    public static isLocalTimeoutEnabled : boolean = !UrlConstant.getParameterByName(AppConstant.NO_TIMEOUT_URL_PARAM_KEY);

    public static IS_LOCAL_ENVIRONMENT: boolean = location.host == "localhost:8100";
    public static IS_DEV_ENVIRONMENT: boolean = location.host == "ljkioskv3-dev.azurewebsites.net";
    public static IS_STAGE_ENVIRONMENT: boolean = location.host == "ljkioskv3-stage.azurewebsites.net";
    public static IS_PROD_ENVIRONMENT: boolean = location.host == "ljkioskv3.azurewebsites.net";

    private static ENVIRONMENT_KEY: string = UrlConstant.IS_PROD_ENVIRONMENT ? AppConstant.ENVIRONMENT.PRODUCTION : UrlConstant.IS_STAGE_ENVIRONMENT ? AppConstant.ENVIRONMENT.STAGE : AppConstant.ENVIRONMENT.DEV;

    public static BACKEND_SERVICE_URL: string =
    UrlConstant.forceEnvKey ? UrlConstant.forceEnvBackendServiceUrl : UrlConstant.BACKEND_SERVICE_URLS[UrlConstant.ENVIRONMENT_KEY];

    public static AZURE_BLOB_URL: string = UrlConstant.forceEnvKey ? UrlConstant.forceEnvAzureBlobUrl : UrlConstant.AZURE_BLOB_URLS[UrlConstant.ENVIRONMENT_KEY];

    // Url for events
    public static RSS_FEED_EVENT_URL: string = 'https://paloaltojcc.org/portals/0/oshman-guidebook.xml';

    // Url for app cache service 
    public static APP_CACHE_SERVICE_URL: string = "service.cshtml?url=";

    // Service Urls
    public static MAP_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/map/";
    public static DESTINATION_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/destination/";
    public static DIRECTION_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/directions/";
    public static EVENT_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/event/";
    public static FLOOR_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/floor/";

    public static LIVE_CONNECT_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/liveconnect/";


    public static PORTAL_PARAMETER_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/portalparameter/";
    public static KIOSK_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/kiosk/";
    public static MAP_OVERLAY_CONTENT_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/mapoverlaycontent";
    public static LANGUAGE_TRANSLATION_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/translation/";
    public static DIRECTION_EMAIL_SERVICE_URL: string = UrlConstant.BACKEND_SERVICE_URL + "api/email/sendemailwithdirectiondata";
    public static KIOSK_TRAFFIC_REPORT_SERVICE_URL = UrlConstant.BACKEND_SERVICE_URL + "api/KioskTraffic/ReportList";

    public static GREETING_VIDEO_URL:string= "https://ljwbk.blob.core.windows.net/media/" ; 


     private static LIVE_CONNECT_BASE_URLS = {
        DEV: "https://ljliveconnect-dev.azurewebsites.net/",
        STAGE: "https://ljliveconnect-stage.azurewebsites.net/",
        PROD: "https://ljliveconnect.azurewebsites.net/"
    };

    private static forceEnvLiveConnectUrl: string = UrlConstant.forceEnvKey ? UrlConstant.LIVE_CONNECT_BASE_URLS[UrlConstant.forceEnvKey] : null;

    public static LIVE_CONNECT_BASE_URL: string =
    UrlConstant.forceEnvKey ? UrlConstant.forceEnvLiveConnectUrl : UrlConstant.LIVE_CONNECT_BASE_URLS[UrlConstant.ENVIRONMENT_KEY];
   // public static LIVE_CONNECT_BASE_URL:string = "https://ljliveconnect-dev.azurewebsites.net/";//"https://liveconnect.logicjunction.com/";

}



