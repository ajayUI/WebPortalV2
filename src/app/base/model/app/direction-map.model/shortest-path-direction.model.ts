// Base
import { AppBase } from '../../base/app.base';

// Models
import { SvgMapShortestPathModel } from '../svg-map.model/svg-map-shortest-path.model';
import { DirectionInfoModel } from './direction-info.model';

export class ShortestPathDirectionModel extends AppBase
{
    public shortestPaths: { [index: string]: SvgMapShortestPathModel };
    public walkingDirections: { [index: string]: DirectionInfoModel[]};
    public shortNote: string;
    public note: string;
    public endQuicklink: string;
    public language: string;    
}