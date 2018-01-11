// Base
import { ComponentBase } from './component.base';
import { MultiLingualTextModel } from './multi-lingual-text.model';

export class TabComponentBase extends ComponentBase
{
    protected pageTitle: MultiLingualTextModel;
    public isDirty: boolean;

    constructor()
    {
        super();
        this.isDirty = false;
    }
}