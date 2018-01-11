import { BehaviorSubject, Subscription, Subject } from 'rxjs/Rx';
// Base
import
{
    AppBase
    } from '../base';


export class MapLegendsConfig extends AppBase
{
    public isResetLegends: BehaviorSubject<boolean>;
    constructor(
       )
    {
        super();
        this.init()
        
    }

    init()
    {
        this.isResetLegends = new BehaviorSubject<boolean>(null);
    }

}