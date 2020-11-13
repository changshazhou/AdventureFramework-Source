import { SkinCfgBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class SkinCfg extends SkinCfgBase {
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("SkinCfg", id, SkinCfg);
    }

    public static getAll(): SkinCfg[] {
        var obj: any = SheetManager.getList("SkinCfg");
        var a: SkinCfg[] = [];
        var vo: SkinCfg;
        for (var key in obj) {
            key != "keys" && (vo = SkinCfg.get(key));
            vo && (a.push(vo), vo = null);
        }
        return a;
    }
}