import CocosBaseForm from "./CocosBaseForm";
import CheckboxComponent from "../common/CheckboxComponent";
import showSetOptions from "../../../model/showSetOptions";
export default class CocosSetForm extends CocosBaseForm {
    bg: cc.Node;
    get FormData(): showSetOptions;
    formComponents: CheckboxComponent[];
    private addListener;
    private removeListener;
    willShow(data: any): void;
    willHide(data: any): void;
    private vibrateSwitch;
    private musicSwitch;
}
