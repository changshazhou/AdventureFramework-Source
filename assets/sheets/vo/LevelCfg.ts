import { LevelCfgBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class LevelCfg extends LevelCfgBase {
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("LevelCfg", id, LevelCfg);
    }

    public static getAll(): LevelCfg[] {
        var obj: any = SheetManager.getList("LevelCfg");
        var a: LevelCfg[] = [];
        var vo: LevelCfg;
        for (var key in obj) {
            key != "keys" && (vo = LevelCfg.get(key));
            vo && (a.push(vo), vo = null);
        }
        return a;
    }


}