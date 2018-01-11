// Base
import { AppBase } from '../model/base/app.base';
import { ValueConstant } from '../constant/value.constant';

export class HtmlJsHelper extends AppBase {

    public static readCookie(name) {
        let nameEQ = name + ValueConstant.BROWSER_COOKIE_KEY_VALUE_SEPARATOR;
        let ca = document.cookie.split(ValueConstant.BROWSER_COOKIE_SEPARATOR);
        for (let i = ValueConstant.ARRAY_START_INDEX; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(ValueConstant.STRING_START_INDEX_FOR_CHAR) == ValueConstant.STRING_SPACE) {
                c = c.substring(ValueConstant.STRING_START_INDEX_FOR_CHAR + 1, c.length);
            }
            if (c.indexOf(nameEQ) == ValueConstant.STRING_START_INDEX_FOR_CHAR) {
                return c.substring(nameEQ.length, c.length);
            }
        }
    }

    public static getParameterByName(name: string, url: string = ValueConstant.STRING_EMPTY): string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return ValueConstant.STRING_EMPTY;
        return decodeURIComponent(results[2].replace(/\+/g, ValueConstant.STRING_SPACE));
    }

    public static addStylesToPage(filePath) {
        let fileref = document.createElement(ValueConstant.HTML_ELEMENT_LINK);
        fileref.setAttribute(ValueConstant.HTML_ATTRIBUTE_REL, ValueConstant.HTML_ATTRIBUTE_REL_VALUE_STYLESHEET);
        fileref.setAttribute(ValueConstant.HTML_ATTRIBUTE_TYPE, ValueConstant.HTML_ATTRIBUTE_TYPE_VALUE_CSS);
        fileref.setAttribute(ValueConstant.HTML_ATTRIBUTE_HREF, filePath);
        document.getElementsByTagName(ValueConstant.HTML_ELEMENT_HEAD)[0].appendChild(fileref);
    }
}