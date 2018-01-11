import { BehaviorSubject } from 'rxjs/Rx';

// Base
import { AppBase } from '../../base/app.base';

// Models
import { SvgMapDirectionPathEndType } from './svg-map-direction-path-end-type';

export class SvgMapShortestPathModel extends AppBase
{
    public title: string;
    public url: string;
    public description: string;
    public pathPoints: string;
    public floorId: number;
    public directionPathEndType : SvgMapDirectionPathEndType;    
    public directionPathStepIndex : number;
}