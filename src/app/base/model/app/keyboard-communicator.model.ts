import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Base
import { AppBase } from '../base/app.base';

export class KeyboardCommunicatorModel extends AppBase
{
    public id: number;
    public searchNeedle: BehaviorSubject<string>;

    constructor()
    {
        super();
        this.searchNeedle = new BehaviorSubject<string>(null);
    }
}