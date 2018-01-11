// Angular and Third Party Modules, Libs etc
// Base
import { AppBase } from '../../base/app.base';
import { MultiLingualTextModel } from '../../base/multi-lingual-text.model';

// Models
import { SvgPointModel } from './svg-point.model';

// Constants
import { SvgMapConstant } from '../../../constant/svg-map.constant';
import { ValueConstant } from '../../../constant/value.constant';

export class SvgMapOverlayContentLabelModel extends AppBase
{
    public text: MultiLingualTextModel;
    public cssClass: string;
    public position: SvgPointModel;
    public alignment: string;

    constructor()
    {
        super();

        this.cssClass = ValueConstant.STRING_EMPTY;
        this.alignment = "start";
        this.position = new SvgPointModel(SvgMapConstant.SVG_DEFAULT_ORIGIN_POINT.X, SvgMapConstant.SVG_DEFAULT_ORIGIN_POINT.Y);
    }

    public get displayText(): string
    {
        if (this.text)
        {
            let txt = this.text.translatedText ?
                SvgMapConstant.SVG_MULTILINE_TEXT.LABEL_PREFIX + this.position.x + SvgMapConstant.SVG_MULTILINE_TEXT.LABEL_PREFIX_END + this.text.translatedText.replace(/\n/g, SvgMapConstant.SVG_MULTILINE_TEXT.LABEL_NEXT_LINE_FILLER_PREFIX + this.position.x + SvgMapConstant.SVG_MULTILINE_TEXT.LABEL_NEXT_LINE_FILLER_SUFFIX) + SvgMapConstant.SVG_MULTILINE_TEXT.LABEL_SUFFIX : ValueConstant.STRING_EMPTY;
            return txt;
        }
        return ValueConstant.STRING_EMPTY;
    };

    public loadFromObject(label)
    {
        if (label != null)
        {
            this.text = new MultiLingualTextModel(label.Text);
            this.cssClass = label.CssClass;
            this.position = new SvgPointModel(label.Position.X, label.Position.Y);
            this.alignment = label.Alignment;
        }
    }
}