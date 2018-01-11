import { BehaviorSubject } from 'rxjs/Rx';

// Base
import { AppBase } from '../../base/app.base';
import { SvgTransformModel } from './svg-transform.model';
import { SvgPointModel } from './svg-point.model';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';

export class SvgMapViewModel extends AppBase
{
    public id: string;
    public wrapperId: string;
    public minScale: number;
    public maxScale: number;
    public transform: BehaviorSubject<SvgTransformModel>;
    public mapViewWidth: number;
    public mapViewHeight: number;
    public zoom: any;
    public floorName : string;
    private startLocation: SvgPointModel;

    constructor()
    {
        super();
        this.init();
        this.reset();
    }

    private init(): void
    {
        this.startLocation = new SvgPointModel(SvgMapConstant.DEFAULT_TRANSLATE_OFFSET, SvgMapConstant.DEFAULT_TRANSLATE_OFFSET);
        this.transform = new BehaviorSubject<SvgTransformModel>(new SvgTransformModel(this.startLocation));
    }

    public reset(): void
    {
        let transform = this.transform.getValue();
        transform.reset(this.startLocation);
        this.transform.next(transform);
        this.minScale = SvgMapConstant.MIN_SCALE;
        this.maxScale = SvgMapConstant.MAX_SCALE;
    }
}
