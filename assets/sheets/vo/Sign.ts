import { SignBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class Sign extends SignBase {
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("Sign", id, Sign);
    }
}