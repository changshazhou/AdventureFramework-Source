import { SignVoBase } from "./Sheets"
import { SheetManager } from "../../script/utils/SheetManager";
export class SignVo extends SignVoBase {
    //id索引
    public static get(id: any) {
        if (this[id]) return this[id];
        return SheetManager.get("SignVo", id, SignVo);
    }
}