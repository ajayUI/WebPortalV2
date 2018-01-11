import { MultiLingualTextModel } from '../../base/multi-lingual-text.model';

export class DirectionMenuModel
{
    public id : number;
    public parentId : number;
    public actionId:number;
    public clickId : number;
    public displayOrder : number;
    //public menuLabel:string;
    public menuLabel: MultiLingualTextModel = null;
    public visibleColumnNames:string; 
    public visibleColumnAttributes:any[];
    public destinations:any[];
   // public isShowMenu:boolean;

      
}