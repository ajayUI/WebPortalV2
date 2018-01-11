// Angular and Third Party Modules, Libs etc
import { BehaviorSubject } from 'rxjs/Rx';

// Base
import { AppBase } from '../../base/app.base';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';

// Models
import { SvgMapSourceType } from './svg-map-source-type';


export class SvgMapModel extends AppBase
{
    public id: string;
    public mapSourceType: SvgMapSourceType;
    public svg: BehaviorSubject<string>;
    public mapWidth: number;
    public mapHeight: number;

    public currentFloor: BehaviorSubject<number>;

    constructor()
    {
        super();
        this.init();
        this.reset();
    }

    private init(): void
    {
        this.currentFloor = new BehaviorSubject<number>(null);
        this.svg = new BehaviorSubject<string>(null);
    }

    public reset(): void
    {
        this.currentFloor.next(null);
        this.svg.next(null);
        this.mapWidth = SvgMapConstant.DEFAULT_SVG_WIDTH;
        this.mapHeight = SvgMapConstant.DEFAULT_SVG_HEIGHT;
        this.mapSourceType = SvgMapSourceType.floorId;
    }
}
