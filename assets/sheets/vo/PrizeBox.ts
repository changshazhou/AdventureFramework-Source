import { PrizeBoxBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class PrizeBox extends PrizeBoxBase {
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("prizeBox", id, PrizeBox);
    }

    public static getAll(): PrizeBox[] {
        var obj: any = SheetManager.getList("prizeBox");
        var a: PrizeBox[] = [];
        var vo: PrizeBox;
        for (var key in obj) {
            key != "keys" && (vo = PrizeBox.get(key));
            vo && (a.push(vo), vo = null);
        }
        return a;
    }
}