// Base
import { AppBase } from '../base/app.base';
import { MultiLingualTextModel } from '../base/multi-lingual-text.model';

// Constants
import { ValueConstant } from '../../constant/value.constant';

// Models
import { NavTabComponentType } from './nav-tab-component-type';

export class NavTabModel extends AppBase
{
    constructor(
        public component: any = null,
        public componentType: NavTabComponentType = null,
        public title: MultiLingualTextModel = null,
        public position: number = ValueConstant.NAV_TAB_NO_POSITION,
        public showTab: boolean = true,
        public pageTitle: string = ValueConstant.STRING_EMPTY,
        public pageTitleEnglish: string = ValueConstant.STRING_EMPTY,
        public icon: string = ValueConstant.STRING_EMPTY,
        public showIcon: boolean = true)
    {
        super();
    }
}