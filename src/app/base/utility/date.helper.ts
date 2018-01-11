// Base
import { AppBase } from '../model/base/app.base';
import { DateCompareOptionType } from '../model/app/date-compare-option-type';
import { ValueConstant } from '../constant/value.constant';
import { CommonHelper } from './common.helper';

export class DateHelper extends AppBase {
    public static getHourMinutesFromDate(anyDate) {
        return CommonHelper.padNumber(anyDate.getHours()) + ValueConstant.HOUR_MINUTE_SEPARATOR + CommonHelper.padNumber(anyDate.getMinutes());
    }

    public static compareDates(date1: Date, date2: Date, compareOption: DateCompareOptionType): boolean {
        switch (compareOption) {
            case DateCompareOptionType.DateTime:
                return date1.toUTCString() == date2.toUTCString();
            case DateCompareOptionType.DateOnly:
                return date1.toUTCString().substr(5, 11) == date2.toUTCString().substr(5, 11);
            case DateCompareOptionType.TimeOnly:
                return date1.toUTCString().substr(17, 8) == date2.toUTCString().substr(17, 8);
            default:
                return date1 == date2;
        }
    }

    public static compareDatesByLocalTime(startdate: Date, todaydate: Date): boolean {
        let eventStartDateOnly: any = Date.UTC(startdate.getFullYear(), startdate.getMonth() + 1, startdate.getDate());
        let todayDateOnly: any = Date.UTC(todaydate.getFullYear(), todaydate.getMonth() + 1, todaydate.getDate());
              
              return parseFloat(eventStartDateOnly) == parseFloat(todayDateOnly);
    }
}