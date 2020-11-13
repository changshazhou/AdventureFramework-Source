import { DeployGroup } from "./DeployGroup";
import DeployItemAttribute from "./DeployItemAttribute";

export default class  DeployItem {
    public name: string = "";
    public type: DeployGroup = DeployGroup.road;
    public position: Array<number> = [];
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public z_index: number;
    
    public component: Array<any> = [];
    public attribute: DeployItemAttribute;
}