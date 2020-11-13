import { ConfigDataBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class ConfigData extends ConfigDataBase {

    public static init() {
        var obj: any = SheetManager.getList("ConfigData");
        console.log('ConfigData', obj)
        var vo: ConfigData;
        for (var key in obj) {
            key != "keys" && (vo = ConfigData.get(key));
            vo && (this[vo.name] = vo.value, vo = null);
        }
    }
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("ConfigData", id, ConfigData);
    }
}