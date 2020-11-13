import { EasterEggBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class EasterEgg extends EasterEggBase {
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("EasterEgg", id, EasterEgg);
    }
    public static getAll(): EasterEgg[] {
        var obj: any = SheetManager.getList("EasterEgg");
        var a: EasterEgg[] = [];
        var vo: EasterEgg;
        for (var key in obj) {
            key != "keys" && (vo = EasterEgg.get(key));
            vo && (a.push(vo), vo = null);
        }
        return a;
    }
}