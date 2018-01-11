import { AppBase } from '../../base/app.base';

export class SvgPointModel extends AppBase {
    constructor(
        public x: number = 0,
        public y: number = 0
    ) {
        super();
    }
}