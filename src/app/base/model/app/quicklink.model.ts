// Base
import { AppBase } from '../base/app.base';

export class QuickLinkModel extends AppBase
{
    constructor(public quicklink: string, public toDestinationTitle: string)
    {
        super();
    }

}