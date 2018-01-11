// Angular and Third Party Modules, Libs etc
import { BehaviorSubject } from 'rxjs/Rx';

// Base
import { AppBase } from '../../base/app.base';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';
import { ValueConstant } from '../../../constant/value.constant';

// Models
import { SvgMapDirectionPathEndType } from './svg-map-direction-path-end-type';


export class SvgMapDirectionPathEndMarkerModel extends AppBase
{
    public displayCharacter : string;
    public color: string;
    public markerCssClass: string;
    public markerOutlineCssClass: string;
    public centerX: number;
    public centerY: number;
    public label : string;
}