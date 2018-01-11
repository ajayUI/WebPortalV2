// Angular and Third Party Modules, Libs etc
import { BehaviorSubject, Subscription } from 'rxjs/Rx';

// Base
import { AppBase } from '../../base/app.base';

// Models
import { SvgPointModel } from './svg-point.model';
import { SvgRotationModel } from './svg-rotation.model';
import { SvgTransformModel } from './svg-transform.model';
import { SvgMapOverlayContentLabelModel } from './svg-map-overlay-content-label.model';
import { SvgMapOverlayContentIconModel } from './svg-map-overlay-content-icon.model';
import { SvgMapOverlayContentArtifactModel } from './svg-map-overlay-content-artifact.model';
import { SvgMapOverlayContentArrangementLayoutType } from './svg-map-overlay-content-arrangement-layout-type';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';
import { ValueConstant } from '../../../constant/value.constant';

// Utilities
import { CommonHelper } from '../../../utility/common.helper';

export class SvgMapOverlayContentModel extends AppBase
{
    public id: string;
    public label: SvgMapOverlayContentLabelModel;
    public icon: SvgMapOverlayContentIconModel;
    public artifacts: SvgMapOverlayContentArtifactModel[];
    public cssClass: string;
    public transform: SvgTransformModel;
    public relativeTransform: SvgTransformModel;
    public position: SvgPointModel;
    public relativePosition: BehaviorSubject<SvgPointModel>;
    public rotation: SvgRotationModel;
    public scale: number;
    public mapScale: number;
    public mapRotation: number;
    public isFloating: boolean;
    public isRotatableWithMap: boolean;
    public contentArrangement: SvgMapOverlayContentArrangementLayoutType;
    public isArranged: boolean;

    constructor(public mapId: string, )
    {
        super();
        this.init();
        this.setupSubscriptions();
    }

    private init()
    {
        this.label = new SvgMapOverlayContentLabelModel();
        this.icon = new SvgMapOverlayContentIconModel();
        this.artifacts = new Array<SvgMapOverlayContentArtifactModel>();
        this.cssClass = '';
        this.position = new SvgPointModel(0, 0);
        this.relativePosition = new BehaviorSubject<SvgPointModel>(new SvgPointModel(0, 0));
        this.rotation = new SvgRotationModel();
        this.scale = 1;
        this.mapScale = 1;
        this.isFloating = false;
        this.isRotatableWithMap = false;
        this.contentArrangement = SvgMapOverlayContentArrangementLayoutType.iconAtLeft;
        this.relativeTransform = new SvgTransformModel(this.relativePosition.getValue(), null, this.rotation);
    }

    private setupSubscriptions()
    {
        this.relativePosition.subscribe(position =>
        {
            this.relativeTransform.reset(position, null, this.rotation);
        });
    }
    public get appliedScale(): number
    {
        let scale = this.isFloating ? this.scale / this.mapScale : this.scale;
        return scale > SvgMapConstant.MAX_CONTENT_SCALE ? SvgMapConstant.MAX_CONTENT_SCALE : scale;
    };

    public get isAritifactIconVisible()
    {
        return !!(this.artifacts.length > 0
            && !(
                (this.label.text && this.label.text.english.length > 0)
                || (this.icon.svg && this.icon.svg.length > 0)
            ));
    };

    public get dynamicTransform(): string
    {
        return this.transform.dynamicScaleAttributeValue(this.appliedScale);
    }

    public get dynamicRelativeTransform(): string
    {
        return this.relativeTransform.dynamicRotationAttributeValue(this.isRotatableWithMap, this.mapRotation);
    }

    public loadFromObject(content)
    {
        this.id = content.Id;
        this.isFloating = content.IsFloating;
        this.isRotatableWithMap = content.IsRotatableWithMap;
        this.cssClass = content.CssClass || ValueConstant.STRING_EMPTY;
        this.position = new SvgPointModel(content.Position.X, content.Position.Y);
        this.scale = content.Scale;
        this.rotation = new SvgRotationModel();
        this.rotation.loadFromObject(content.Rotation);
        this.contentArrangement = <any>CommonHelper.makeFirstLetterLowerCase(content.ContentArrangement);

        this.transform = new SvgTransformModel(this.position, this.scale);
        this.relativeTransform = new SvgTransformModel(this.relativePosition.getValue(), null, this.rotation);

        this.label.loadFromObject(content.Label);
        this.icon.loadFromObject(content.Icon);

        if (content.Artifacts)
        {
            content.Artifacts.forEach((artifact, index) =>
            {
                let art = new SvgMapOverlayContentArtifactModel();
                art.loadFromObject(artifact);
                this.artifacts.push(artifact);
            });
        }
    };


}