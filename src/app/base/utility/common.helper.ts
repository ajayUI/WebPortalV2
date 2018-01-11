// Angular and Third Party Modules, Libs etc
declare const X2JS: any;

// Base
import { AppBase } from '../model/base/app.base';
import { AppConstant } from '../constant/app.constant';
import { ValueConstant } from '../constant/value.constant';


export class CommonHelper extends AppBase
{
    private static x2js: any;

    public static padNumber(number: number, length: number = ValueConstant.DEFAULT_PAD_LENGTH): string
    {
        let len = number.toString().length;
        if (len >= length)
        {
            return number.toString();
        }
        return ValueConstant.DEFAULT_PAD_TEXT.repeat(length - len) + number;
    }

    public static xmlToJson(xml: string): any
    {
        CommonHelper.x2js = CommonHelper.x2js || new X2JS();
        return CommonHelper.x2js.xml_str2json(xml);
    }

    public static isTrue(check: any): boolean
    {
        return check && check.toLowerCase() == ValueConstant.TEXT_TRUE;
    }

    public static makeFirstLetterLowerCase(text: string): string
    {
        let firstCharacterLength = 1;
        return text.substr(ValueConstant.STRING_START_INDEX_FOR_CHAR, firstCharacterLength).toLocaleLowerCase() + text.substr(firstCharacterLength, text.length - firstCharacterLength);
    }

    public static makeFirstLetterUpperCase(text: string, removeFirstLetter: boolean = false): string
    {
        let firstCharacterLength = 1;
        
        if(removeFirstLetter)
        {
            text = text.substr(firstCharacterLength);
        }
        
        return text.substr(ValueConstant.STRING_START_INDEX_FOR_CHAR, firstCharacterLength).toLocaleUpperCase() + text.substr(firstCharacterLength, text.length - firstCharacterLength);
    }


    public static delayedCallWithNoWait(callback: () => void)
    {
        setTimeout(() =>
        {
            callback();
        }, AppConstant.DEFFERED_EXECUTION_DEFAULT_WAIT_TIME);
    }
}