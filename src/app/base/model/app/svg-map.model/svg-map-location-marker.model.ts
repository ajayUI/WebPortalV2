// Base
import { AppBase } from '../../base/app.base';

// Constants
import { ValueConstant } from '../../../constant/value.constant';
import { SvgMapConstant } from '../../../constant/svg-map.constant';

// Models
import { SvgMapLocationMarkerType } from './svg-map-location-marker-type';
import { SvgRotationModel } from './svg-rotation.model';

export class SvgMapLocationMarkerModel extends AppBase {
    public id: string;
    private _x: number;
    private _y: number;
    public rotation: SvgRotationModel;
    public baseCircleCssClass: string;
    public isVisible: boolean;
    public circleRadius: number;    
    public outerCircleRadius: number;

    constructor(public type: SvgMapLocationMarkerType, public quickLink: string) {
        super();
        this.isVisible = true;
        this.circleRadius = SvgMapConstant.CIRCLE_RADIUS;
        this.outerCircleRadius = SvgMapConstant.OUTER_CIRCLE_RADIUS;
        this.rotation = new SvgRotationModel();
        this.setPosition(ValueConstant.DEFAULT_OFFSET, ValueConstant.DEFAULT_OFFSET);

        this.setSpecificProperties();
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    private setSpecificProperties() {
        switch (this.type) {
            case SvgMapLocationMarkerType.youAreHere:
                this.baseCircleCssClass = SvgMapConstant.YOU_ARE_HERE_BASE_CIRCLE_CSS_CLASS;
                break;
            case SvgMapLocationMarkerType.alertLocation:
                this.baseCircleCssClass = SvgMapConstant.ALERT_LOCATION_BASE_CIRCLE_CSS_CLASS;
                break;
        }
    }

    public setPosition(x: number, y: number) {
        this._x = x;
        this._y = y;
        this.rotation.centerX = x;
        this.rotation.centerY = y;
    }
}