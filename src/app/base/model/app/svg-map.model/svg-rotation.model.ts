// Base
import { AppBase } from '../../base/app.base';

export class SvgRotationModel extends AppBase
{
    public angle: number;
    public centerX: number;
    public centerY: number;

    constructor()
    {
        super();
        this.angle = 0;
        this.centerX = 0;
        this.centerY = 0;
    }

    public get attributeValue(): string
    {
        return 'rotate(' + this.angle + ',' + this.centerX + ',' + this.centerY + ')';
    }

    public dynamicAttributeValue(isRotatableWithMap: boolean, mapAngle: number): string
    {

        if (isRotatableWithMap)
        {
            mapAngle = this.convertAngle(mapAngle);
            mapAngle = mapAngle < 0 ? 360 + mapAngle : mapAngle;

            let angle = this.convertAngle(this.angle);
            angle = angle < 0 ? 360 + this.angle : this.angle;

            let totalAngle = this.convertAngle(mapAngle + angle);

            let correctionAngle = totalAngle >= 100 && totalAngle < 280 ? 180 : 0;

            return 'rotate(' + (this.angle + correctionAngle) + ',' + this.centerX + ',' + this.centerY + ')';
        }
        else
        {
            return 'rotate(' + (this.angle - (mapAngle || 0)) + ',' + this.centerX + ',' + this.centerY + ')';
        }
    }


    private convertAngle(angle: number)
    {
        return angle % 360;
    }

    public loadFromObject(rotation)
    {
        this.angle = rotation.Angle;
        this.centerX = rotation.CenterX;
        this.centerY = rotation.CenterY;
    }
}
