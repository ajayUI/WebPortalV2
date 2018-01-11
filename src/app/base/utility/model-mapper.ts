// Base
import { AppBase } from '../model/base/app.base';
import { EventModel } from '../model/app/event.model';
import { DirectionMenuModel } from '../model/app/direction-map.model/direction-menu.model';
import { DirectionInfoModel } from '../model/app/direction-map.model/direction-info.model';
import { SvgMapShortestPathModel } from '../model/app/svg-map.model/svg-map-shortest-path.model';
import { ShortestPathDirectionModel } from '../model/app/direction-map.model/shortest-path-direction.model';

export class ModelMapper extends AppBase
{
    // Caution : Don't move the property name's string literals in 
    // this method to any constant class because these are not used
    // anywhere else and that would also be extra code which will
    // not add/give clarity or meaning to this code


     public static EventModelMap(src: any, target: EventModel = null): EventModel
    {
        target = target || new EventModel();
        target.id = src.id;
        target.from = src.from;
        target.start = new Date(src['startTime'] || src['StartTime']);
        target.end = new Date(src['endTime'] || src['EndTime']);
        target.title = src['name'] || src['Title'];
        target.description = src['description'] || src['Description'];
        target.quicklink = src['QuickLink'] || src['QuickLink'];
        target.location = src['location'] || src['Location'];
        return target;
    }

    public static directionInfoModelMapper(src: any, target: DirectionInfoModel = null): DirectionInfoModel
    {
        target = target || new DirectionInfoModel();
        target.distance = src.distance;
        target.direction = src.Direction;
        target.description = src.Description;
        return target;
    }

    public static shortestPathModelMapper(src: any, target: SvgMapShortestPathModel = null): SvgMapShortestPathModel
    {
        target = target || new SvgMapShortestPathModel();
        target.title = src.title;
        target.url = src.url;
        target.description = src.description;
        target.pathPoints = src.pathpoints;
        target.floorId = src.floorid;
        return target;
    }

    public static ShortestPathDirectionModelMapper(src: any, target: ShortestPathDirectionModel = null): ShortestPathDirectionModel
    {
        target = target || new ShortestPathDirectionModel();
        target.shortNote = src.ShortNote;
        target.note = src.Note;
        target.endQuicklink = src.EndQuickLink;
        target.language = src.Language;

        target.shortestPaths = {};
        for (let key in src.ShortestPath)
        {
            target.shortestPaths[key] = ModelMapper.shortestPathModelMapper(src.ShortestPath[key]);
        }

        target.walkingDirections = {};
        for (let key in src.WalkingDirections)
        {
            let walkingDirections: DirectionInfoModel[] = [];
            for (let index in src.WalkingDirections[key])
            {
                let walkingDirection = ModelMapper.directionInfoModelMapper(src.WalkingDirections[key][index]);
                walkingDirections.push(walkingDirection);
            }
            target.walkingDirections[key] = walkingDirections;
        }

        return target;
    }

    public static directionMenuMap(src: any, target: DirectionMenuModel = null): DirectionMenuModel
    {
        target = target || new DirectionMenuModel();
        target.id = src.ID;
        target.parentId = src.ParentID;
        target.actionId = src.ActionID;
        target.clickId = src.OnClick;
        target.displayOrder = src.DisplayOrder;
        target.menuLabel = src.MenuLabel;
        target.visibleColumnNames = src.VisibleColumnNames;
        target.visibleColumnAttributes = src.VisibleColumnAttributes;
        target.destinations = src.Destinations;
        return target;
    }

    public static directionMenuListMap(src: any[]): DirectionMenuModel[]
    {
        let target: DirectionMenuModel[] = [];
        if (src)
        {
            src.forEach(element =>
            {
                let targetModel = new DirectionMenuModel();
                targetModel = this.directionMenuMap(element, targetModel);
                target.push(targetModel);
            });
        }
        return target;
    }
}