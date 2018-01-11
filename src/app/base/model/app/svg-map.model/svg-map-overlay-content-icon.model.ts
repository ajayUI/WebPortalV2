// Base
import { AppBase } from '../../base/app.base';

// Models
import { SvgPointModel } from './svg-point.model';
import { SvgTransformModel } from './svg-transform.model';
import { SvgRotationModel } from './svg-rotation.model';

// Helpers
import { D3Helper } from '../../../utility/d3.helper';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';
import { ValueConstant } from '../../../constant/value.constant';

export class SvgMapOverlayContentIconModel extends AppBase {
    public name: string;
    public svg: string;
    public url: string;
    public cssClass: string;
    public transform: SvgTransformModel;
    public position: SvgPointModel;
    public rotation: SvgRotationModel;
    public scale: number;
    public isChecked: boolean;

    constructor() {
        super();
        this.cssClass = ValueConstant.STRING_EMPTY;
        this.position = new SvgPointModel(SvgMapConstant.SVG_DEFAULT_ORIGIN_POINT.X, SvgMapConstant.SVG_DEFAULT_ORIGIN_POINT.Y)
        this.scale = SvgMapConstant.DEFAULT_MAP_SCALE;
        this.isChecked = false;
    }

    public loadFromObject(icon) {
        if (icon != null) {
            this.name = icon.Name;
            if (icon.Svg != null) {
                this.svg = D3Helper.cleanSvg(icon.Svg);
            }
            this.url = icon.Url;
            this.cssClass = icon.CssClass;
            this.position = new SvgPointModel(icon.Position.X, icon.Position.Y);

            this.rotation = new SvgRotationModel();
            this.rotation.loadFromObject(icon.Rotation);
            this.scale = icon.Scale;

            this.transform = new SvgTransformModel(this.position, this.scale, this.rotation);

            this.isChecked = icon.IsChecked;
        }
    }
}