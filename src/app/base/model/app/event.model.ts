// Base
import { AppBase } from '../base/app.base';

export class EventModel extends AppBase {
    public start: Date;
    public end: Date;
    public title: string;
    public id: number;
    public from: string;
    public description: string;
    public quicklink: string;
    public location: string;
}