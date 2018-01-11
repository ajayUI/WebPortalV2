// Base
import { AppBase } from '../../base/app.base';
import { SvgPointModel } from './svg-point.model';
import { SvgRotationModel } from './svg-rotation.model';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';

export class SvgTransformModel extends AppBase
{
    public translateX: number;
    public translateY: number;
    public scale: number;
    public rotation: SvgRotationModel;

    constructor(position: SvgPointModel = null, scale: number = SvgMapConstant.DEFAULT_MAP_SCALE, rotation: SvgRotationModel = null)
    {
        super();
        this.reset(position, scale, rotation);
    }

    public reset(position: SvgPointModel = null, scale: number = SvgMapConstant.DEFAULT_MAP_SCALE, rotation: SvgRotationModel = null): void
    {
        if (position)
        {
            this.translateX = position.x;
            this.translateY = position.y;
        }
        else
        {
            this.translateX = SvgMapConstant.SVG_DEFAULT_ORIGIN_POINT.X;
            this.translateY = SvgMapConstant.SVG_DEFAULT_ORIGIN_POINT.Y;
        }
        this.scale = scale || SvgMapConstant.DEFAULT_MAP_SCALE;
        this.rotation = rotation || new SvgRotationModel();
    }

    public get attributeValue(): string
    {
        return 'translate(' + this.translateX + ',' + this.translateY + ')scale(' + this.scale + ')' + this.rotation.attributeValue;
    }

    public dynamicScaleAttributeValue(dynamicScale: number): string
    {
        return 'translate(' + this.translateX + ',' + this.translateY + ')scale(' + dynamicScale + ')' + this.rotation.attributeValue;
    }

    public dynamicRotationAttributeValue(isRotatableWithMap: boolean, mapRotation: number): string
    {
        return 'translate(' + this.translateX + ',' + this.translateY + ')scale(' + this.scale + ')' + this.rotation.dynamicAttributeValue(isRotatableWithMap, (this.translateX || this.translateY ? mapRotation : 0));
    }
}