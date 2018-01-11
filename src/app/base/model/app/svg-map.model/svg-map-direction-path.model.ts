// Angular and Third Party Modules, Libs etc
import { BehaviorSubject } from 'rxjs/Rx';

// Base
import { AppBase } from '../../base/app.base';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';
import { ValueConstant } from '../../../constant/value.constant';

// Models
import { SvgMapDirectionPathEndType } from './svg-map-direction-path-end-type';
import { SvgMapDirectionPathEndMarkerModel } from './svg-map-direction-path-end-marker.model';


export class SvgMapDirectionPathModel extends AppBase
{
    private _pathPoints: string;
    private _animationLength: number;

    public circleRadius: number;
    public directionPathEndType: SvgMapDirectionPathEndType;
    public directionPathStepIndex: number;
    public get animationLength(): number
    {
        if (this._animationLength && this._animationLength > 0)
        {
            return this._animationLength;
        }

        let vValues = this._pathPoints.split(' ');
        let totalDistance = 0;
        let xMax = Number.MIN_SAFE_INTEGER;
        let xMin = Number.MAX_SAFE_INTEGER;
        let yMax = Number.MIN_SAFE_INTEGER;
        let yMin = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < vValues.length - 1; i++)
        {
            let splitval = vValues[i].split(',');
            let xi = parseInt(splitval[0]);
            let yi = parseInt(splitval[1]);

            splitval = vValues[i + 1].split(',');
            let xj = parseInt(splitval[0]);
            let yj = parseInt(splitval[1]);

            let d = Math.sqrt(Math.pow(xj - xi, 2) + Math.pow(yj - yi, 2));
            totalDistance += d;
        }

        this._animationLength = totalDistance;
    }

    public set pathPoints(value: string)
    {
        this._pathPoints = value;
    }
    public get pathPoints(): string
    {
        let startPoint = this._pathPoints.split(ValueConstant.STRING_SPACE)[ValueConstant.ARRAY_START_INDEX];
        let remainingPoints = this._pathPoints.replace(startPoint, ValueConstant.STRING_EMPTY).replace(/,/g, ValueConstant.STRING_SPACE);
        return SvgMapConstant.SVG_PATH.START_CHARACTER + startPoint + SvgMapConstant.SVG_PATH.LINE_TO_CONNECTOR + remainingPoints;
    }

    public get pathEndLoactorVisible(): boolean
    {
        return this.directionPathEndType != SvgMapDirectionPathEndType.none;
    }

    public get centerX(): number
    {
        return +this._pathPoints.substr(ValueConstant.STRING_START_INDEX_FOR_CHAR, this._pathPoints.indexOf(SvgMapConstant.SVG_PATH.X_Y_SEPARATOR) - 1);
    }
    public get centerY(): number
    {
        return +this._pathPoints.substring(this._pathPoints.indexOf(SvgMapConstant.SVG_PATH.X_Y_SEPARATOR) + 1, this._pathPoints.indexOf(SvgMapConstant.SVG_PATH.POINT_SEPARATOR) - 1);
    }

    private _pathEndMarkers: SvgMapDirectionPathEndMarkerModel[];


    public get pathEndMarkers(): SvgMapDirectionPathEndMarkerModel[]
    {
        if (!this._pathEndMarkers || this._pathEndMarkers.length == 0)
        {
            let startColor: string = '#ed1c24';
            let endColor: string = '#2ab206';
            let startMarkerCssClass: string = "path-start-marker";
            let startMarkerOutlineCssClass: string = "path-start-marker-outline";
            let endMarkerCssClass: string = "path-end-marker";
            let endMarkerOutlineCssClass: string = "path-end-marker-outline";

            let points = this._pathPoints.split(ValueConstant.STRING_SPACE);
            let startPoint = points[ValueConstant.ARRAY_START_INDEX];
            let endPoint = points[points.length - 1];

            let pathStartMarker = new SvgMapDirectionPathEndMarkerModel();
            let pathEndMarker = new SvgMapDirectionPathEndMarkerModel();

            pathStartMarker.color = startColor;
            pathStartMarker.markerCssClass = startMarkerCssClass;
            pathStartMarker.markerOutlineCssClass = startMarkerOutlineCssClass;
            pathStartMarker.centerX = +startPoint.split(SvgMapConstant.SVG_PATH.X_Y_SEPARATOR)[ValueConstant.ARRAY_START_INDEX];
            pathStartMarker.centerY = +startPoint.split(SvgMapConstant.SVG_PATH.X_Y_SEPARATOR)[ValueConstant.ARRAY_START_INDEX + 1];
            pathStartMarker.label = String.fromCharCode(64 + this.directionPathStepIndex);

            pathEndMarker.color = endColor;
            pathEndMarker.markerCssClass = endMarkerCssClass;
            pathEndMarker.markerOutlineCssClass = endMarkerOutlineCssClass;
            pathEndMarker.centerX = +endPoint.split(SvgMapConstant.SVG_PATH.X_Y_SEPARATOR)[ValueConstant.ARRAY_START_INDEX];
            pathEndMarker.centerY = +endPoint.split(SvgMapConstant.SVG_PATH.X_Y_SEPARATOR)[ValueConstant.ARRAY_START_INDEX + 1];
            pathEndMarker.label = String.fromCharCode(65 + this.directionPathStepIndex);

            switch (this.directionPathEndType)
            {
                case SvgMapDirectionPathEndType.none:
                    this._pathEndMarkers = [];
                    break;
                case SvgMapDirectionPathEndType.start:
                    this._pathEndMarkers = [pathStartMarker];
                    break;
                case SvgMapDirectionPathEndType.end:
                    this._pathEndMarkers = [pathEndMarker];
                    break;
                case SvgMapDirectionPathEndType.startAndEnd:
                    this._pathEndMarkers = [pathStartMarker, pathEndMarker];
                    break;
                default:
                    this._pathEndMarkers = [];
                    break;
            }
        }
        return this._pathEndMarkers || [];
    }
}