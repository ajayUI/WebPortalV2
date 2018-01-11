// Angular and Third Party Modules, Libs etc
import { Component, Input } from '@angular/core';

// Base
import { ComponentBase, MultiLingualTextModel } from '../../../base';

@Component({
    selector: 'header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent extends ComponentBase {
    @Input()
    public title: MultiLingualTextModel;
}