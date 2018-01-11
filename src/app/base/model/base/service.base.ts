// Angular and Third Party Modules, Libs etc
import { Http, Headers, RequestOptions } from '@angular/http';

// Base
import { AppBase } from './app.base';

// Constants
import { UrlConstant } from '../../constant/url.constant';
import { ValueConstant } from '../../constant/value.constant';

export class ServiceBase extends AppBase {
    protected headers: Headers;
    protected baseUrl: string;
    protected options: RequestOptions;

    constructor(protected http: Http = null, baseUrl: string = null) {
        super();
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
        if (http) {
            this.headers = new Headers();
            this.headers.append(ValueConstant.REST_HEADER_PARAM_ACCEPT, ValueConstant.REST_HEADER_PARAM_ACCEPT_VALUE_JSON);
            this.options = new RequestOptions({
                headers: this.headers
            });
        }
    }

    public encodeUrl(url: string): string {
        if (UrlConstant.IS_LOCAL_ENVIRONMENT) {
            return url;
        }

        let encodePart = encodeURIComponent(url.replace(UrlConstant.APP_CACHE_SERVICE_URL, ValueConstant.STRING_EMPTY).toLowerCase());
        return UrlConstant.APP_CACHE_SERVICE_URL + encodePart;
    }
}
