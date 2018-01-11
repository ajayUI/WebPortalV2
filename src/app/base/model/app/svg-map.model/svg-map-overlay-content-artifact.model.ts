// Base
import { AppBase } from '../../base/app.base';

// Models
import { SvgPointModel } from './svg-point.model';

export class SvgMapOverlayContentArtifactModel extends AppBase {
    public name: string;
    public url: string;
    public description: string;
    public isChecked: string;
    public position: SvgPointModel;

    public loadFromObject(artifact) {
        if (artifact) {
            this.name = artifact.name;
            this.url = artifact.url;
            this.description = artifact.description;
            if (artifact.position) {
                this.position = new SvgPointModel(artifact.position.x, artifact.position.y);
            }
            this.isChecked = artifact.isChecked;
        }
    }
}