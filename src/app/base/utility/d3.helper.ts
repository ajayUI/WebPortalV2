// Base
import { AppBase } from '../model/base/app.base';
import { ValueConstant } from '../constant/value.constant';

export class D3Helper extends AppBase {
    public static cleanSvg(svg: string) {
        let txt: string[] = [
            ValueConstant.XML_VERSION_ELEMENT_ISO_8859_1,
            ValueConstant.XML_VERSION_ELEMENT_UTF_8
        ];
        txt.forEach(t => {
            svg = svg.replace(t, ValueConstant.STRING_EMPTY);
        });
        return svg;
    }
}